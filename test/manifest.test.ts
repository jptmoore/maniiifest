import { Maniiifest } from '../src/Maniiifest';

describe('Manifest getters', () => {

  const manifest = {
    "id": "https://example.org/iiif/book1/manifest",
    "type": "Manifest",
    "label": { "en": ["Book 1"] }
  };

  it('getSpecificationType returns "Manifest"', () => {
    const m = new Maniiifest(manifest);
    expect(m.getSpecificationType()).toBe('Manifest');
    const _: 'Manifest' | 'Collection' = m.getSpecificationType();
  });

  it('getManifestId returns the id', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestId()).toBe("https://example.org/iiif/book1/manifest");
  });

  it('getManifestId returns null for collection', () => {
    const col = { ...manifest, type: "Collection" };
    const m = new Maniiifest(col);
    expect(m.getManifestId()).toBeNull();
  });

  it('getManifestLabel returns Record<string, string[]>', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestLabel()).toEqual({ en: ["Book 1"] });
  });

  it('getManifestLabel returns string when label is a string', () => {
    const m = new Maniiifest({ ...manifest, label: "A plain label" });
    expect(m.getManifestLabel()).toBe("A plain label");
  });

  it('getManifestLabel returns null for collection', () => {
    const m = new Maniiifest({ ...manifest, type: "Collection" });
    expect(m.getManifestLabel()).toBeNull();
  });

  it('getManifestLabelByLanguage returns matching language', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestLabelByLanguage("en")).toEqual({ en: ["Book 1"] });
  });

  it('getManifestLabelByLanguage returns null for missing language', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestLabelByLanguage("fr")).toBeNull();
  });

  it('getManifestContext returns string', () => {
    const m = new Maniiifest({
      "@context": "http://iiif.io/api/presentation/3/context.json",
      ...manifest
    });
    expect(m.getManifestContext()).toBe("http://iiif.io/api/presentation/3/context.json");
  });

  it('getManifestContext returns string[] for array context', () => {
    const m = new Maniiifest({
      "@context": ["http://www.w3.org/ns/anno.jsonld", "http://iiif.io/api/presentation/3/context.json"],
      ...manifest
    });
    const ctx = m.getManifestContext();
    expect(Array.isArray(ctx)).toBe(true);
    expect(ctx).toHaveLength(2);
  });

  it('getManifestContext returns null when absent', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestContext()).toBeNull();
  });

  it('getManifest returns a well-formed Manifest', () => {
    const m = new Maniiifest(manifest);
    const result = m.getManifest();
    expect(result).toBeDefined();
    expect(result!.id).toBe(manifest.id);
    expect(result!.type).toBe("Manifest");
    expect(result!.label).toEqual({ en: ["Book 1"] });
  });

  it('getManifest returns null for collection', () => {
    const m = new Maniiifest({ ...manifest, type: "Collection" });
    expect(m.getManifest()).toBeNull();
  });

  it('getManifestSummary returns the summary', () => {
    const summary = { en: ["Book 1, written by Anne Author."] };
    const m = new Maniiifest({ summary, ...manifest });
    expect(m.getManifestSummary()).toEqual(summary);
  });

  it('getManifestSummary returns null when absent', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestSummary()).toBeNull();
  });

  it('getManifestViewingDirection returns the direction', () => {
    const m = new Maniiifest({ viewingDirection: "right-to-left", ...manifest });
    expect(m.getManifestViewingDirection()).toBe("right-to-left");
  });

  it('getManifestViewingDirection returns null when absent', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestViewingDirection()).toBeNull();
  });

  it('getManifestNavDate returns the date', () => {
    const m = new Maniiifest({ navDate: "1856-01-01T00:00:00Z", ...manifest });
    expect(m.getManifestNavDate()).toBe("1856-01-01T00:00:00Z");
  });

  it('getManifestNavDate returns null when absent', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestNavDate()).toBeNull();
  });

  it('getManifestNavPlace returns the navPlace', () => {
    const navPlace = {
      id: "http://example.com/feature-collection/1",
      type: "FeatureCollection",
      features: [{
        id: "http://example.com/feature/1",
        type: "Feature",
        properties: {},
        geometry: { type: "Point", coordinates: [9.938, 51.533] }
      }]
    };
    const m = new Maniiifest({ navPlace, ...manifest });
    expect(m.getManifestNavPlace()).toEqual(navPlace);
  });

  it('getManifestNavPlace returns null when absent', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestNavPlace()).toBeNull();
  });

  it('getManifestRights returns the rights URI', () => {
    const m = new Maniiifest({ rights: "http://rightsstatements.org/vocab/NoC-NC/1.0/", ...manifest });
    expect(m.getManifestRights()).toBe("http://rightsstatements.org/vocab/NoC-NC/1.0/");
  });

  it('getManifestRights returns null when absent', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestRights()).toBeNull();
  });

  it('getManifestRequiredStatement returns the statement', () => {
    const requiredStatement = {
      label: { en: ["Attribution"] },
      value: { en: ["Provided by Example Organization"] }
    };
    const m = new Maniiifest({ requiredStatement, ...manifest });
    expect(m.getManifestRequiredStatement()).toEqual(requiredStatement);
  });

  it('getManifestRequiredStatement returns null when absent', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestRequiredStatement()).toBeNull();
  });

  it('getManifestStart returns the start canvas', () => {
    const start = { id: "https://example.org/iiif/book1/canvas/p1", type: "Canvas", label: { en: ["p. 1"] } };
    const m = new Maniiifest({ start, ...manifest });
    expect(m.getManifestStart()).toEqual(start);
  });

  it('getManifestStart returns null when absent', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestStart()).toBeNull();
  });

  it('getManifestService returns the service (polymorphic unwrap)', () => {
    const service = [
      { id: "https://example.org/auth", type: "AuthCookieService1", profile: "http://iiif.io/api/auth/1" }
    ];
    const m = new Maniiifest({ service, ...manifest });
    const result = m.getManifestService();
    expect(result).toEqual(service);
    expect(result).not.toHaveProperty('kind');
  });

  it('getManifestService returns null when absent', () => {
    const m = new Maniiifest(manifest);
    expect(m.getManifestService()).toBeNull();
  });
});

