#!/usr/bin/env ts-node
/**
 * scripts/generate-iiif-types.ts
 *
 * Reads src/specification.atd and writes src/iiif-types.ts.
 *
 * Run with:
 *   npx ts-node scripts/generate-iiif-types.ts
 *
 * The generated file contains plain TypeScript types that reflect real IIIF
 * JSON structure.  It deliberately avoids the ATD discriminated-union wrappers
 * ({kind,value}) so library consumers can annotate their own code without
 * having to understand the internal representation.
 *
 * Collapse rules for sum types
 * ─────────────────────────────
 * ATD generates sum (variant) types to handle JSON fields that can hold
 * different shapes.  The common patterns and how they collapse:
 *
 *   T1 of X | T2 of X list          → X | X[]
 *   T1 of string | T2 of string list → string | string[]
 *   T1 of A | T2 of B | …           → A | B | …   (general union)
 *   inherit SomeVariant | T_n of C  → flatten inherited variants then add C
 *
 * Primitive alias rules
 * ─────────────────────
 *   *_t = string  → type alias = string  (but see special-cased primitives)
 *   *_t = int     → number
 *   *_t = float   → number
 *
 * Record rules
 * ─────────────
 *   inherit other_t  → inline all fields of other_t
 *   ?field : t option → field?: T
 *   field : t         → field: T
 *   field <json name="@context"> → "@context"?: Context
 */

import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// ATD parser types
// ---------------------------------------------------------------------------

type AtdTypeDef =
  | { tag: 'record';   name: string; fields: AtdField[] }
  | { tag: 'sum';      name: string; variants: AtdVariant[] }
  | { tag: 'alias';    name: string; rhs: string }      // type foo = bar
  | { tag: 'prim';     name: string; prim: 'string' | 'int' | 'float' | 'bool' };

interface AtdField {
  optional: boolean;
  name: string;
  jsonName?: string;         // value from <json name="X">
  type: string;              // raw type string, e.g. "label_t option", "string list"
  isInherit: boolean;
}

interface AtdVariant {
  tag: string;               // 'T1', 'Manifest', etc.
  type?: string;             // type carried by this variant
  isInherit: boolean;        // `inherit sum_t`
}

// ---------------------------------------------------------------------------
// Tokeniser / parser
// ---------------------------------------------------------------------------

function tokenise(src: string): string[] {
  // Strip (* … *) comments
  src = src.replace(/\(\*[\s\S]*?\*\)/g, ' ');
  // Split on whitespace and punctuation we care about, INCLUDING '=' and ':'
  return src.match(/[A-Za-z_][A-Za-z0-9_]*|[(){}\[\]|;,?*=:]|<[^>]*>|"[^"]*"|\./g) ?? [];
}

