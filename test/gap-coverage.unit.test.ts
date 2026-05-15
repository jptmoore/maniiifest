import { Maniiifest } from '../src/Maniiifest';

// ──────────────────────────────────────────
// Canvas accessors (within Manifest context)
// ──────────────────────────────────────────

describe('Manifest canvas property iterators', () => {

  const manifest = {
    "id": "https://example.org/manifest",
    "type": "Manifest",
    "label": { "en": ["Test"] }
  };

  const canvasWithProps = {
    "id": "https://example.org/canvas/1",
    "type": "Canvas",
    "label": { "en": ["Page 1"] },
    "height": 1000,
    "width": 750,
    "metadata": [
      { "label": { "en": ["Creator"] }, "value": { "en": ["Anne Author"] } }
    ],
    "thumbnail": [
      { "id": "https://example.org/thumb1.jpg", "type": "Image", "format": "image/jpeg" }
    ],
    "rendering": [
      { "id": "https://example.org/page1.pdf", "type": "Text", "label": { "en": ["PDF"] }, "format": "application/pdf" }
    ],
    "seeAlso": [
      { "id": "https://example.org/page1.xml", "type": "Dataset", "format": "application/xml" }
    ],
    "homepage": [
      { "id": "https://example.org/page1", "type": "Text", "label": { "en": ["Page 1"] } }
    ],
    "provider": [
      { "id": "https://example.org", "type": "Agent", "label": { "en": ["Example Org"] } }
    ],
    "service": [
      { "id": "https://example.org/svc", "type": "ImageService3", "profile": "level2" }
    ],
    "behavior": ["paged"],
    "items": []
  };

  const canvasMinimal = {
    "id": "https://example.org/canvas/2",
    "type": "Canvas",
    "height": 500,
    "width": 400,
    "items": []
  };

  it('iterateManifestCanvasLabel yields canvas labels', () => {
    const m = new Maniiifest({ items: [canvasWithProps], ...manifest });
    const result = Array.from(m.iterateManifestCanvasLabel());
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ en: ["Page 1"] });
  });

  it('iterateManifestCanvasLabel skips canvases without labels', () => {
    const m = new Maniiifest({ items: [canvasMinimal], ...manifest });
    expect(Array.from(m.iterateManifestCanvasLabel())).toEqual([]);
  });

  it('iterateManifestCanvasLabel yields labels from multiple canvases', () => {
    const canvas2 = { ...canvasMinimal, label: { "en": ["Page 2"] } };
    const m = new Maniiifest({ items: [canvasWithProps, canvas2], ...manifest });
    const result = Array.from(m.iterateManifestCanvasLabel());
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ en: ["Page 1"] });
    expect(result[1]).toEqual({ en: ["Page 2"] });
  });

  it('iterateManifestCanvasLabel yields empty for collection', () => {
    const col = { ...manifest, type: "Collection" };
    const m = new Maniiifest(col);
    expect(Array.from(m.iterateManifestCanvasLabel())).toEqual([]);
  });

  it('iterateManifestCanvasLabel yields empty when no items', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestCanvasLabel())).toEqual([]);
  });

  it('iterateManifestCanvasMetadata yields canvas metadata', () => {
    const m = new Maniiifest({ items: [canvasWithProps], ...manifest });
    const result = Array.from(m.iterateManifestCanvasMetadata());
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      label: { en: ["Creator"] },
      value: { en: ["Anne Author"] }
    });
  });

  it('iterateManifestCanvasMetadata yields empty when absent', () => {
    const m = new Maniiifest({ items: [canvasMinimal], ...manifest });
    expect(Array.from(m.iterateManifestCanvasMetadata())).toEqual([]);
  });

  it('iterateManifestCanvasMetadata yields metadata from multiple canvases', () => {
    const canvas2 = {
      ...canvasMinimal,
      metadata: [{ label: { en: ["Date"] }, value: { en: ["2024"] } }]
    };
    const m = new Maniiifest({ items: [canvasWithProps, canvas2], ...manifest });
    const result = Array.from(m.iterateManifestCanvasMetadata());
    expect(result).toHaveLength(2);
  });

  it('iterateManifestCanvasThumbnail yields canvas thumbnails', () => {
    const m = new Maniiifest({ items: [canvasWithProps], ...manifest });
    const result = Array.from(m.iterateManifestCanvasThumbnail());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/thumb1.jpg");
    expect(result[0].type).toBe("Image");
  });

  it('iterateManifestCanvasThumbnail yields empty when absent', () => {
    const m = new Maniiifest({ items: [canvasMinimal], ...manifest });
    expect(Array.from(m.iterateManifestCanvasThumbnail())).toEqual([]);
  });

  it('iterateManifestCanvasRendering yields canvas renderings', () => {
    const m = new Maniiifest({ items: [canvasWithProps], ...manifest });
    const result = Array.from(m.iterateManifestCanvasRendering());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/page1.pdf");
    expect(result[0].format).toBe("application/pdf");
  });

  it('iterateManifestCanvasRendering yields empty when absent', () => {
    const m = new Maniiifest({ items: [canvasMinimal], ...manifest });
    expect(Array.from(m.iterateManifestCanvasRendering())).toEqual([]);
  });

  it('iterateManifestCanvasSeeAlso yields canvas seeAlso', () => {
    const m = new Maniiifest({ items: [canvasWithProps], ...manifest });
    const result = Array.from(m.iterateManifestCanvasSeeAlso());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/page1.xml");
    expect(result[0].format).toBe("application/xml");
  });

  it('iterateManifestCanvasSeeAlso yields empty when absent', () => {
    const m = new Maniiifest({ items: [canvasMinimal], ...manifest });
    expect(Array.from(m.iterateManifestCanvasSeeAlso())).toEqual([]);
  });

  it('iterateManifestCanvasHomepage yields canvas homepages', () => {
    const m = new Maniiifest({ items: [canvasWithProps], ...manifest });
    const result = Array.from(m.iterateManifestCanvasHomepage());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/page1");
  });

  it('iterateManifestCanvasHomepage yields empty when absent', () => {
    const m = new Maniiifest({ items: [canvasMinimal], ...manifest });
    expect(Array.from(m.iterateManifestCanvasHomepage())).toEqual([]);
  });

  it('iterateManifestCanvasProvider yields canvas providers', () => {
    const m = new Maniiifest({ items: [canvasWithProps], ...manifest });
    const result = Array.from(m.iterateManifestCanvasProvider());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org");
    expect(result[0].type).toBe("Agent");
  });

  it('iterateManifestCanvasProvider yields empty when absent', () => {
    const m = new Maniiifest({ items: [canvasMinimal], ...manifest });
    expect(Array.from(m.iterateManifestCanvasProvider())).toEqual([]);
  });

  it('iterateManifestCanvasService yields canvas service items (polymorphic unwrap)', () => {
    const m = new Maniiifest({ items: [canvasWithProps], ...manifest });
    const result = Array.from(m.iterateManifestCanvasService());
    expect(result).toHaveLength(1);
    expect((result[0] as any).id).toBe("https://example.org/svc");
    expect(result[0]).not.toHaveProperty('kind');
  });

  it('iterateManifestCanvasService yields empty when absent', () => {
    const m = new Maniiifest({ items: [canvasMinimal], ...manifest });
    expect(Array.from(m.iterateManifestCanvasService())).toEqual([]);
  });

  it('iterateManifestCanvasBehavior yields canvas behaviors', () => {
    const m = new Maniiifest({ items: [canvasWithProps], ...manifest });
    const result = Array.from(m.iterateManifestCanvasBehavior());
    expect(result).toEqual(["paged"]);
  });

  it('iterateManifestCanvasBehavior yields empty when absent', () => {
    const m = new Maniiifest({ items: [canvasMinimal], ...manifest });
    expect(Array.from(m.iterateManifestCanvasBehavior())).toEqual([]);
  });
});