describe('Manifest iterators', () => {

  const manifest = {
    "id": "https://example.org/iiif/book1/manifest",
    "type": "Manifest",
    "label": { "en": ["Book 1"] }
  };

  it('iterateManifestBehavior yields behaviors', () => {
    const m = new Maniiifest({ behavior: ["paged"], ...manifest });
    expect(Array.from(m.iterateManifestBehavior())).toEqual(["paged"]);
  });

  it('iterateManifestBehavior yields empty when absent', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestBehavior())).toEqual([]);
  });

  it('iterateManifestRendering yields renderings', () => {
    const rendering = [
      { id: "https://example.org/book1.pdf", type: "Text", label: { en: ["Download as PDF"] }, format: "application/pdf" }
    ];
    const m = new Maniiifest({ rendering, ...manifest });
    expect(Array.from(m.iterateManifestRendering())).toEqual(rendering);
  });

  it('iterateManifestRendering yields empty when absent', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestRendering())).toEqual([]);
  });

  it('iterateManifestPartOf yields partOf (polymorphic unwrap)', () => {
    const partOf = [
      { id: "https://example.org/collection", type: "Collection", label: { en: ["Book 1"] } }
    ];
    const m = new Maniiifest({ partOf, ...manifest });
    const result = Array.from(m.iterateManifestPartOf());
    expect(result).toEqual(partOf);
    expect(result[0]).not.toHaveProperty('kind');
  });

  it('iterateManifestPartOf yields empty when absent', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestPartOf())).toEqual([]);
  });

  it('iterateManifestSeeAlso yields seeAlso', () => {
    const seeAlso = [
      { id: "https://example.org/book1.xml", type: "Dataset", label: { en: ["Metadata as XML"] }, format: "application/xml" }
    ];
    const m = new Maniiifest({ seeAlso, ...manifest });
    expect(Array.from(m.iterateManifestSeeAlso())).toEqual(seeAlso);
  });

  it('iterateManifestSeeAlso yields empty when absent', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestSeeAlso())).toEqual([]);
  });

  it('iterateManifestService yields service items (polymorphic unwrap)', () => {
    const service = [
      { id: "https://example.org/auth", type: "AuthCookieService1", profile: "http://iiif.io/api/auth/1" }
    ];
    const m = new Maniiifest({ service, ...manifest });
    const result = Array.from(m.iterateManifestService());
    expect(result).toEqual(service);
    expect(result[0]).not.toHaveProperty('kind');
  });

  it('iterateManifestService yields empty when absent', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestService())).toEqual([]);
  });

  it('iterateManifestServices yields services items', () => {
    const services = [
      {
        "@id": "https://example.org/iiif/auth/login",
        "@type": "AuthCookieService1",
        "label": "Login",
        "profile": "http://iiif.io/api/auth/1/login",
        "service": [
          { "@id": "https://example.org/iiif/auth/token", "@type": "AuthTokenService1", "profile": "http://iiif.io/api/auth/1/token" }
        ]
      }
    ];
    const m = new Maniiifest({ services, ...manifest });
    expect(Array.from(m.iterateManifestServices())).toEqual(services);
  });

  it('iterateManifestThumbnail yields thumbnails', () => {
    const thumbnail = [
      { id: "https://example.org/thumb.jpg", type: "Image", format: "image/jpeg",
        service: [{ id: "https://example.org/img", type: "ImageService3", profile: "level1" }] }
    ];
    const m = new Maniiifest({ thumbnail, ...manifest });
    expect(Array.from(m.iterateManifestThumbnail())).toEqual(thumbnail);
  });

  it('iterateManifestThumbnail yields empty when absent', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestThumbnail())).toEqual([]);
  });

  it('iterateManifestHomepage yields homepages', () => {
    const homepage = [{ id: "http://example.org", type: "Text", label: { en: ["Home"] } }];
    const m = new Maniiifest({ homepage, ...manifest });
    expect(Array.from(m.iterateManifestHomepage())).toEqual(homepage);
  });

  it('iterateManifestHomepage yields empty when absent', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestHomepage())).toEqual([]);
  });

  it('iterateManifestProvider yields providers', () => {
    const provider = [{ id: "http://example.org", type: "Agent", label: { en: ["Org"] } }];
    const m = new Maniiifest({ provider, ...manifest });
    expect(Array.from(m.iterateManifestProvider())).toEqual(provider);
  });

  it('iterateManifestProvider yields empty when absent', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestProvider())).toEqual([]);
  });

  it('iterateManifestMetadata yields metadata', () => {
    const metadata = [
      { label: { en: ["Author"] }, value: { en: ["Anne Author"] } }
    ];
    const m = new Maniiifest({ metadata, ...manifest });
    expect(Array.from(m.iterateManifestMetadata())).toEqual(metadata);
  });

  it('iterateManifestMetadata yields empty when absent', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestMetadata())).toEqual([]);
  });

  it('iterateManifestProviderHomepage yields homepages from providers', () => {
    const provider = [
      {
        id: "http://example.org",
        type: "Agent",
        label: { en: ["Org"] },
        homepage: [{ id: "http://example.org/home", type: "Text", label: { en: ["Home"] } }],
        seeAlso: [{ id: "http://example.org/data", type: "Dataset" }]
      }
    ];
    const m = new Maniiifest({ provider, ...manifest });
    const result = Array.from(m.iterateManifestProviderHomepage());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("http://example.org/home");
  });

  it('iterateManifestProviderHomepage yields empty when no providers', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestProviderHomepage())).toEqual([]);
  });

  it('iterateManifestProviderSeeAlso yields seeAlso from providers', () => {
    const provider = [
      {
        id: "http://example.org",
        type: "Agent",
        label: { en: ["Org"] },
        seeAlso: [{ id: "http://example.org/data", type: "Dataset" }]
      }
    ];
    const m = new Maniiifest({ provider, ...manifest });
    const result = Array.from(m.iterateManifestProviderSeeAlso());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("http://example.org/data");
  });

  it('iterateManifestProviderSeeAlso yields empty when no providers', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestProviderSeeAlso())).toEqual([]);
  });
});

