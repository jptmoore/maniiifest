import { Maniiifest } from '../src/Maniiifest';

describe('AnnotationCollection getters', () => {

  const annotationCollection = {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    "id": "http://example.org/collection1",
    "type": "AnnotationCollection",
    "label": "Steampunk Annotations",
    "creator": "http://example.com/publisher",
    "total": 42023,
    "first": "http://example.org/page1",
    "last": "http://example.org/page42"
  };

  it('getAnnotationCollection returns a well-formed AnnotationCollection', () => {
    const m = Maniiifest.parseAnnotationCollection(annotationCollection);
    const result = m.getAnnotationCollection();
    expect(result).toBeDefined();
    expect(result!.id).toBe("http://example.org/collection1");
    expect(result!.type).toBe("AnnotationCollection");
  });

  it('getAnnotationCollectionId returns the id', () => {
    const m = Maniiifest.parseAnnotationCollection(annotationCollection);
    expect(m.getAnnotationCollectionId()).toBe("http://example.org/collection1");
  });

  it('getAnnotationCollectionType returns the type', () => {
    const m = Maniiifest.parseAnnotationCollection(annotationCollection);
    expect(m.getAnnotationCollectionType()).toBe("AnnotationCollection");
  });

  it('getAnnotationCollectionContext returns string (polymorphic unwrap)', () => {
    const m = Maniiifest.parseAnnotationCollection(annotationCollection);
    const ctx = m.getAnnotationCollectionContext();
    expect(typeof ctx).toBe('string');
    expect(ctx).toBe("http://www.w3.org/ns/anno.jsonld");
  });

  it('getAnnotationCollectionContext returns null when absent', () => {
    const { "@context": _, ...noCtx } = annotationCollection;
    const m = Maniiifest.parseAnnotationCollection(noCtx);
    expect(m.getAnnotationCollectionContext()).toBeNull();
  });

  it('getAnnotationCollectionLabel returns string label', () => {
    const m = Maniiifest.parseAnnotationCollection(annotationCollection);
    expect(m.getAnnotationCollectionLabel()).toBe("Steampunk Annotations");
  });

  it('getAnnotationCollectionLabel returns Record<string, string[]> when structured', () => {
    const withStructuredLabel = {
      ...annotationCollection,
      label: { en: ["English Label"] }
    };
    const m = Maniiifest.parseAnnotationCollection(withStructuredLabel);
    const label = m.getAnnotationCollectionLabel();
    expect(label).toEqual({ en: ["English Label"] });
    expect(label).not.toHaveProperty('kind');
  });

  it('getAnnotationCollectionTotal returns the total', () => {
    const m = Maniiifest.parseAnnotationCollection(annotationCollection);
    expect(m.getAnnotationCollectionTotal()).toBe(42023);
  });

  it('getAnnotationCollectionFirst returns the first URI (polymorphic unwrap)', () => {
    const m = Maniiifest.parseAnnotationCollection(annotationCollection);
    const first = m.getAnnotationCollectionFirst();
    expect(typeof first).toBe('string');
    expect(first).toBe("http://example.org/page1");
  });

  it('getAnnotationCollectionLast returns the last URI', () => {
    const m = Maniiifest.parseAnnotationCollection(annotationCollection);
    expect(m.getAnnotationCollectionLast()).toBe("http://example.org/page42");
  });
});

describe('AnnotationPage getters', () => {

  const annotationPage = {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    "id": "http://example.org/page1",
    "type": "AnnotationPage",
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
      },
      {
        "id": "http://example.org/anno2",
        "type": "Annotation",
        "body": "http://example.net/comment2",
        "target": "http://example.com/book/chapter2"
      }
    ]
  };

  it('getAnnotationPage returns a well-formed AnnotationPage', () => {
    const m = Maniiifest.parseAnnotationPage(annotationPage);
    const result = m.getAnnotationPage();
    expect(result).toBeDefined();
    expect(result!.id).toBe("http://example.org/page1");
    expect(result!.type).toBe("AnnotationPage");
  });

  it('getAnnotationPageId returns the id', () => {
    const m = Maniiifest.parseAnnotationPage(annotationPage);
    expect(m.getAnnotationPageId()).toBe("http://example.org/page1");
  });

  it('getAnnotationPageType returns the type', () => {
    const m = Maniiifest.parseAnnotationPage(annotationPage);
    expect(m.getAnnotationPageType()).toBe("AnnotationPage");
  });

  it('getAnnotationPageContext returns string (polymorphic unwrap)', () => {
    const m = Maniiifest.parseAnnotationPage(annotationPage);
    const ctx = m.getAnnotationPageContext();
    expect(typeof ctx).toBe('string');
    expect(ctx).toBe("http://www.w3.org/ns/anno.jsonld");
  });

  it('getAnnotationPageContext returns null when absent', () => {
    const { "@context": _, ...noCtx } = annotationPage;
    const m = Maniiifest.parseAnnotationPage(noCtx);
    expect(m.getAnnotationPageContext()).toBeNull();
  });

  it('getAnnotationPagePartOf returns plain object (polymorphic unwrap)', () => {
    const m = Maniiifest.parseAnnotationPage(annotationPage);
    const partOf = m.getAnnotationPagePartOf();
    expect(partOf).toEqual({
      id: "http://example.org/collection1",
      label: "Steampunk Annotations",
      total: 42023
    });
    expect(partOf).not.toHaveProperty('kind');
  });
});