// ──────────────────────────────────────────
// Range accessors (within Manifest context)
// ──────────────────────────────────────────

describe('Manifest range property iterators', () => {

  const manifest = {
    "id": "https://example.org/manifest",
    "type": "Manifest",
    "label": { "en": ["Test"] },
    "items": [
      { "id": "https://example.org/canvas/1", "type": "Canvas", "height": 100, "width": 100, "items": [] }
    ]
  };

  const structures = [
    {
      "id": "https://example.org/range/1",
      "type": "Range",
      "label": { "en": ["Table of Contents"] },
      "rendering": [
        { "id": "https://example.org/toc.pdf", "type": "Text", "format": "application/pdf" }
      ],
      "thumbnail": [
        { "id": "https://example.org/range-thumb.jpg", "type": "Image", "format": "image/jpeg" }
      ],
      "annotations": [
        {
          "id": "https://example.org/annopage/r1",
          "type": "AnnotationPage",
          "items": [
            {
              "id": "https://example.org/anno/r1",
              "type": "Annotation",
              "motivation": "commenting",
              "body": { "type": "TextualBody", "value": "Range comment", "format": "text/plain" },
              "target": "https://example.org/canvas/1"
            }
          ]
        }
      ],
      "items": [
        { "id": "https://example.org/canvas/1", "type": "Canvas" }
      ]
    },
    {
      "id": "https://example.org/range/2",
      "type": "Range",
      "label": { "en": ["Chapter 1"] },
      "items": [
        { "id": "https://example.org/canvas/1", "type": "Canvas" }
      ]
    }
  ];

  it('iterateManifestRangeLabel yields range labels', () => {
    const m = new Maniiifest({ structures, ...manifest });
    const result = Array.from(m.iterateManifestRangeLabel());
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ en: ["Table of Contents"] });
    expect(result[1]).toEqual({ en: ["Chapter 1"] });
  });

  it('iterateManifestRangeLabel yields empty when no structures', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestRangeLabel())).toEqual([]);
  });

  it('iterateManifestRangeLabel yields empty for collection', () => {
    const col = { id: "x", type: "Collection", label: { en: ["C"] } };
    const m = new Maniiifest(col);
    expect(Array.from(m.iterateManifestRangeLabel())).toEqual([]);
  });

  it('iterateManifestRangeRendering yields range renderings', () => {
    const m = new Maniiifest({ structures, ...manifest });
    const result = Array.from(m.iterateManifestRangeRendering());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/toc.pdf");
    expect(result[0].format).toBe("application/pdf");
  });

  it('iterateManifestRangeRendering yields empty when no renderings', () => {
    const m = new Maniiifest({
      structures: [{ id: "r1", type: "Range", items: [{ id: "c1", type: "Canvas" }] }],
      ...manifest
    });
    expect(Array.from(m.iterateManifestRangeRendering())).toEqual([]);
  });

  it('iterateManifestRangeThumbnail yields range thumbnails', () => {
    const m = new Maniiifest({ structures, ...manifest });
    const result = Array.from(m.iterateManifestRangeThumbnail());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/range-thumb.jpg");
  });

  it('iterateManifestRangeThumbnail yields empty when no thumbnails', () => {
    const m = new Maniiifest({
      structures: [{ id: "r1", type: "Range", items: [{ id: "c1", type: "Canvas" }] }],
      ...manifest
    });
    expect(Array.from(m.iterateManifestRangeThumbnail())).toEqual([]);
  });

  it('iterateManifestRangeAnnotation yields annotations from range annotation pages', () => {
    const m = new Maniiifest({ structures, ...manifest });
    const result = Array.from(m.iterateManifestRangeAnnotation());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/anno/r1");
    expect(result[0].motivation).toBe("commenting");
  });

  it('iterateManifestRangeAnnotation yields empty when ranges lack annotations', () => {
    const m = new Maniiifest({
      structures: [{ id: "r1", type: "Range", items: [{ id: "c1", type: "Canvas" }] }],
      ...manifest
    });
    expect(Array.from(m.iterateManifestRangeAnnotation())).toEqual([]);
  });

  it('iterateManifestRangeAnnotation yields empty when no structures', () => {
    const m = new Maniiifest(manifest);
    expect(Array.from(m.iterateManifestRangeAnnotation())).toEqual([]);
  });
});