describe('Manifest canvas iteration', () => {

  const manifest = {
    "id": "https://example.org/iiif/book1/manifest",
    "type": "Manifest",
    "label": { "en": ["Book 1"] }
  };

  const items = [
    {
      "id": "https://example.org/canvas/p1",
      "type": "Canvas",
      "label": { "none": ["p. 1"] },
      "height": 1000,
      "width": 750,
      "items": [
        {
          "id": "https://example.org/page/p1/1",
          "type": "AnnotationPage",
          "items": [
            {
              "id": "https://example.org/annotation/p0001-image",
              "type": "Annotation",
              "motivation": "painting",
              "body": {
                "id": "https://example.org/page1/full/max/0/default.jpg",
                "type": "Image",
                "format": "image/jpeg",
                "service": [
                  { "id": "https://example.org/page1", "type": "ImageService3", "profile": "level2",
                    "service": [{ "@id": "https://example.org/auth/login", "@type": "AuthCookieService1" }]
                  }
                ],
                "height": 2000,
                "width": 1500
              },
              "target": "https://example.org/canvas/p1"
            }
          ]
        }
      ]
    }
  ];

  it('iterateManifestCanvas yields canvases', () => {
    const m = new Maniiifest({ items, ...manifest });
    const result = Array.from(m.iterateManifestCanvas());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/canvas/p1");
    expect(result[0].type).toBe("Canvas");
    expect(result[0].height).toBe(1000);
    expect(result[0].width).toBe(750);
  });

  it('iterateManifestCanvas yields empty when no items', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestCanvas())).toEqual([]);
  });

  it('iterateManifestCanvasAnnotationPage yields annotation pages', () => {
    const m = new Maniiifest({ items, ...manifest });
    const result = Array.from(m.iterateManifestCanvasAnnotationPage());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/page/p1/1");
    expect(result[0].type).toBe("AnnotationPage");
  });

  it('iterateManifestCanvasAnnotationPage yields empty when no items', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestCanvasAnnotationPage())).toEqual([]);
  });

  it('iterateManifestCanvasAnnotation yields annotations', () => {
    const m = new Maniiifest({ items, ...manifest });
    const result = Array.from(m.iterateManifestCanvasAnnotation());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/annotation/p0001-image");
    expect(result[0].type).toBe("Annotation");
    expect(result[0].motivation).toBe("painting");
  });

  it('iterateManifestCanvasAnnotation yields empty when no items', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestCanvasAnnotation())).toEqual([]);
  });

  it('iterateManifestThumbnailService yields service items from thumbnail', () => {
    const thumbnail = [
      {
        id: "https://example.org/thumb.jpg",
        type: "Image",
        service: [{ id: "https://example.org/svc", type: "ImageService3", profile: "level1" }]
      }
    ];
    const m = new Maniiifest({ thumbnail, service: thumbnail[0].service, ...manifest });
    const result = Array.from(m.iterateManifestThumbnailService());
    expect(result).toHaveLength(1);
    expect((result[0] as any).id).toBe("https://example.org/svc");
    expect(result[0]).not.toHaveProperty('kind');
  });
});

