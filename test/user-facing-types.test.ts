import { Maniiifest } from '../src/Maniiifest';
import type {
  Manifest, Collection, Context, Label, Id, Service, ServiceItem,
  Canvas, Annotation, AnnotationPage, AnnotationBody, AnnotationTarget,
  Metadata, Homepage, PartOf, Dimension,
} from '../src/iiif-types';

/**
 * Tests covering work on user-facing types:
 * - All Maniiifest methods return iiif-types (U.*) rather than internal spec types (T.*)
 * - getSpecificationType() returns 'Manifest' | 'Collection' literal
 * - Dimension spelling fix (was Dimenson)
 * - specification field is private
 * - Polymorphic fields (label, context, service, body, target, partOf) are returned
 *   in their user-facing shapes — not ATD discriminated unions ({kind, value})
 * - Type re-exports from index.ts
 */

// ------------------------------------------------------------------
// Fixtures
// ------------------------------------------------------------------

const manifest = {
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "id": "https://example.org/iiif/book1/manifest",
  "type": "Manifest",
  "label": { "en": ["Book 1"] },
  "metadata": [
    { "label": { "en": ["Author"] }, "value": { "en": ["Anne Author"] } }
  ],
  "service": [
    {
      "id": "https://example.org/iiif/book1/access-control",
      "type": "AuthCookieService1",
      "profile": "http://iiif.io/api/auth/1"
    }
  ],
  "items": [
    {
      "id": "https://example.org/iiif/book1/canvas/p1",
      "type": "Canvas",
      "label": { "none": ["p. 1"] },
      "height": 1000,
      "width": 750,
      "items": [
        {
          "id": "https://example.org/iiif/book1/page/p1/1",
          "type": "AnnotationPage",
          "items": [
            {
              "id": "https://example.org/iiif/book1/annotation/p0001-image",
              "type": "Annotation",
              "motivation": "painting",
              "body": {
                "id": "https://example.org/iiif/book1/page1/full/max/0/default.jpg",
                "type": "Image",
                "format": "image/jpeg",
                "service": [
                  {
                    "id": "https://example.org/iiif/book1/page1",
                    "type": "ImageService3",
                    "profile": "level2"
                  }
                ],
                "height": 2000,
                "width": 1500
              },
              "target": "https://example.org/iiif/book1/canvas/p1"
            }
          ]
        }
      ]
    }
  ]
};

const collection = {
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "id": "https://example.org/iiif/collection1",
  "type": "Collection",
  "label": { "en": ["Example Collection"] },
  "items": [
    {
      "id": "https://example.org/iiif/book1/manifest",
      "type": "Manifest",
      "label": { "en": ["Book 1"] }
    }
  ]
};

const annotation = {
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "id": "http://example.org/anno7",
  "type": "Annotation",
  "motivation": "commenting",
  "body": {
    "type": "TextualBody",
    "value": "Comment text",
    "format": "text/plain"
  },
  "target": "http://example.org/target1"
};

// ------------------------------------------------------------------
// getSpecificationType() narrowed return type
// ------------------------------------------------------------------

describe('getSpecificationType narrowed return type', () => {
  it('should return "Manifest" for a manifest', () => {
    const m = new Maniiifest(manifest);
    const type = m.getSpecificationType();
    expect(type).toBe('Manifest');
    // TypeScript: type should be 'Manifest' | 'Collection', not string
    const _check: 'Manifest' | 'Collection' = type;
  });

  it('should return "Collection" for a collection', () => {
    const m = new Maniiifest(collection);
    const type = m.getSpecificationType();
    expect(type).toBe('Collection');
    const _check: 'Manifest' | 'Collection' = type;
  });
});

// ------------------------------------------------------------------
// specification field is private
// ------------------------------------------------------------------

describe('specification field is private', () => {
  it('should not expose the specification field on the instance', () => {
    const m = new Maniiifest(manifest);
    // "specification" is private so it should not appear in the public keys
    // At runtime JS doesn't enforce private, but we can verify it exists only as
    // an own property — the real protection is at compile time (tested by tsc).
    // This test documents the intent.
    expect((m as any).specification).toBeDefined();
    // The key point: TypeScript prevents `m.specification` at compile time.
    // We can't test that directly in a runtime test, but we verify the field
    // is not accidentally exposed through getters or enumerable prototype props.
    const protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(m));
    expect(protoKeys).not.toContain('specification');
  });
});