// ──────────────────────────────────────────
// Collection getters & iterators
// ──────────────────────────────────────────

describe('Collection new getters', () => {

  const collection = {
    "id": "https://example.org/collection",
    "type": "Collection",
    "label": { "en": ["Test Collection"] }
  };

  it('getCollectionSummary returns the summary', () => {
    const summary = { en: ["A test collection of items."] };
    const m = new Maniiifest({ summary, ...collection });
    expect(m.getCollectionSummary()).toEqual(summary);
  });

  it('getCollectionSummary returns null when absent', () => {
    const m = new Maniiifest(collection);
    expect(m.getCollectionSummary()).toBeNull();
  });

  it('getCollectionSummary returns null for manifest', () => {
    const m = new Maniiifest({ ...collection, type: "Manifest" });
    expect(m.getCollectionSummary()).toBeNull();
  });

  it('getCollectionRights returns the rights URI', () => {
    const m = new Maniiifest({ rights: "http://creativecommons.org/licenses/by/4.0/", ...collection });
    expect(m.getCollectionRights()).toBe("http://creativecommons.org/licenses/by/4.0/");
  });

  it('getCollectionRights returns null when absent', () => {
    const m = new Maniiifest(collection);
    expect(m.getCollectionRights()).toBeNull();
  });

  it('getCollectionNavDate returns the date', () => {
    const m = new Maniiifest({ navDate: "2024-01-01T00:00:00Z", ...collection });
    expect(m.getCollectionNavDate()).toBe("2024-01-01T00:00:00Z");
  });

  it('getCollectionNavDate returns null when absent', () => {
    const m = new Maniiifest(collection);
    expect(m.getCollectionNavDate()).toBeNull();
  });

  it('getCollectionNavPlace returns the navPlace', () => {
    const navPlace = {
      id: "http://example.com/fc/1",
      type: "FeatureCollection",
      features: [{ id: "f1", type: "Feature", geometry: { type: "Point", coordinates: [0, 0] } }]
    };
    const m = new Maniiifest({ navPlace, ...collection });
    expect(m.getCollectionNavPlace()).toEqual(navPlace);
  });

  it('getCollectionNavPlace returns null when absent', () => {
    const m = new Maniiifest(collection);
    expect(m.getCollectionNavPlace()).toBeNull();
  });
});