describe('Manifest W3C annotations', () => {

  const manifestWithW3c = {
    "id": "https://example.org/manifest",
    "type": "Manifest",
    "label": { "en": ["Test"] },
    "items": [
      {
        "id": "https://example.org/canvas/1",
        "type": "Canvas",
        "height": 1000,
        "width": 750,
        "items": [],
        "annotations": [
          {
            "id": "https://example.org/annopage/1",
            "type": "AnnotationPage",
            "items": [
              {
                "id": "https://example.org/anno/1",
                "type": "Annotation",
                "motivation": "commenting",
                "body": {
                  "type": "TextualBody",
                  "value": "A comment",
                  "format": "text/plain"
                },
                "target": "https://example.org/canvas/1"
              }
            ]
          }
        ]
      }
    ]
  };

  it('iterateManifestCanvasW3cAnnotation yields canvas-level W3C annotations', () => {
    const m = new Maniiifest(manifestWithW3c);
    const result = Array.from(m.iterateManifestCanvasW3cAnnotation());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/anno/1");
    expect(result[0].motivation).toBe("commenting");
  });

  it('iterateManifestCanvasW3cAnnotation yields empty when no annotations', () => {
    const m = new Maniiifest({
      id: "x", type: "Manifest", label: { en: ["M"] },
      items: [{ id: "c", type: "Canvas", height: 100, width: 100, items: [] }]
    });
    expect(Array.from(m.iterateManifestCanvasW3cAnnotation())).toEqual([]);
  });

  it('iterateManifestCanvasW3cAnnotationTextualBody yields textual bodies', () => {
    const m = new Maniiifest(manifestWithW3c);
    const result = Array.from(m.iterateManifestCanvasW3cAnnotationTextualBody());
    expect(result).toHaveLength(1);
    expect(result[0].value).toBe("A comment");
    expect(result[0].type).toBe("TextualBody");
  });

  it('iterateManifestCanvasW3cAnnotationPage yields annotation pages from canvas annotations', () => {
    const m = new Maniiifest(manifestWithW3c);
    const result = Array.from(m.iterateManifestCanvasW3cAnnotationPage());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/annopage/1");
    expect(result[0].type).toBe("AnnotationPage");
  });

  const manifestWithTopW3c = {
    "id": "https://example.org/manifest",
    "type": "Manifest",
    "label": { "en": ["Test"] },
    "items": [],
    "annotations": [
      {
        "id": "https://example.org/annopage/top",
        "type": "AnnotationPage",
        "items": [
          {
            "id": "https://example.org/anno/top1",
            "type": "Annotation",
            "motivation": "commenting",
            "body": { "type": "TextualBody", "value": "Top-level comment", "format": "text/plain" },
            "target": "https://example.org/manifest"
          }
        ]
      }
    ]
  };

  it('iterateManifestW3cAnnotation yields manifest-level W3C annotations', () => {
    const m = new Maniiifest(manifestWithTopW3c);
    const result = Array.from(m.iterateManifestW3cAnnotation());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/anno/top1");
  });

  it('iterateManifestW3cAnnotationTextualBody yields textual bodies', () => {
    const m = new Maniiifest(manifestWithTopW3c);
    const result = Array.from(m.iterateManifestW3cAnnotationTextualBody());
    expect(result).toHaveLength(1);
    expect(result[0].value).toBe("Top-level comment");
  });

  it('iterateManifestW3cAnnotationPage yields manifest-level annotation pages', () => {
    const m = new Maniiifest(manifestWithTopW3c);
    const result = Array.from(m.iterateManifestW3cAnnotationPage());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/annopage/top");
  });
});

