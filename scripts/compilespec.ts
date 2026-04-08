#!/usr/bin/env ts-node
/**
 * scripts/compilespec.ts
 *
 * Cross-platform replacement for compilespec-mac.sh, compilespec-linux.sh,
 * and use_adapter.ts. Also generates user-facing types (iiif-types.ts).
 *
 * Requires: atdts (install via opam: opam install atdts)
 *
 * Pipeline:
 *   1. Discover which types need adapter wrappers (from adapter.ts)
 *   2. Run atdts to generate raw specification.ts
 *   3. Rename read/write functions for adapted types (prefix with _)
 *   4. Replace _type → type (ATD reserved-word convention)
 *   5. Append adapter wrapper functions + import
 *   6. Write src/specification.ts
 *   7. Generate src/iiif-types.ts (user-facing types)
 *
 * Run with:
 *   npx ts-node scripts/compilespec.ts
 *   npm run compilespec
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { parseAtd, generateTypes, buildIndex, validate } from './generate-iiif-types';

const repoRoot = path.resolve(__dirname, '..');
const atdPath = path.join(repoRoot, 'src', 'specification.atd');
const adapterPath = path.join(repoRoot, 'src', 'adapter.ts');
const specOutPath = path.join(repoRoot, 'src', 'specification.ts');
const typesOutPath = path.join(repoRoot, 'src', 'iiif-types.ts');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toPascalCase(snake: string): string {
  return snake.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

// ---------------------------------------------------------------------------
// Step 1: Discover adapted types from adapter.ts
//
// Reads adapter.ts and finds every `normalize_<name>` export.
// These are the sum types (or aliases to sum types) that need
// their atdts-generated read/write functions wrapped.
// ---------------------------------------------------------------------------

function discoverAdapterTypes(): string[] {
  const src = fs.readFileSync(adapterPath, 'utf-8');
  const seen = new Set<string>();
  const types: string[] = [];
  for (const m of src.matchAll(/export function normalize_(\w+)/g)) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      types.push(m[1]);
    }
  }
  return types.sort();
}

// ---------------------------------------------------------------------------
// Step 2: Run atdts
//
// Executes `atdts <path>` which produces specification.ts in the cwd.
// We run from the scripts/ directory (matching the old shell scripts)
// then read and delete the temp file.
// ---------------------------------------------------------------------------

function runAtdts(): string {
  const scriptsDir = path.join(repoRoot, 'scripts');
  const tmpPath = path.join(scriptsDir, 'specification.ts');

  try {
    execSync(`atdts "${atdPath}"`, { cwd: scriptsDir, stdio: 'pipe' });
  } catch (e: any) {
    const msg = e.stderr?.toString().trim() || e.message;
    throw new Error(
      `atdts failed: ${msg}\n` +
      `Make sure atdts is installed: opam install atdts`
    );
  }

  const src = fs.readFileSync(tmpPath, 'utf-8');
  fs.unlinkSync(tmpPath);
  return src;
}

// ---------------------------------------------------------------------------
// Step 3: Post-process the atdts output
//
// For each adapted type:
//   export function readFooT(  →  export function _readFooT(
//   export function writeFooT( →  export function _writeFooT(
//
// Then globally:
//   _type  →  type   (ATD convention for the reserved word 'type')
// ---------------------------------------------------------------------------

function postProcess(src: string, adapterTypes: string[]): string {
  let result = src;

  for (const typeName of adapterTypes) {
    const pascal = toPascalCase(typeName) + 'T';
    result = result.replace(
      new RegExp(`export function write${pascal}\\(`, 'g'),
      `export function _write${pascal}(`
    );
    result = result.replace(
      new RegExp(`export function read${pascal}\\(`, 'g'),
      `export function _read${pascal}(`
    );
  }

  // ATD uses _type to avoid the reserved word; rename back to 'type'
  result = result.replace(/_type/g, 'type');

  // Ensure @ts-nocheck is present (atdts may or may not include it)
  if (!result.includes('@ts-nocheck')) {
    result = '// @ts-nocheck\n' + result;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Step 4: Generate adapter wrapper code
//
// Appended to specification.ts. For each adapted type, generates:
//   export function writeFooT(x, context) → restore_foo(x, context, _writeFooT)
//   export function readFooT(x, context)  → normalize_foo(x, context, _readFooT)
// ---------------------------------------------------------------------------

function generateAdapterCode(adapterTypes: string[]): string {
  const lines: string[] = [''];

  // Import normalize/restore functions from adapter
  lines.push('import {');
  for (let i = 0; i < adapterTypes.length; i++) {
    const t = adapterTypes[i];
    const comma = i < adapterTypes.length - 1 ? ',' : '';
    lines.push(`    normalize_${t}, restore_${t}${comma}`);
  }
  lines.push('} from "./adapter";');
  lines.push('');

  // Generate write/read wrapper pairs
  for (const typeName of adapterTypes) {
    const pascal = toPascalCase(typeName) + 'T';
    lines.push(
      `export function write${pascal}(x: any, context: any = x): ${pascal} {`,
      `    return restore_${typeName}(x, context, _write${pascal});`,
      `}`,
      '',
      `export function read${pascal}(x: any, context: any = x): ${pascal} {`,
      `    return normalize_${typeName}(x, context, _read${pascal});`,
      `}`,
      ''
    );
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Step 5: Generate user-facing IIIF types
// ---------------------------------------------------------------------------

function generateIiifTypes(): void {
  const src = fs.readFileSync(atdPath, 'utf-8');
  const defs = parseAtd(src);
  const index = buildIndex(defs);
  validate(defs, index);
  const output = generateTypes(defs);
  fs.writeFileSync(typesOutPath, output, 'utf-8');
  console.log(`Written ${typesOutPath}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

if (require.main === module) {
  console.log('Discovering adapter types from src/adapter.ts...');
  const adapterTypes = discoverAdapterTypes();
  console.log(`  Found ${adapterTypes.length} adapted types`);

  console.log('Running atdts...');
  const rawSpec = runAtdts();

  console.log('Post-processing specification.ts...');
  let spec = postProcess(rawSpec, adapterTypes);
  spec += generateAdapterCode(adapterTypes);
  fs.writeFileSync(specOutPath, spec, 'utf-8');
  console.log(`Written ${specOutPath}`);

  console.log('Generating user-facing types...');
  generateIiifTypes();

  console.log('Done.');
}