describe('Collection new iterators', () => {

  const collection = {
    "id": "https://example.org/collection",
    "type": "Collection",
    "label": { "en": ["Top"] }
  };

  it('iterateCollectionRendering yields renderings', () => {
    const rendering = [
      { "id": "https://example.org/col.pdf", "type": "Text", "format": "application/pdf" }
    ];
    const m = new Maniiifest({ rendering, ...collection });
    const result = Array.from(m.iterateCollectionRendering());
    expect(result).toEqual(rendering);
  });

  it('iterateCollectionRendering yields empty when absent', () => {
    const m = new Maniiifest(collection);
    expect(Array.from(m.iterateCollectionRendering())).toEqual([]);
  });

  it('iterateCollectionRendering traverses nested collections', () => {
    const nested = {
      ...collection,
      rendering: [{ id: "https://example.org/top.pdf", type: "Text", format: "application/pdf" }],
      items: [
        {
          id: "https://example.org/sub",
          type: "Collection",
          label: { en: ["Sub"] },
          rendering: [{ id: "https://example.org/sub.pdf", type: "Text", format: "application/pdf" }]
        }
      ]
    };
    const m = new Maniiifest(nested);
    const result = Array.from(m.iterateCollectionRendering());
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("https://example.org/top.pdf");
    expect(result[1].id).toBe("https://example.org/sub.pdf");
  });

  it('iterateCollectionSeeAlso yields seeAlso', () => {
    const seeAlso = [
      { "id": "https://example.org/data.xml", "type": "Dataset", "format": "application/xml" }
    ];
    const m = new Maniiifest({ seeAlso, ...collection });
    const result = Array.from(m.iterateCollectionSeeAlso());
    expect(result).toEqual(seeAlso);
  });

  it('iterateCollectionSeeAlso yields empty when absent', () => {
    const m = new Maniiifest(collection);
    expect(Array.from(m.iterateCollectionSeeAlso())).toEqual([]);
  });

  it('iterateCollectionSeeAlso traverses nested collections', () => {
    const nested = {
      ...collection,
      seeAlso: [{ id: "https://example.org/top.xml", type: "Dataset" }],
      items: [
        {
          id: "sub", type: "Collection", label: { en: ["Sub"] },
          seeAlso: [{ id: "https://example.org/sub.xml", type: "Dataset" }]
        }
      ]
    };
    const m = new Maniiifest(nested);
    const result = Array.from(m.iterateCollectionSeeAlso());
    expect(result).toHaveLength(2);
  });

  it('iterateCollectionBehavior yields behaviors', () => {
    const m = new Maniiifest({ behavior: ["unordered"], ...collection });
    const result = Array.from(m.iterateCollectionBehavior());
    expect(result).toEqual(["unordered"]);
  });

  it('iterateCollectionBehavior yields empty when absent', () => {
    const m = new Maniiifest(collection);
    expect(Array.from(m.iterateCollectionBehavior())).toEqual([]);
  });

  it('iterateCollectionBehavior traverses nested collections', () => {
    const nested = {
      ...collection,
      behavior: ["unordered"],
      items: [
        {
          id: "sub", type: "Collection", label: { en: ["Sub"] },
          behavior: ["paged"]
        }
      ]
    };
    const m = new Maniiifest(nested);
    const result = Array.from(m.iterateCollectionBehavior());
    expect(result).toEqual(["unordered", "paged"]);
  });

  it('iterateCollectionPartOf yields partOf (polymorphic unwrap)', () => {
    const partOf = [
      { id: "https://example.org/parent", type: "Collection" }
    ];
    const m = new Maniiifest({ partOf, ...collection });
    const result = Array.from(m.iterateCollectionPartOf());
    expect(result).toEqual(partOf);
    expect(result[0]).not.toHaveProperty('kind');
  });

  it('iterateCollectionPartOf yields empty when absent', () => {
    const m = new Maniiifest(collection);
    expect(Array.from(m.iterateCollectionPartOf())).toEqual([]);
  });

  it('iterateCollectionPartOf traverses nested collections', () => {
    const nested = {
      ...collection,
      partOf: [{ id: "https://example.org/parent-top", type: "Collection" }],
      items: [
        {
          id: "sub", type: "Collection", label: { en: ["Sub"] },
          partOf: [{ id: "https://example.org/parent-sub", type: "Collection" }]
        }
      ]
    };
    const m = new Maniiifest(nested);
    const result = Array.from(m.iterateCollectionPartOf());
    expect(result).toHaveLength(2);
  });

  it('iterateCollectionRendering yields empty for manifest', () => {
    const m = new Maniiifest({ id: "x", type: "Manifest", label: { en: ["M"] } });
    expect(Array.from(m.iterateCollectionRendering())).toEqual([]);
  });
});