function parseAtd(src: string): AtdTypeDef[] {
  const tokens = tokenise(src);
  let i = 0;

  function peek() { return tokens[i]; }
  function consume(expected?: string): string {
    const t = tokens[i++];
    if (expected && t !== expected) throw new Error(`Expected '${expected}' got '${t}' at token ${i}`);
    return t;
  }
  function consumeIf(v: string): boolean {
    if (tokens[i] === v) { i++; return true; }
    return false;
  }

  // Parse a raw type expression up to a delimiter.
  // Handles balanced parentheses so tuple types like `(float * float) list`
  // are consumed in full.
  function parseTypeExpr(): string {
    const parts: string[] = [];
    let depth = 0;
    while (i < tokens.length) {
      const t = peek();
      if (depth === 0) {
        if (t === ';' || t === '}' || t === '|' || t === ']') break;
        // 'type' signals a new top-level definition — stop here
        if (t === 'type') break;
      }
      if (t === '(') depth++;
      else if (t === ')') {
        if (depth === 0) break;
        depth--;
      }
      parts.push(tokens[i++]);
    }
    return parts.join(' ');
  }

  // Parse <json name="…"> annotation if present, return the name string or null
  function maybeJsonName(): string | null {
    if (peek()?.startsWith('<')) {
      const ann = tokens[i++];
      const m = ann.match(/name="([^"]+)"/);
      return m ? m[1] : null;
    }
    return null;
  }

  function parseRecord(): AtdField[] {
    consume('{');
    const fields: AtdField[] = [];
    while (peek() !== '}') {
      if (peek() === 'inherit') {
        consume('inherit');
        const typeName = consume();
        consumeIf(';');
        fields.push({ optional: false, name: '', jsonName: undefined, type: typeName, isInherit: true });
        continue;
      }
      const optional = consumeIf('?');
      // Field name may start with _ (ATD convention for reserved words)
      let name = consume();
      // optional <json name="…"> annotation
      let jsonName: string | undefined;
      const ann = maybeJsonName();
      if (ann) jsonName = ann;
      consume(':');
      const typeExpr = parseTypeExpr().trim();
      consumeIf(';');
      fields.push({ optional, name, jsonName, type: typeExpr, isInherit: false });
    }
    consume('}');
    return fields;
  }

  function parseVariants(): AtdVariant[] {
    const variants: AtdVariant[] = [];
    // Variants may start with 'inherit' directly (no leading '|'), or with '| variant'
    while (true) {
      // Consume an optional leading '|'
      consumeIf('|');
      if (peek() === ']') break; // end of sum
      if (peek() === undefined) break;
      if (peek() === 'inherit') {
        consume('inherit');
        const typeName = consume();
        variants.push({ tag: typeName, type: typeName, isInherit: true });
        continue;
      }
      const tag = consume();
      let type: string | undefined;
      if (consumeIf('of')) {
        type = parseTypeExpr().trim();
      }
      variants.push({ tag, type, isInherit: false });
    }
    return variants;
  }

  const defs: AtdTypeDef[] = [];

  while (i < tokens.length) {
    if (peek() !== 'type') break;
    consume('type');
    const name = consume();
    consume('=');

    const t = peek();

    if (t === '{') {
      const fields = parseRecord();
      defs.push({ tag: 'record', name, fields });
    } else if (t === '[') {
      consume('[');
      const variants = parseVariants();
      consume(']');
      defs.push({ tag: 'sum', name, variants });
    } else if ((t === 'string' || t === 'int' || t === 'float' || t === 'bool') && tokens[i + 1] !== 'list') {
      // Plain primitive with no list/tuple suffix
      const prim = consume() as 'string' | 'int' | 'float' | 'bool';
      defs.push({ tag: 'prim', name, prim });
    } else {
      // Alias: type foo_t = bar_t  or  type foo_t = (float * float) list
      //        or  type foo_t = string list  etc.
      const rhs = parseTypeExpr().trim();
      defs.push({ tag: 'alias', name, rhs });
    }
  }

  return defs;
}

// ---------------------------------------------------------------------------
// Name conversion  (ATD snake_case _t  →  TypeScript PascalCase)
// ---------------------------------------------------------------------------