// ------------------------------------------------------------------
// Polymorphic fields return plain JSON (not ATD wrappers)
// ------------------------------------------------------------------

describe('Polymorphic return values are plain JSON', () => {
  it('getManifestContext returns a string, not {kind, value}', () => {
    const m = new Maniiifest(manifest);
    const ctx = m.getManifestContext();
    expect(typeof ctx).toBe('string');
    expect(ctx).toBe("http://iiif.io/api/presentation/3/context.json");
  });

  it('getManifestContext with array returns string[], not {kind, value}', () => {
    const multi = {
      ...manifest,
      "@context": [
        "http://www.w3.org/ns/anno.jsonld",
        "http://iiif.io/api/presentation/3/context.json"
      ]
    };
    const m = new Maniiifest(multi);
    const ctx = m.getManifestContext();
    expect(Array.isArray(ctx)).toBe(true);
    expect(ctx).toEqual([
      "http://www.w3.org/ns/anno.jsonld",
      "http://iiif.io/api/presentation/3/context.json"
    ]);
  });

  it('getManifestLabel returns Record<string, string[]>, not {kind, value}', () => {
    const m = new Maniiifest(manifest);
    const label = m.getManifestLabel();
    expect(label).toEqual({ "en": ["Book 1"] });
    // Should not have ATD wrapper shape
    expect(label).not.toHaveProperty('kind');
    expect(label).not.toHaveProperty('value');
  });

  it('getManifestLabel with plain string returns the string', () => {
    const stringLabel = { ...manifest, label: "A plain label" };
    const m = new Maniiifest(stringLabel);
    const label = m.getManifestLabel();
    expect(label).toBe("A plain label");
  });

  it('getCollectionLabel returns Record<string, string[]>, not {kind, value}', () => {
    const m = new Maniiifest(collection);
    const label = m.getCollectionLabel();
    expect(label).toEqual({ "en": ["Example Collection"] });
    expect(label).not.toHaveProperty('kind');
  });

  it('getManifestService returns the plain service array', () => {
    const m = new Maniiifest(manifest);
    const service = m.getManifestService();
    expect(service).toEqual([
      {
        "id": "https://example.org/iiif/book1/access-control",
        "type": "AuthCookieService1",
        "profile": "http://iiif.io/api/auth/1"
      }
    ]);
    // Not an ATD wrapper
    expect(service).not.toHaveProperty('kind');
  });

  it('iterateManifestService yields plain service items', () => {
    const m = new Maniiifest(manifest);
    const items = Array.from(m.iterateManifestService());
    expect(items.length).toBe(1);
    expect(items[0]).toEqual({
      "id": "https://example.org/iiif/book1/access-control",
      "type": "AuthCookieService1",
      "profile": "http://iiif.io/api/auth/1"
    });
    expect(items[0]).not.toHaveProperty('kind');
  });

  it('getAnnotationBody returns the body object, not {kind, value}', () => {
    const m = new Maniiifest(annotation, "Annotation");
    const body = m.getAnnotationBody();
    expect(body).toEqual({
      "type": "TextualBody",
      "value": "Comment text",
      "format": "text/plain"
    });
    expect(body).not.toHaveProperty('kind');
  });

  it('getAnnotationTarget returns a string when target is a string', () => {
    const m = new Maniiifest(annotation, "Annotation");
    const target = m.getAnnotationTarget();
    expect(target).toBe("http://example.org/target1");
  });

  it('getAnnotationCollectionContext returns a string, not {kind, value}', () => {
    const annoCol = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "id": "http://example.org/collection1",
      "type": "AnnotationCollection",
      "label": "Steampunk Annotations",
      "total": 42023,
      "first": "http://example.org/page1",
      "last": "http://example.org/page42"
    };
    const m = new Maniiifest(annoCol, "AnnotationCollection");
    const ctx = m.getAnnotationCollectionContext();
    expect(typeof ctx).toBe('string');
    expect(ctx).toBe("http://www.w3.org/ns/anno.jsonld");
  });

  it('getAnnotationCollectionFirst returns a string when first is a URL', () => {
    const annoCol = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "id": "http://example.org/collection1",
      "type": "AnnotationCollection",
      "label": "Steampunk",
      "total": 10,
      "first": "http://example.org/page1",
      "last": "http://example.org/page2"
    };
    const m = new Maniiifest(annoCol, "AnnotationCollection");
    const first = m.getAnnotationCollectionFirst();
    expect(typeof first).toBe('string');
    expect(first).toBe("http://example.org/page1");
  });

  it('getAnnotationPagePartOf returns a plain object, not {kind, value}', () => {
    const annoPage = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "id": "http://example.org/page1",
      "type": "AnnotationPage",
      "partOf": {
        "id": "http://example.org/collection1",
        "total": 42023
      },
      "items": []
    };
    const m = new Maniiifest(annoPage, "AnnotationPage");
    const partOf = m.getAnnotationPagePartOf();
    expect(partOf).toEqual({
      "id": "http://example.org/collection1",
      "total": 42023
    });
    expect(partOf).not.toHaveProperty('kind');
  });
});

