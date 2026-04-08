import { Maniiifest } from '../src/Maniiifest';

describe('Collection getters', () => {

  const collection = {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    "id": "https://iiif.io/api/cookbook/recipe/0032-collection/collection.json",
    "type": "Collection",
    "label": { "en": ["Simple Collection Example"] }
  };

  const items = [
    {
      "id": "https://example.org/manifest-01.json",
      "type": "Manifest",
      "label": { "en": ["The Gulf Stream"] }
    },
    {
      "id": "https://example.org/manifest-02.json",
      "type": "Manifest",
      "label": { "en": ["Northeaster"] }
    }
  ];

  it('getSpecificationType returns "Collection"', () => {
    const m = new Maniiifest(collection);
    expect(m.getSpecificationType()).toBe('Collection');
    // Compile-time check: narrowed to string literal union
    const _: 'Manifest' | 'Collection' = m.getSpecificationType();
  });

  it('getCollectionContext returns string', () => {
    const m = new Maniiifest(collection);
    expect(m.getCollectionContext()).toBe("http://iiif.io/api/presentation/3/context.json");
  });

  it('getCollectionContext returns null for manifest', () => {
    const m = new Maniiifest({ ...collection, type: "Manifest" });
    expect(m.getCollectionContext()).toBeNull();
  });

  it('getCollectionContext with array returns string[]', () => {
    const m = new Maniiifest({
      ...collection,
      "@context": ["http://www.w3.org/ns/anno.jsonld", "http://iiif.io/api/presentation/3/context.json"]
    });
    const ctx = m.getCollectionContext();
    expect(Array.isArray(ctx)).toBe(true);
    expect(ctx).toHaveLength(2);
  });

  it('getCollectionId returns the id', () => {
    const m = new Maniiifest(collection);
    expect(m.getCollectionId()).toBe("https://iiif.io/api/cookbook/recipe/0032-collection/collection.json");
  });

  it('getCollectionLabel returns Record<string, string[]>', () => {
    const m = new Maniiifest(collection);
    const label = m.getCollectionLabel();
    expect(label).toEqual({ en: ["Simple Collection Example"] });
    // Polymorphic unwrap: no ATD wrapper
    expect(label).not.toHaveProperty('kind');
  });

  it('getCollectionLabel with plain string', () => {
    const m = new Maniiifest({ ...collection, label: "Plain label" });
    expect(m.getCollectionLabel()).toBe("Plain label");
  });

  it('getCollectionLabelByLanguage returns matching language', () => {
    const m = new Maniiifest(collection);
    expect(m.getCollectionLabelByLanguage("en")).toEqual({ en: ["Simple Collection Example"] });
  });

  it('getCollectionLabelByLanguage returns null for missing language', () => {
    const m = new Maniiifest(collection);
    expect(m.getCollectionLabelByLanguage("fr")).toBeNull();
  });

  it('getCollection returns a well-formed Collection object', () => {
    const m = new Maniiifest({ items, ...collection });
    const result = m.getCollection();
    expect(result).toBeDefined();
    expect(result!.id).toBe(collection.id);
    expect(result!.type).toBe("Collection");
    expect(result!.label).toEqual({ en: ["Simple Collection Example"] });
    expect(result!.items).toHaveLength(2);
  });

  it('getCollection returns null for manifest', () => {
    const manifest = { id: "x", type: "Manifest", label: { en: ["M"] } };
    const m = new Maniiifest(manifest);
    expect(m.getCollection()).toBeNull();
  });

  it('getCollectionService returns service when present', () => {
    const service = [{ id: "https://example.org/auth", type: "AuthCookieService1" }];
    const m = new Maniiifest({ service, ...collection });
    const result = m.getCollectionService();
    expect(result).toEqual(service);
    expect(result).not.toHaveProperty('kind');
  });

  it('getCollectionService returns null when absent', () => {
    const m = new Maniiifest(collection);
    expect(m.getCollectionService()).toBeNull();
  });

  it('getCollectionRequiredStatement returns statement when present', () => {
    const requiredStatement = {
      label: { en: ["Attribution"] },
      value: { en: ["Provided by Example"] }
    };
    const m = new Maniiifest({ requiredStatement, ...collection });
    expect(m.getCollectionRequiredStatement()).toEqual(requiredStatement);
  });

  it('getCollectionRequiredStatement returns null when absent', () => {
    const m = new Maniiifest(collection);
    expect(m.getCollectionRequiredStatement()).toBeNull();
  });
});