function toPascal(atdName: string): string {
  if (RENAME_MAP[atdName]) return RENAME_MAP[atdName];
  // Remove trailing _t
  let n = atdName.endsWith('_t') ? atdName.slice(0, -2) : atdName;
  // Split on _ and capitalise each segment
  return n.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

// ---------------------------------------------------------------------------
// Type expression translator
// ---------------------------------------------------------------------------

// ATD primitive types and their TS equivalents
const PRIM_MAP: Record<string, string> = {
  string: 'string',
  int:    'number',
  float:  'number',
  bool:   'boolean',
};

// Types that collapse to a simpler alias rather than their ATD structure
// key = ATD name, value = TS expression to emit
const OVERRIDE_MAP: Record<string, string> = {
  lng_string_t: 'Record<string, string[]>',
  // Free-form GeoJSON pass-through values (see specification.atd `json`).
  json: 'any',
  properties_t: 'Record<string, any>',
  transformation_t: 'Record<string, any>',
};

/**
 * Better names for types whose auto-derived PascalCase names are misleading.
 * With the meaningful variant names, most types now have clear auto-derived names.
 */
const RENAME_MAP: Record<string, string> = {};

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Validate that every type referenced in fields, variants, aliases, and
 * override/rename maps actually exists in the parsed definitions.
 * Throws on fatal errors; warns on stale map entries.
 */
function validate(defs: AtdTypeDef[], index: DefIndex): void {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check OVERRIDE_MAP and RENAME_MAP keys exist
  for (const key of Object.keys(OVERRIDE_MAP)) {
    if (!index.has(key)) warnings.push(`OVERRIDE_MAP key '${key}' not found in ATD definitions`);
  }
  for (const key of Object.keys(RENAME_MAP)) {
    if (!index.has(key)) warnings.push(`RENAME_MAP key '${key}' not found in ATD definitions`);
  }

  // Check RENAME_MAP for value collisions
  const renameValues = Object.values(RENAME_MAP);
  const renameDupes = renameValues.filter((v, i) => renameValues.indexOf(v) !== i);
  for (const d of renameDupes) errors.push(`RENAME_MAP has duplicate target name '${d}'`);

  // Check that referenced type names resolve
  for (const def of defs) {
    if (def.tag === 'record') {
      for (const f of def.fields) {
        if (f.isInherit && !index.has(f.type)) {
          errors.push(`${def.name}: inherit references unknown type '${f.type}'`);
        }
      }
    }
    if (def.tag === 'sum') {
      for (const v of def.variants) {
        if (v.isInherit && !index.has(v.type!)) {
          errors.push(`${def.name}: inherit references unknown variant type '${v.type}'`);
        }
      }
    }
  }

  for (const w of warnings) console.warn(`[generate-iiif-types] WARNING: ${w}`);
  if (errors.length > 0) {
    throw new Error(
      `[generate-iiif-types] Validation failed:\n  ${errors.join('\n  ')}`
    );
  }
}

/**
 * Translate a raw ATD type expression (`label_t option`, `string list`, …)
 * into a TypeScript type string.
 *
 * When `index` is provided, numbered payload types (e.g. context_t1 = string)
 * are transparently resolved to their underlying TS type rather than emitting
 * a reference to a type we intend to skip.
 */
function translateType(expr: string, index?: DefIndex, depth = 0): string {
  if (depth > 20) return expr; // guard against infinite recursion
  expr = expr.trim();

  // Strip trailing 'option'
  const optionMatch = expr.match(/^(.*)\s+option$/);
  if (optionMatch) {
    return translateType(optionMatch[1], index, depth);
  }

  // Primitives
  if (PRIM_MAP[expr]) return PRIM_MAP[expr];

  // tuple  (float * float)
  const tupleMatch = expr.match(/^\(([^)]+)\)$/);
  if (tupleMatch) {
    const members = tupleMatch[1].split('*').map(m => translateType(m.trim(), index, depth + 1));
    return `[${members.join(', ')}]`;
  }

  // list suffix  →  Array
  const listMatch = expr.match(/^(.*)\s+list$/);
  if (listMatch) {
    const inner = translateType(listMatch[1], index, depth + 1);
    return `${inner}[]`;
  }

  // Known ATD type name (snake_case identifier)
  if (expr.match(/^[a-z_][a-z0-9_]*$/)) {
    if (OVERRIDE_MAP[expr]) return OVERRIDE_MAP[expr];
    // If this is a numbered payload type (would be skipped) or a primitive alias,
    // resolve through the index to get the TS type directly.
    if (index && shouldSkip(expr, index)) {
      const def = index.get(expr);
      if (def) {
        if (def.tag === 'prim') return PRIM_MAP[def.prim];
        if (def.tag === 'alias') return translateType(def.rhs, index, depth + 1);
        if (def.tag === 'sum') return collapseVariants(collectVariants(expr, index), index);
        // record variants: name them as-is (shouldn't happen for numbered types)
      }
    }
    return toPascal(expr);
  }

  // Fallback — pass through
  return expr;
}

// ---------------------------------------------------------------------------
// Code generator
// ---------------------------------------------------------------------------