// ------------------------------------------------------------------
// Return value shapes match user-facing types
// ------------------------------------------------------------------

describe('Return values match user-facing type shapes', () => {
  it('getManifest returns a well-formed Manifest object', () => {
    const m = new Maniiifest(manifest);
    const result = m.getManifest();
    expect(result).toBeDefined();
    // Must have required Manifest fields
    expect(result!.id).toBe("https://example.org/iiif/book1/manifest");
    expect(result!.type).toBe("Manifest");
    expect(result!.label).toEqual({ "en": ["Book 1"] });
    // TypeScript assignability (compile-time check)
    const _typed: Manifest = result!;
  });

  it('getCollection returns a well-formed Collection object', () => {
    const m = new Maniiifest(collection);
    const result = m.getCollection();
    expect(result).toBeDefined();
    expect(result!.id).toBe("https://example.org/iiif/collection1");
    expect(result!.type).toBe("Collection");
    const _typed: Collection = result!;
  });

  it('iterateManifestCanvas yields Canvas objects', () => {
    const m = new Maniiifest(manifest);
    const canvases = Array.from(m.iterateManifestCanvas());
    expect(canvases.length).toBe(1);
    const canvas = canvases[0];
    expect(canvas.id).toBe("https://example.org/iiif/book1/canvas/p1");
    expect(canvas.type).toBe("Canvas");
    expect(canvas.height).toBe(1000);
    expect(canvas.width).toBe(750);
    // TypeScript assignability
    const _c: Canvas = canvas;
  });

  it('iterateManifestCanvasAnnotationPage yields AnnotationPage objects', () => {
    const m = new Maniiifest(manifest);
    const pages = Array.from(m.iterateManifestCanvasAnnotationPage());
    expect(pages.length).toBe(1);
    expect(pages[0].id).toBe("https://example.org/iiif/book1/page/p1/1");
    expect(pages[0].type).toBe("AnnotationPage");
    const _ap: AnnotationPage = pages[0];
  });

  it('iterateManifestCanvasAnnotation yields Annotation objects', () => {
    const m = new Maniiifest(manifest);
    const annotations = Array.from(m.iterateManifestCanvasAnnotation());
    expect(annotations.length).toBe(1);
    const a = annotations[0];
    expect(a.id).toBe("https://example.org/iiif/book1/annotation/p0001-image");
    expect(a.type).toBe("Annotation");
    expect(a.motivation).toBe("painting");
    const _a: Annotation = a;
  });

  it('iterateManifestMetadata yields Metadata objects', () => {
    const m = new Maniiifest(manifest);
    const meta = Array.from(m.iterateManifestMetadata());
    expect(meta.length).toBe(1);
    expect(meta[0]).toEqual({
      "label": { "en": ["Author"] },
      "value": { "en": ["Anne Author"] }
    });
    const _m: Metadata = meta[0];
  });

  it('iterateCollectionManifest yields items matching Specification shape', () => {
    const m = new Maniiifest(collection);
    const items = Array.from(m.iterateCollectionManifest());
    expect(items.length).toBe(1);
    expect(items[0].id).toBe("https://example.org/iiif/book1/manifest");
    expect(items[0].type).toBe("Manifest");
  });

  it('iterateAnnotationPageAnnotation yields well-formed Annotations', () => {
    const page = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "id": "http://example.org/page1",
      "type": "AnnotationPage",
      "items": [
        {
          "id": "http://example.org/anno1",
          "type": "Annotation",
          "body": "http://example.net/comment1",
          "target": "http://example.com/book/chapter1"
        }
      ]
    };
    const m = new Maniiifest(page, "AnnotationPage");
    const annotations = Array.from(m.iterateAnnotationPageAnnotation());
    expect(annotations.length).toBe(1);
    expect(annotations[0].id).toBe("http://example.org/anno1");
    const _a: Annotation = annotations[0];
  });
});