// ──────────────────────────────────────────
// Annotation provenance
// ──────────────────────────────────────────

describe('Annotation provenance getters', () => {

  const annotation = {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    "id": "http://example.org/anno1",
    "type": "Annotation",
    "motivation": "commenting",
    "created": "2024-01-04T17:24:11Z",
    "modified": "2024-06-15T10:00:00Z",
    "creator": {
      "name": "john.moore@example.org"
    },
    "body": {
      "type": "TextualBody",
      "value": "A comment",
      "format": "text/plain"
    },
    "target": "http://example.org/canvas/1"
  };

  it('getAnnotationCreator returns the creator object', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    const creator = m.getAnnotationCreator();
    expect(creator).toBeDefined();
    expect((creator as any).name).toBe("john.moore@example.org");
  });

  it('getAnnotationCreator returns string when creator is a ref', () => {
    const withRef = { ...annotation, creator: "http://example.org/user/1" };
    const m = Maniiifest.parseAnnotation(withRef);
    const creator = m.getAnnotationCreator();
    expect(creator).toBe("http://example.org/user/1");
  });

  it('getAnnotationCreator returns null when absent', () => {
    const { creator: _, ...noCreator } = annotation;
    const m = Maniiifest.parseAnnotation(noCreator);
    expect(m.getAnnotationCreator()).toBeNull();
  });

  it('getAnnotationGenerator returns the generator object', () => {
    const withGen = {
      ...annotation,
      generator: {
        id: "http://example.org/software/1",
        type: "Software",
        name: "Example Annotation Tool",
        homepage: "http://example.org/software/1/homepage"
      }
    };
    const m = Maniiifest.parseAnnotation(withGen);
    const generator = m.getAnnotationGenerator();
    expect(generator).toBeDefined();
    expect((generator as any).id).toBe("http://example.org/software/1");
    expect((generator as any).type).toBe("Software");
    expect((generator as any).name).toBe("Example Annotation Tool");
  });

  it('getAnnotationGenerator returns string when generator is a ref', () => {
    const withRef = { ...annotation, generator: "http://example.org/software/1" };
    const m = Maniiifest.parseAnnotation(withRef);
    expect(m.getAnnotationGenerator()).toBe("http://example.org/software/1");
  });

  it('getAnnotationGenerator returns array when generator is a list', () => {
    const withArr = {
      ...annotation,
      generator: [
        "http://example.org/software/1",
        { id: "http://example.org/software/2", type: "Software", name: "Tool 2" }
      ]
    };
    const m = Maniiifest.parseAnnotation(withArr);
    const generator = m.getAnnotationGenerator();
    expect(Array.isArray(generator)).toBe(true);
    expect((generator as any[]).length).toBe(2);
    expect((generator as any[])[0]).toBe("http://example.org/software/1");
    expect(((generator as any[])[1] as any).name).toBe("Tool 2");
  });

  it('getAnnotationGenerator returns null when absent', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    expect(m.getAnnotationGenerator()).toBeNull();
  });

  it('getAnnotationGenerator round-trips all Agent properties', () => {
    const fullAgent = {
      id: "http://example.org/agent/1",
      type: "Software",
      name: "Full Agent",
      nickname: "fa",
      email: "mailto:agent@example.org",
      email_sha1: "58bad08927902ff9307b621c54716dcc5083e339",
      homepage: "http://example.org/agent/1/home"
    };
    const withFull = { ...annotation, generator: fullAgent };
    const m = Maniiifest.parseAnnotation(withFull);
    const generator = m.getAnnotationGenerator();
    expect(generator).toEqual(fullAgent);
  });

  it('getAnnotation preserves generator in round-trip', () => {
    const withGen = {
      ...annotation,
      generator: { id: "http://example.org/sw/1", type: "Software", name: "X" }
    };
    const m = Maniiifest.parseAnnotation(withGen);
    const out = m.getAnnotation();
    expect((out as any).generator).toEqual(withGen.generator);
  });

  it('TextualBody preserves generator field', () => {
    const withTbGen = {
      ...annotation,
      body: {
        type: "TextualBody",
        value: "A comment",
        format: "text/plain",
        generator: { id: "http://example.org/sw/1", type: "Software", name: "Tool" }
      }
    };
    const m = Maniiifest.parseAnnotation(withTbGen);
    const body = m.getAnnotationBody();
    expect((body as any).generator).toEqual(withTbGen.body.generator);
  });

  it('getAnnotationCreated returns the created date', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    expect(m.getAnnotationCreated()).toBe("2024-01-04T17:24:11Z");
  });

  it('getAnnotationCreated returns null when absent', () => {
    const { created: _, ...noCreated } = annotation;
    const m = Maniiifest.parseAnnotation(noCreated);
    expect(m.getAnnotationCreated()).toBeNull();
  });

  it('getAnnotationModified returns the modified date', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    expect(m.getAnnotationModified()).toBe("2024-06-15T10:00:00Z");
  });

  it('getAnnotationModified returns null when absent', () => {
    const { modified: _, ...noModified } = annotation;
    const m = Maniiifest.parseAnnotation(noModified);
    expect(m.getAnnotationModified()).toBeNull();
  });
});