describe('AnnotationPage iterators', () => {

  const annotationPage = {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    "id": "http://example.org/page1",
    "type": "AnnotationPage",
    "items": [
      {
        "id": "http://example.org/anno1",
        "type": "Annotation",
        "body": "http://example.net/comment1",
        "target": "http://example.com/book/chapter1"
      },
      {
        "id": "http://example.org/anno2",
        "type": "Annotation",
        "body": "http://example.net/comment2",
        "target": "http://example.com/book/chapter2"
      }
    ]
  };

  it('iterateAnnotationPageAnnotation yields annotations', () => {
    const m = Maniiifest.parseAnnotationPage(annotationPage);
    const result = Array.from(m.iterateAnnotationPageAnnotation());
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("http://example.org/anno1");
    expect(result[1].id).toBe("http://example.org/anno2");
  });

  it('iterateAnnotationPageAnnotation yields empty when no items', () => {
    const empty = { ...annotationPage, items: undefined };
    const m = Maniiifest.parseAnnotationPage(empty);
    expect(Array.from(m.iterateAnnotationPageAnnotation())).toEqual([]);
  });

  it('iterateAnnotationPageAnnotationTextualBody yields textual bodies', () => {
    const page = {
      id: "http://example.org/page1",
      type: "AnnotationPage",
      items: [
        {
          id: "http://example.org/anno1",
          type: "Annotation",
          body: { type: "TextualBody", value: "Comment 1", format: "text/plain" },
          target: "http://example.com/chapter1"
        }
      ]
    };
    const m = Maniiifest.parseAnnotationPage(page);
    const result = Array.from(m.iterateAnnotationPageAnnotationTextualBody());
    expect(result).toHaveLength(1);
    expect(result[0].value).toBe("Comment 1");
  });

  it('iterateAnnotationPageAnnotationCanvasRef yields canvas ref targets (id + partOf)', () => {
    const page = {
      id: "http://example.org/page1",
      type: "AnnotationPage",
      items: [
        {
          id: "http://example.org/anno1",
          type: "Annotation",
          body: "http://example.net/body1",
          target: {
            id: "http://example.org/canvas1",
            partOf: {
              id: "http://example.org/manifest",
              type: "Manifest",
              label: { en: ["Manifest 1"] }
            }
          }
        }
      ]
    };
    const m = Maniiifest.parseAnnotationPage(page);
    const result = Array.from(m.iterateAnnotationPageAnnotationCanvasRef());
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('partOf');
  });

  it('iterateAnnotationPageAnnotationCanvasRef yields from array targets', () => {
    const page = {
      id: "http://example.org/page1",
      type: "AnnotationPage",
      items: [
        {
          id: "http://example.org/anno1",
          type: "Annotation",
          body: "http://example.net/body1",
          target: [
            { id: "http://example.org/canvas1", partOf: { id: "http://example.org/m1", type: "Manifest" } },
            { id: "http://example.org/canvas2", partOf: { id: "http://example.org/m1", type: "Manifest" } }
          ]
        }
      ]
    };
    const m = Maniiifest.parseAnnotationPage(page);
    const result = Array.from(m.iterateAnnotationPageAnnotationCanvasRef());
    expect(result).toHaveLength(2);
    expect(result[0].id).toContain('canvas1');
    expect(result[1].id).toContain('canvas2');
  });

  it('iterateAnnotationPageAnnotationCanvasRef skips non-canvasref targets', () => {
    const page = {
      id: "http://example.org/page1",
      type: "AnnotationPage",
      items: [
        {
          id: "http://example.org/anno1",
          type: "Annotation",
          body: "http://example.net/body1",
          target: "http://example.org/plain-string-target"
        }
      ]
    };
    const m = Maniiifest.parseAnnotationPage(page);
    const result = Array.from(m.iterateAnnotationPageAnnotationCanvasRef());
    expect(result).toHaveLength(0);
  });

  it('iterateAnnotationPageAnnotationCanvasRef yields nothing for empty items', () => {
    const page = {
      id: "http://example.org/page1",
      type: "AnnotationPage",
      items: []
    };
    const m = Maniiifest.parseAnnotationPage(page);
    const result = Array.from(m.iterateAnnotationPageAnnotationCanvasRef());
    expect(result).toHaveLength(0);
  });
});