// ------------------------------------------------------------------
// Dimension spelling fix (was Dimenson)
// ------------------------------------------------------------------

describe('Dimension spelling fix', () => {
  it('iiif-types exports Dimension (not Dimenson)', () => {
    // This import would fail at compile-time if the type didn't exist.
    // At runtime, we verify the generated file contains the correct spelling.
    const fs = require('fs');
    const path = require('path');
    const content = fs.readFileSync(
      path.join(__dirname, '..', 'src', 'iiif-types.ts'), 'utf-8'
    );
    expect(content).toContain('export type Dimension');
    expect(content).not.toContain('Dimenson');
  });
});

// ------------------------------------------------------------------
// Type re-exports from index.ts
// ------------------------------------------------------------------

describe('Type re-exports from index.ts', () => {
  it('index.ts re-exports all iiif-types', () => {
    const iiifTypes = require('../src/iiif-types');
    const index = require('../src/index');

    // Every export from iiif-types should be available from index
    // (types are erased at runtime, but interfaces/type aliases that
    // correspond to runtime values — like class constructors — won't appear;
    // we check that the module re-export is wired up)
    expect(index.Maniiifest).toBeDefined();

    // The re-export `export * from './iiif-types'` ensures type availability.
    // At runtime iiif-types exports are empty (all `type` or `interface`),
    // so we verify the index module source contains the re-export.
    const fs = require('fs');
    const path = require('path');
    const indexSrc = fs.readFileSync(
      path.join(__dirname, '..', 'src', 'index.ts'), 'utf-8'
    );
    expect(indexSrc).toContain("export * from './iiif-types'");
  });
});

// ------------------------------------------------------------------
// Constructor error handling
// ------------------------------------------------------------------

describe('Constructor type validation', () => {
  it('throws on unsupported type argument', () => {
    expect(() => new Maniiifest({}, "InvalidType" as any)).toThrow('Unsupported type');
  });

  it('accepts undefined type for Manifest/Collection', () => {
    expect(() => new Maniiifest(manifest)).not.toThrow();
    expect(() => new Maniiifest(collection)).not.toThrow();
  });

  it('accepts explicit Annotation type', () => {
    expect(() => new Maniiifest(annotation, "Annotation")).not.toThrow();
  });
});

// ------------------------------------------------------------------
// Real-world sample: polymorphic fields roundtrip correctly
// ------------------------------------------------------------------

describe('Real sample roundtrip (wellcome collection)', () => {
  const fs = require('fs');
  const path = require('path');
  const wellcome = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'samples', 'wellcome.json'), 'utf-8')
  );

  it('parses as Collection and returns correct type', () => {
    const m = new Maniiifest(wellcome);
    expect(m.getSpecificationType()).toBe('Collection');
  });

  it('getCollectionContext returns plain string', () => {
    const m = new Maniiifest(wellcome);
    const ctx = m.getCollectionContext();
    expect(typeof ctx).toBe('string');
    expect(ctx).toBe("http://iiif.io/api/presentation/3/context.json");
  });

  it('getCollectionLabel returns Record<string, string[]>', () => {
    const m = new Maniiifest(wellcome);
    const label = m.getCollectionLabel();
    expect(label).toBeDefined();
    expect(label).not.toHaveProperty('kind');
    // Label should be an object with language keys
    expect(typeof label).toBe('object');
    expect(label!["en"]).toBeDefined();
    expect(Array.isArray(label!["en"])).toBe(true);
  });

  it('iterateCollectionMetadata yields plain Metadata objects', () => {
    const m = new Maniiifest(wellcome);
    const metadata = Array.from(m.iterateCollectionMetadata());
    expect(metadata.length).toBeGreaterThan(0);
    for (const item of metadata) {
      // Each metadata item should have label and value, not {kind, value} wrappers
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('value');
      expect(item).not.toHaveProperty('kind');
    }
  });

  it('iterateCollectionHomepage yields plain Homepage objects', () => {
    const m = new Maniiifest(wellcome);
    const homepages = Array.from(m.iterateCollectionHomepage());
    expect(homepages.length).toBeGreaterThan(0);
    for (const hp of homepages) {
      expect(hp).toHaveProperty('id');
      expect(hp).toHaveProperty('type');
      expect(hp).not.toHaveProperty('kind');
    }
  });
});