// Index for fast lookup
type DefIndex = Map<string, AtdTypeDef>;

function buildIndex(defs: AtdTypeDef[]): DefIndex {
  const m = new Map<string, AtdTypeDef>();
  for (const d of defs) m.set(d.name, d);
  return m;
}

/**
 * Collect all fields from a record type, inlining `inherit` references.
 */
function collectFields(name: string, index: DefIndex, visited = new Set<string>()): AtdField[] {
  if (visited.has(name)) return [];
  visited.add(name);
  const def = index.get(name);
  if (!def || def.tag !== 'record') return [];
  const result: AtdField[] = [];
  for (const f of def.fields) {
    if (f.isInherit) {
      result.push(...collectFields(f.type, index, visited));
    } else {
      result.push(f);
    }
  }
  return result;
}

/**
 * Collect variants of a sum type, flattening `inherit` sum references.
 */
function collectVariants(name: string, index: DefIndex, visited = new Set<string>()): AtdVariant[] {
  if (visited.has(name)) return [];
  visited.add(name);
  const def = index.get(name);
  if (!def || def.tag !== 'sum') return [];
  const result: AtdVariant[] = [];
  for (const v of def.variants) {
    if (v.isInherit) {
      result.push(...collectVariants(v.type!, index, visited));
    } else {
      result.push(v);
    }
  }
  return result;
}

/**
 * Given a sum type's variants, produce a union TS type string.
 *
 * Collapse patterns:
 *   T1 of X | T2 of X list  →  X | X[]          (single-item / array)
 *   T1 of string | T2 of string list  →  string | string[]
 *   All variants carry the same base type but one is a list  →  Base | Base[]
 */
function collapseVariants(variants: AtdVariant[], index: DefIndex): string {
  // Filter out variants without a carried type (pure tags) – treat as string
  const typed = variants.filter(v => v.type !== undefined);
  if (typed.length === 0) return 'string';

  // Check for the "T1 of X | T2 of X list" pattern
  if (typed.length === 2) {
    const [a, b] = typed;
    const aSingle = a.type!.replace(/ option$/, '').trim();
    const bList = b.type!.replace(/ option$/, '').trim();
    const listMatch = bList.match(/^(.*)\s+list$/);
    if (listMatch && listMatch[1].trim() === aSingle) {
      const ts = translateType(aSingle, index);
      return `${ts} | ${ts}[]`;
    }
    // Also handle reverse order
    const aList = aSingle.match(/^(.*)\s+list$/);
    if (aList && aList[1].trim() === bList.replace(/ option$/, '').trim()) {
      const ts = translateType(bList, index);
      return `${ts} | ${ts}[]`;
    }
  }

  // General: collect unique translated types
  const parts: string[] = [];
  const seen = new Set<string>();
  for (const v of typed) {
    const ts = translateType(v.type!.replace(/ option$/, '').trim(), index);
    if (!seen.has(ts)) { seen.add(ts); parts.push(ts); }
  }
  return parts.join(' | ');
}

/**
 * Convert an ATD field name to the TypeScript property key.
 * - Uses jsonName if present (e.g. "@context", "type", "@id")
 * - Strips leading _ (ATD convention for reserved word escaping)
 * - Quotes keys that start with @ or contain special chars
 */