describe('Collection iterators', () => {

  const collection = {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    "id": "https://example.org/collection",
    "type": "Collection",
    "label": { "en": ["Top Collection"] }
  };

  const items = [
    {
      "id": "https://example.org/manifest-01.json",
      "type": "Manifest",
      "label": { "en": ["Manifest 1"] }
    },
    {
      "id": "https://example.org/manifest-02.json",
      "type": "Manifest",
      "label": { "en": ["Manifest 2"] }
    }
  ];

  it('iterateCollectionManifest yields manifests', () => {
    const m = new Maniiifest({ items, ...collection });
    const result = Array.from(m.iterateCollectionManifest());
    expect(result).toEqual(items);
  });

  it('iterateCollectionManifest yields empty for no items', () => {
    const m = new Maniiifest(collection);
    expect(Array.from(m.iterateCollectionManifest())).toEqual([]);
  });

  it('iterateCollectionLabel yields labels', () => {
    const m = new Maniiifest({ items, ...collection });
    const result = Array.from(m.iterateCollectionLabel());
    expect(result).toEqual([{ en: ["Top Collection"] }]);
  });

  it('iterateCollectionMetadata yields metadata', () => {
    const metadata = [
      { label: { en: ["Author"] }, value: { en: ["Anne Author"] } }
    ];
    const m = new Maniiifest({ metadata, items, ...collection });
    expect(Array.from(m.iterateCollectionMetadata())).toEqual(metadata);
  });

  it('iterateCollectionMetadata yields empty when absent', () => {
    const m = new Maniiifest({ items, ...collection });
    expect(Array.from(m.iterateCollectionMetadata())).toEqual([]);
  });

  it('iterateCollectionThumbnail yields thumbnails', () => {
    const thumbnail = [
      { id: "https://example.org/thumb.jpg", type: "Image", format: "image/jpeg" }
    ];
    const m = new Maniiifest({ thumbnail, items, ...collection });
    const result = Array.from(m.iterateCollectionThumbnail());
    expect(result).toEqual(thumbnail);
  });

  it('iterateCollectionThumbnail yields empty when absent', () => {
    const m = new Maniiifest({ items, ...collection });
    expect(Array.from(m.iterateCollectionThumbnail())).toEqual([]);
  });

  it('iterateCollectionProvider yields providers', () => {
    const provider = [
      { id: "https://example.org", type: "Agent", label: { en: ["Example Org"] } }
    ];
    const m = new Maniiifest({ provider, items, ...collection });
    expect(Array.from(m.iterateCollectionProvider())).toEqual(provider);
  });

  it('iterateCollectionProvider yields empty when absent', () => {
    const m = new Maniiifest({ items, ...collection });
    expect(Array.from(m.iterateCollectionProvider())).toEqual([]);
  });

  it('iterateCollectionHomepage yields homepages', () => {
    const homepage = [
      { id: "https://example.org", type: "Text", label: { en: ["Home"] } }
    ];
    const m = new Maniiifest({ homepage, items, ...collection });
    expect(Array.from(m.iterateCollectionHomepage())).toEqual(homepage);
  });

  it('iterateCollectionHomepage yields empty when absent', () => {
    const m = new Maniiifest({ items, ...collection });
    expect(Array.from(m.iterateCollectionHomepage())).toEqual([]);
  });

  it('iterateCollectionService yields service items', () => {
    const service = [
      { id: "https://example.org/auth", type: "AuthCookieService1", profile: "http://iiif.io/api/auth/1" }
    ];
    const m = new Maniiifest({ service, items, ...collection });
    const result = Array.from(m.iterateCollectionService());
    expect(result).toEqual(service);
    expect(result[0]).not.toHaveProperty('kind');
  });

  it('iterateCollectionService yields empty when absent', () => {
    const m = new Maniiifest({ items, ...collection });
    expect(Array.from(m.iterateCollectionService())).toEqual([]);
  });
});