// ──────────────────────────────────────────
// AnnotationPage pagination
// ──────────────────────────────────────────

describe('AnnotationPage pagination getters', () => {

  const annotationPage = {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    "id": "http://example.org/page1",
    "type": "AnnotationPage",
    "label": { "en": ["Page 1 of Results"] },
    "partOf": {
      "id": "http://example.org/collection1",
      "label": "Steampunk Annotations",
      "total": 42023
    },
    "next": "http://example.org/page2",
    "startIndex": 0,
    "items": [
      {
        "id": "http://example.org/anno1",
        "type": "Annotation",
        "body": "http://example.net/comment1",
        "target": "http://example.com/book/chapter1"
      }
    ]
  };

  it('getAnnotationPageLabel returns the label', () => {
    const m = Maniiifest.parseAnnotationPage(annotationPage);
    expect(m.getAnnotationPageLabel()).toEqual({ en: ["Page 1 of Results"] });
  });

  it('getAnnotationPageLabel returns string for plain label', () => {
    const withPlain = { ...annotationPage, label: "Page 1" };
    const m = Maniiifest.parseAnnotationPage(withPlain);
    expect(m.getAnnotationPageLabel()).toBe("Page 1");
  });

  it('getAnnotationPageLabel returns null when absent', () => {
    const { label: _, ...noLabel } = annotationPage;
    const m = Maniiifest.parseAnnotationPage(noLabel);
    expect(m.getAnnotationPageLabel()).toBeNull();
  });

  it('getAnnotationPageNext returns the next URI', () => {
    const m = Maniiifest.parseAnnotationPage(annotationPage);
    expect(m.getAnnotationPageNext()).toBe("http://example.org/page2");
  });

  it('getAnnotationPageNext returns null when absent', () => {
    const { next: _, ...noNext } = annotationPage;
    const m = Maniiifest.parseAnnotationPage(noNext);
    expect(m.getAnnotationPageNext()).toBeNull();
  });

  it('getAnnotationPageStartIndex returns the start index', () => {
    const m = Maniiifest.parseAnnotationPage(annotationPage);
    expect(m.getAnnotationPageStartIndex()).toBe(0);
  });

  it('getAnnotationPageStartIndex returns non-zero index', () => {
    const page2 = { ...annotationPage, startIndex: 100 };
    const m = Maniiifest.parseAnnotationPage(page2);
    expect(m.getAnnotationPageStartIndex()).toBe(100);
  });

  it('getAnnotationPageStartIndex returns null when absent', () => {
    const { startIndex: _, ...noIdx } = annotationPage;
    const m = Maniiifest.parseAnnotationPage(noIdx);
    expect(m.getAnnotationPageStartIndex()).toBeNull();
  });
});

