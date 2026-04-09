import { Maniiifest } from '../src/Maniiifest';

/**
 * Cross-cutting tests for:
 * - Constructor validation
 * - Private specification field
 * - Dimension spelling fix
 * - Type re-exports from index.ts
 */

describe('Constructor validation', () => {
  it('throws on unsupported type argument', () => {
    expect(() => new Maniiifest({}, "InvalidType" as any)).toThrow('Unsupported type');
  });

  it('accepts undefined type for Manifest/Collection', () => {
    expect(() => new Maniiifest({
      id: "x", type: "Manifest", label: { en: ["M"] }
    })).not.toThrow();
  });

  it('accepts "Annotation" type', () => {
    expect(() => new Maniiifest({
      id: "x", type: "Annotation", body: "y", target: "z"
    }, "Annotation")).not.toThrow();
  });

  it('accepts "AnnotationPage" type', () => {
    expect(() => new Maniiifest({
      id: "x", type: "AnnotationPage", items: []
    }, "AnnotationPage")).not.toThrow();
  });

  it('accepts "AnnotationCollection" type', () => {
    expect(() => new Maniiifest({
      id: "x", type: "AnnotationCollection", label: "L", total: 0
    }, "AnnotationCollection")).not.toThrow();
  });
});

describe('Constructor error handling', () => {
  it('wraps parse errors with descriptive message for Manifest', () => {
    expect(() => new Maniiifest(null)).toThrow(/Failed to parse IIIF data/);
  });

  it('wraps parse errors with descriptive message for Annotation', () => {
    expect(() => new Maniiifest(null, "Annotation")).toThrow(/Failed to parse IIIF data as Annotation/);
  });

  it('wraps parse errors with descriptive message for AnnotationPage', () => {
    expect(() => new Maniiifest(null, "AnnotationPage")).toThrow(/Failed to parse IIIF data as AnnotationPage/);
  });

  it('wraps parse errors with descriptive message for AnnotationCollection', () => {
    expect(() => new Maniiifest(null, "AnnotationCollection")).toThrow(/Failed to parse IIIF data as AnnotationCollection/);
  });

  it('preserves unsupported type error without wrapping', () => {
    expect(() => new Maniiifest({}, "BadType" as any)).toThrow('Unsupported type: BadType');
  });

  it('wraps errors when data is a non-object primitive', () => {
    expect(() => new Maniiifest(42)).toThrow(/Failed to parse IIIF data/);
  });

  it('wraps errors when data is undefined', () => {
    expect(() => new Maniiifest(undefined)).toThrow(/Failed to parse IIIF data/);
  });
});

describe('Private specification field', () => {
  it('specification is not on the prototype', () => {
    const m = new Maniiifest({ id: "x", type: "Manifest", label: { en: ["M"] } });
    const protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(m));
    expect(protoKeys).not.toContain('specification');
  });

  it('specification exists as an own instance property (runtime)', () => {
    const m = new Maniiifest({ id: "x", type: "Manifest", label: { en: ["M"] } });
    // TypeScript prevents `m.specification` at compile time; at runtime it's still there
    expect((m as any).specification).toBeDefined();
  });
});

describe('Dimension spelling fix', () => {
  it('iiif-types.ts exports Dimension (not Dimenson)', () => {
    const fs = require('fs');
    const path = require('path');
    const content = fs.readFileSync(
      path.join(__dirname, '..', 'src', 'iiif-types.ts'), 'utf-8'
    );
    expect(content).toContain('export type Dimension');
    expect(content).not.toContain('Dimenson');
  });
});

describe('Type re-exports from index.ts', () => {
  it('index.ts re-exports iiif-types', () => {
    const fs = require('fs');
    const path = require('path');
    const src = fs.readFileSync(
      path.join(__dirname, '..', 'src', 'index.ts'), 'utf-8'
    );
    expect(src).toContain("export * from './iiif-types'");
  });

  it('Maniiifest is the default runtime export', () => {
    const index = require('../src/index');
    expect(index.Maniiifest).toBeDefined();
  });
});
