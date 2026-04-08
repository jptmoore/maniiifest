import * as fs from 'fs';
import * as path from 'path';
import { parseAtd, generateTypes, buildIndex, validate } from '../scripts/generate-iiif-types';

const repoRoot = path.resolve(__dirname, '..');
const atdPath = path.join(repoRoot, 'src', 'specification.atd');
const outPath = path.join(repoRoot, 'src', 'iiif-types.ts');

describe('generate-iiif-types', () => {

  const src = fs.readFileSync(atdPath, 'utf-8');
  const defs = parseAtd(src);
  const index = buildIndex(defs);

  test('parses all type definitions from specification.atd', () => {
    // specification.atd currently has 140 type definitions
    expect(defs.length).toBeGreaterThanOrEqual(100);
    // Every def should have a name
    for (const d of defs) {
      expect(d.name).toBeTruthy();
    }
  });

  test('validation passes with no errors', () => {
    expect(() => validate(defs, index)).not.toThrow();
  });

  test('generated output matches committed snapshot', () => {
    const freshOutput = generateTypes(defs);
    const committed = fs.readFileSync(outPath, 'utf-8');
    expect(freshOutput).toBe(committed);
  });

  test('all record inherit references resolve', () => {
    for (const def of defs) {
      if (def.tag !== 'record') continue;
      for (const f of def.fields) {
        if (f.isInherit) {
          expect(index.has(f.type)).toBe(true);
        }
      }
    }
  });

  test('all sum variant inherit references resolve', () => {
    for (const def of defs) {
      if (def.tag !== 'sum') continue;
      for (const v of def.variants) {
        if (v.isInherit) {
          expect(index.has(v.type!)).toBe(true);
        }
      }
    }
  });

  test('generated output compiles (no undefined type references)', () => {
    const output = generateTypes(defs);
    // Every type referenced in the output should be either:
    // - a primitive (string, number, boolean)
    // - defined as an export in the same output
    const exported = new Set<string>();
    for (const m of output.matchAll(/export (?:type|interface) (\w+)/g)) {
      exported.add(m[1]);
    }

    // Collect all type references used in field types and union members
    // This is a rough check — it looks for PascalCase identifiers in type positions
    const typeRefs = new Set<string>();
    for (const m of output.matchAll(/:\s*([A-Z]\w+)/g)) {
      typeRefs.add(m[1]);
    }
    for (const m of output.matchAll(/=\s*([A-Z]\w+)/g)) {
      typeRefs.add(m[1]);
    }
    for (const m of output.matchAll(/\|\s*([A-Z]\w+)/g)) {
      typeRefs.add(m[1]);
    }

    const builtins = new Set(['Record', 'Array']);
    for (const ref of typeRefs) {
      if (!builtins.has(ref)) {
        expect(exported.has(ref)).toBe(true);
      }
    }
  });

  test('key IIIF types are present in output', () => {
    const output = generateTypes(defs);
    const expected = [
      'Manifest', 'Collection', 'Canvas', 'Annotation', 'AnnotationPage',
      'AnnotationBody', 'Resource', 'Service', 'Label', 'Metadata',
      'Range', 'Provider', 'Homepage', 'Thumbnail',
    ];
    for (const name of expected) {
      const hasType = output.includes(`export type ${name} `) ||
                      output.includes(`export interface ${name} `);
      expect(hasType).toBe(true);
    }
  });

  test('polymorphic types collapse to unions', () => {
    const output = generateTypes(defs);
    // label_t = string | lng_string_t → string | Record<string, string[]>
    expect(output).toMatch(/export type Label = string \| Record<string, string\[\]>/);
    // context_t = string | string[]
    expect(output).toMatch(/export type Context = string \| string\[\]/);
    // service_t = ServiceItem | ServiceItem[]
    expect(output).toMatch(/export type Service = ServiceItem \| ServiceItem\[\]/);
    // body_t = AnnotationBody | AnnotationBody[]
    expect(output).toMatch(/export type Body = AnnotationBody \| AnnotationBody\[\]/);
  });
});