describe('Manifest ranges and structures', () => {

  const manifestWithRanges = {
    "id": "https://example.org/manifest",
    "type": "Manifest",
    "label": { "en": ["Test"] },
    "items": [
      { "id": "https://example.org/canvas/1", "type": "Canvas", "height": 100, "width": 100, "items": [] }
    ],
    "structures": [
      {
        "id": "https://example.org/range/1",
        "type": "Range",
        "label": { "en": ["Table of Contents"] },
        "items": [
          { "id": "https://example.org/canvas/1", "type": "Canvas" },
          {
            "id": "https://example.org/range/2",
            "type": "Range",
            "label": { "en": ["Chapter 1"] },
            "items": [
              { "id": "https://example.org/canvas/1#t=0,10", "type": "Canvas" }
            ]
          }
        ]
      }
    ]
  };

  it('iterateManifestRange yields ranges', () => {
    const m = new Maniiifest(manifestWithRanges);
    const result = Array.from(m.iterateManifestRange());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/range/1");
    expect(result[0].type).toBe("Range");
    expect(result[0].label).toEqual({ en: ["Table of Contents"] });
  });

  it('iterateManifestRange yields empty when no structures', () => {
    const m = new Maniiifest({
      id: "x", type: "Manifest", label: { en: ["M"] }, items: []
    });
    expect(Array.from(m.iterateManifestRange())).toEqual([]);
  });

  it('iterateManifestRangeItem yields range items (polymorphic unwrap)', () => {
    const m = new Maniiifest(manifestWithRanges);
    const result = Array.from(m.iterateManifestRangeItem());
    expect(result).toHaveLength(2);
    // Items are Canvas refs and nested Range — both unwrapped from {kind, value}
    expect(result[0]).not.toHaveProperty('kind');
  });
});