describe('Collection iteration (iterateCollection / iterateCollectionCollection)', () => {

  const nested = {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    "id": "https://example.org/top",
    "type": "Collection",
    "label": { "en": ["Top"] },
    "items": [
      {
        "id": "https://example.org/sub",
        "type": "Collection",
        "label": { "en": ["Sub Collection"] },
        "items": [
          {
            "id": "https://example.org/manifest-1",
            "type": "Manifest",
            "label": { "en": ["Manifest 1"] }
          }
        ]
      },
      {
        "id": "https://example.org/manifest-2",
        "type": "Manifest",
        "label": { "en": ["Manifest 2"] }
      }
    ]
  };

  it('iterateCollection yields top collection, sub-collection, and manifests', () => {
    const m = new Maniiifest(nested);
    const result = Array.from(m.iterateCollection());
    expect(result).toHaveLength(4); // top + sub + 2 manifests
    expect(result[0].type).toBe("Collection");
    expect(result[0].id).toBe("https://example.org/top");
    expect(result[1].type).toBe("Collection");
    expect(result[1].id).toBe("https://example.org/sub");
    expect(result[2].type).toBe("Manifest");
    expect(result[3].type).toBe("Manifest");
  });

  it('iterateCollection on a manifest yields just the manifest', () => {
    const manifest = { id: "https://example.org/m", type: "Manifest", label: { en: ["M"] } };
    const m = new Maniiifest(manifest);
    const result = Array.from(m.iterateCollection());
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("Manifest");
  });

  it('iterateCollectionCollection yields only collections', () => {
    const m = new Maniiifest(nested);
    const result = Array.from(m.iterateCollectionCollection());
    expect(result).toHaveLength(2); // top + sub
    expect(result.every(c => c.type === "Collection")).toBe(true);
  });

  it('iterateCollectionManifest traverses into nested collections', () => {
    const m = new Maniiifest(nested);
    const result = Array.from(m.iterateCollectionManifest());
    expect(result).toHaveLength(2);
    expect(result.every(r => r.type === "Manifest")).toBe(true);
  });
});

describe('Collection with real sample (nestedcollection.json)', () => {
  const fs = require('fs');
  const path = require('path');
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'samples', 'nestedcollection.json'), 'utf-8')
  );

  it('parses as Collection', () => {
    const m = new Maniiifest(data);
    expect(m.getSpecificationType()).toBe('Collection');
  });

  it('getCollectionContext returns plain value (polymorphic unwrap)', () => {
    const m = new Maniiifest(data);
    const ctx = m.getCollectionContext();
    // Context is an array in nestedcollection.json
    expect(Array.isArray(ctx)).toBe(true);
  });

  it('iterateCollectionThumbnail finds nested thumbnails', () => {
    const m = new Maniiifest(data);
    const thumbs = Array.from(m.iterateCollectionThumbnail());
    expect(thumbs.length).toBeGreaterThan(0);
    expect(thumbs[0]).toHaveProperty('id');
    expect(thumbs[0]).not.toHaveProperty('kind');
  });

  it('iterateCollectionProvider finds providers', () => {
    const m = new Maniiifest(data);
    const providers = Array.from(m.iterateCollectionProvider());
    expect(providers.length).toBeGreaterThan(0);
    expect(providers[0]).toHaveProperty('id');
    expect(providers[0]).toHaveProperty('type');
  });

  it('iterateCollectionHomepage finds nested homepages', () => {
    const m = new Maniiifest(data);
    const homepages = Array.from(m.iterateCollectionHomepage());
    expect(homepages.length).toBeGreaterThan(0);
    expect(homepages[0]).toHaveProperty('id');
  });

  it('getCollectionRequiredStatement returns the statement', () => {
    const m = new Maniiifest(data);
    const rs = m.getCollectionRequiredStatement();
    expect(rs).toBeDefined();
    expect(rs).toHaveProperty('label');
    expect(rs).toHaveProperty('value');
  });

  it('iterateCollectionMetadata yields all metadata across collection tree', () => {
    const m = new Maniiifest(data);
    const meta = Array.from(m.iterateCollectionMetadata());
    // nestedcollection.json has no metadata at top level
    // but verify calling it doesn't throw
    expect(Array.isArray(meta)).toBe(true);
  });
});