// ──────────────────────────────────────────
// AnnotationCollection items
// ──────────────────────────────────────────

describe('AnnotationCollection annotation iterator', () => {

  const annotationCollection = {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    "id": "http://example.org/collection1",
    "type": "AnnotationCollection",
    "label": "Test Collection",
    "total": 2,
    "items": [
      {
        "id": "http://example.org/anno1",
        "type": "Annotation",
        "body": "http://example.net/comment1",
        "target": "http://example.com/chapter1"
      },
      {
        "id": "http://example.org/anno2",
        "type": "Annotation",
        "body": "http://example.net/comment2",
        "target": "http://example.com/chapter2"
      }
    ]
  };

  it('iterateAnnotationCollectionAnnotation yields annotations', () => {
    const m = Maniiifest.parseAnnotationCollection(annotationCollection);
    const result = Array.from(m.iterateAnnotationCollectionAnnotation());
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("http://example.org/anno1");
    expect(result[1].id).toBe("http://example.org/anno2");
  });

  it('iterateAnnotationCollectionAnnotation yields empty when no items', () => {
    const empty = { ...annotationCollection, items: undefined };
    const m = Maniiifest.parseAnnotationCollection(empty);
    expect(Array.from(m.iterateAnnotationCollectionAnnotation())).toEqual([]);
  });

});