describe('Manifest navPlace features', () => {

  const navPlace = {
    id: "http://example.com/fc/1",
    type: "FeatureCollection",
    features: [
      {
        id: "http://example.com/feature/1",
        type: "Feature",
        properties: {},
        geometry: { type: "Point", coordinates: [9.938, 51.533] }
      }
    ]
  };

  it('iterateManifestNavPlaceFeature yields features', () => {
    const m = new Maniiifest({
      id: "x", type: "Manifest", label: { en: ["M"] }, navPlace
    });
    const result = Array.from(m.iterateManifestNavPlaceFeature());
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("Feature");
    expect(result[0].geometry).toBeDefined();
  });

  it('iterateManifestNavPlaceFeature yields empty when no navPlace', () => {
    const m = new Maniiifest({ id: "x", type: "Manifest", label: { en: ["M"] } });
    expect(Array.from(m.iterateManifestNavPlaceFeature())).toEqual([]);
  });

  it('iterateManifestCanvasNavPlaceFeature yields features from canvas navPlace', () => {
    const m = new Maniiifest({
      id: "x", type: "Manifest", label: { en: ["M"] },
      items: [{
        id: "c1", type: "Canvas", height: 100, width: 100,
        navPlace,
        items: []
      }]
    });
    const result = Array.from(m.iterateManifestCanvasNavPlaceFeature());
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("Feature");
  });

  it('iterateManifestCanvasNavPlaceFeature yields empty when canvases lack navPlace', () => {
    const m = new Maniiifest({
      id: "x", type: "Manifest", label: { en: ["M"] },
      items: [{ id: "c1", type: "Canvas", height: 100, width: 100, items: [] }]
    });
    expect(Array.from(m.iterateManifestCanvasNavPlaceFeature())).toEqual([]);
  });
});

describe('Manifest with real sample (buddha.json)', () => {
  const fs = require('fs');
  const path = require('path');
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'samples', 'buddha.json'), 'utf-8')
  );

  it('parses as Manifest and returns correct type', () => {
    const m = new Maniiifest(data);
    expect(m.getSpecificationType()).toBe('Manifest');
  });

  it('getManifestLabel returns a plain label object', () => {
    const m = new Maniiifest(data);
    const label = m.getManifestLabel();
    expect(label).toBeDefined();
    expect(label).not.toHaveProperty('kind');
  });

  it('getManifestSummary returns the summary', () => {
    const m = new Maniiifest(data);
    expect(m.getManifestSummary()).toBeDefined();
  });

  it('getManifestRequiredStatement returns the statement', () => {
    const m = new Maniiifest(data);
    const rs = m.getManifestRequiredStatement();
    expect(rs).toBeDefined();
    expect(rs).toHaveProperty('label');
    expect(rs).toHaveProperty('value');
  });

  it('iterateManifestMetadata yields metadata items', () => {
    const m = new Maniiifest(data);
    const meta = Array.from(m.iterateManifestMetadata());
    expect(meta.length).toBeGreaterThan(0);
    for (const item of meta) {
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('value');
    }
  });

  it('iterateManifestCanvas yields canvases', () => {
    const m = new Maniiifest(data);
    const canvases = Array.from(m.iterateManifestCanvas());
    expect(canvases.length).toBeGreaterThan(0);
    expect(canvases[0]).toHaveProperty('id');
    expect(canvases[0]).toHaveProperty('type');
  });

  it('iterateManifestCanvasW3cAnnotation yields W3C annotations from canvas', () => {
    const m = new Maniiifest(data);
    const annos = Array.from(m.iterateManifestCanvasW3cAnnotation());
    expect(annos.length).toBeGreaterThan(0);
    expect(annos[0]).toHaveProperty('id');
    expect(annos[0]).toHaveProperty('type');
  });
});