function tsFieldName(field: AtdField): string {
  const raw = field.jsonName ?? field.name.replace(/^_/, '');
  if (/[@\-\s]/.test(raw)) return `"${raw}"`;
  return raw;
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

/**
 * Build a set of type names that appear as variant payloads in sum types.
 * These payload types (when they are simple aliases/prims) can be inlined
 * rather than emitted as top-level declarations.
 */
function buildVariantPayloads(index: DefIndex): Set<string> {
  const payloads = new Set<string>();
  for (const def of index.values()) {
    if (def.tag === 'sum') {
      for (const v of def.variants) {
        if (!v.type || v.isInherit) continue;
        const raw = v.type.replace(/ option$/, '').replace(/ list$/, '').trim();
        if (index.has(raw)) payloads.add(raw);
      }
    }
  }
  return payloads;
}

// Module-level cache, initialised in generateTypes
let _variantPayloads: Set<string> = new Set();

/**
 * Types that the generator should NOT emit as top-level declarations.
 *
 * We skip variant payload types only when they are trivial scalars or
 * aliases that can be inlined (e.g. `context_value = string`).
 * Record-shaped sub-types (geometry_point, annotation_body_textual_body, …)
 * are still emitted because they have named fields.
 */
function shouldSkip(name: string, index?: DefIndex): boolean {
  if (!index) return false;
  if (!_variantPayloads.has(name)) return false;
  const def = index.get(name);
  if (!def) return true;
  // Keep record types — they are real interfaces and can't be inlined
  if (def.tag === 'record') return false;
  // Keep sum types — they become TS unions that may be referenced
  if (def.tag === 'sum') return false;
  // Prim and alias types (string, string list, …) are inlined by translateType
  return true;
}

function generateTypes(defs: AtdTypeDef[]): string {
  const index = buildIndex(defs);
  _variantPayloads = buildVariantPayloads(index);
  const lines: string[] = [];

  lines.push(
    '/**',
    ' * User-facing TypeScript types for the IIIF Presentation 3.0 API.',
    ' *',
    ' * AUTO-GENERATED — do not edit by hand.',
    ' * Regenerate with:  npx ts-node scripts/generate-iiif-types.ts',
    ' *',
    ' * These types reflect real IIIF JSON structure and are intended for',
    ' * consumers of the maniiifest library who want type annotations in',
    ' * their own code without needing to understand the internal ATD',
    ' * discriminated-union representation.',
    ' */',
    '',
  );

  for (const def of defs) {
    // Skip internal numbered subtypes that are trivial scalars/aliases
    if (shouldSkip(def.name, index)) continue;

    const tsName = toPascal(def.name);

    if (def.tag === 'prim') {
      const ts = PRIM_MAP[def.prim];
      lines.push(`export type ${tsName} = ${ts};`, '');
      continue;
    }

    if (def.tag === 'alias') {
      // Special override (lng_string_t → LanguageMap)
      if (OVERRIDE_MAP[def.name]) {
        lines.push(`export type ${tsName} = ${OVERRIDE_MAP[def.name]};`, '');
        continue;
      }
      const ts = translateType(def.rhs, index);
      lines.push(`export type ${tsName} = ${ts};`, '');
      continue;
    }

    if (def.tag === 'record') {
      const fields = collectFields(def.name, index);
      lines.push(`export interface ${tsName} {`);
      for (const f of fields) {
        const key = tsFieldName(f);
        // Strip 'option' suffix from type then translate
        const rawType = f.type.replace(/ option$/, '').trim();
        const tsType = translateType(rawType, index);
        const opt = f.optional ? '?' : '';
        lines.push(`  ${key}${opt}: ${tsType};`);
      }
      lines.push('}', '');
      continue;
    }

    if (def.tag === 'sum') {
      const variants = collectVariants(def.name, index);
      const union = collapseVariants(variants, index);
      lines.push(`export type ${tsName} = ${union};`, '');
      continue;
    }
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Public API (for testing)
// ---------------------------------------------------------------------------

export { parseAtd, generateTypes, buildIndex, validate };
export type { AtdTypeDef, AtdField, AtdVariant, DefIndex };

// ---------------------------------------------------------------------------
// Main  (only runs when executed directly, not when imported)
// ---------------------------------------------------------------------------

if (require.main === module) {
  const repoRoot = path.resolve(__dirname, '..');
  const atdPath  = path.join(repoRoot, 'src', 'specification.atd');
  const outPath  = path.join(repoRoot, 'src', 'iiif-types.ts');

  const src = fs.readFileSync(atdPath, 'utf-8');
  const defs = parseAtd(src);
  const index = buildIndex(defs);
  validate(defs, index);
  const output = generateTypes(defs);
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log(`Written ${outPath}`);
}
