import { Maniiifest } from '../src/Maniiifest';

describe('Annotation getters', () => {

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

  it('getAnnotation returns a well-formed Annotation', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    const result = m.getAnnotation();
    expect(result).toBeDefined();
    expect(result!.id).toBe("http://example.org/anno7");
    expect(result!.type).toBe("Annotation");
  });

  it('getAnnotationId returns the id', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    expect(m.getAnnotationId()).toBe("http://example.org/anno7");
  });

  it('getAnnotationType returns the type', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    expect(m.getAnnotationType()).toBe("Annotation");
  });

  it('getAnnotationContext returns string (polymorphic unwrap)', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    const ctx = m.getAnnotationContext();
    expect(typeof ctx).toBe('string');
    expect(ctx).toBe("http://www.w3.org/ns/anno.jsonld");
  });

  it('getAnnotationContext returns null when absent', () => {
    const { "@context": _, ...noCtx } = annotation;
    const m = Maniiifest.parseAnnotation(noCtx);
    expect(m.getAnnotationContext()).toBeNull();
  });

  it('getAnnotationBody returns the body object (polymorphic unwrap)', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    const body = m.getAnnotationBody();
    expect(body).toEqual({
      type: "TextualBody",
      value: "Comment text",
      format: "text/plain"
    });
    expect(body).not.toHaveProperty('kind');
  });

  it('getAnnotationBody returns string when body is a URI', () => {
    const m = Maniiifest.parseAnnotation({
      ...annotation,
      body: "http://example.net/comment1"
    });
    expect(m.getAnnotationBody()).toBe("http://example.net/comment1");
  });

  it('getAnnotationTarget returns string for URI target', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    expect(m.getAnnotationTarget()).toBe("http://example.org/target1");
  });

  it('getAnnotationTarget returns object for SpecificResource target', () => {
    const specificTarget = {
      ...annotation,
      target: {
        type: "SpecificResource",
        source: "http://example.org/canvas/1",
        selector: { type: "FragmentSelector", value: "xywh=0,0,100,100" }
      }
    };
    const m = Maniiifest.parseAnnotation(specificTarget);
    const target = m.getAnnotationTarget();
    expect(target).toBeDefined();
    expect(typeof target).toBe('object');
  });

  it('getAnnotationMotivation returns the motivation', () => {
    const m = Maniiifest.parseAnnotation(annotation);
    expect(m.getAnnotationMotivation()).toBe("commenting");
  });

  it('getAnnotationMotivation returns null when absent', () => {
    const { motivation: _, ...noMotivation } = annotation;
    const m = Maniiifest.parseAnnotation(noMotivation);
    expect(m.getAnnotationMotivation()).toBeNull();
  });
});

describe('Annotation body iterators', () => {

  it('iterateAnnotationTextualBody yields textual bodies', () => {
    const annotation = {
      id: "http://example.org/anno1",
      type: "Annotation",
      body: {
        type: "TextualBody",
        value: "Hello",
        format: "text/plain"
      },
      target: "http://example.org/target1"
    };
    const m = Maniiifest.parseAnnotation(annotation);
    const result = Array.from(m.iterateAnnotationTextualBody());
    expect(result).toHaveLength(1);
    expect(result[0].value).toBe("Hello");
    expect(result[0].type).toBe("TextualBody");
  });

  it('iterateAnnotationTextualBody handles array body', () => {
    const annotation = {
      id: "http://example.org/anno1",
      type: "Annotation",
      body: [
        { type: "TextualBody", value: "First", format: "text/plain" },
        { type: "TextualBody", value: "Second", format: "text/plain" }
      ],
      target: "http://example.org/target1"
    };
    const m = Maniiifest.parseAnnotation(annotation);
    const result = Array.from(m.iterateAnnotationTextualBody());
    expect(result).toHaveLength(2);
    expect(result[0].value).toBe("First");
    expect(result[1].value).toBe("Second");
  });

  it('iterateAnnotationResourceBody yields resource bodies', () => {
    const annotation = {
      id: "http://example.org/anno1",
      type: "Annotation",
      body: {
        id: "http://example.org/image.jpg",
        type: "Image",
        format: "image/jpeg"
      },
      target: "http://example.org/target1"
    };
    const m = Maniiifest.parseAnnotation(annotation);
    const result = Array.from(m.iterateAnnotationResourceBody());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("http://example.org/image.jpg");
    expect(result[0].type).toBe("Image");
  });
});

describe('Annotation target iterators', () => {

  it('iterateAnnotationTarget yields string target', () => {
    const annotation = {
      id: "http://example.org/anno1",
      type: "Annotation",
      body: "http://example.net/body1",
      target: "http://example.org/target1"
    };
    const m = Maniiifest.parseAnnotation(annotation);
    const result = Array.from(m.iterateAnnotationTarget());
    expect(result).toHaveLength(1);
    expect(result[0]).toBe("http://example.org/target1");
  });

  it('iterateAnnotationTarget yields SpecificResource target', () => {
    const annotation = {
      id: "http://example.org/anno1",
      type: "Annotation",
      body: "http://example.net/body1",
      target: {
        type: "SpecificResource",
        source: "http://example.org/canvas/1",
        selector: { type: "FragmentSelector", value: "xywh=0,0,100,100" }
      }
    };
    const m = Maniiifest.parseAnnotation(annotation);
    const result = Array.from(m.iterateAnnotationTarget());
    expect(result).toHaveLength(1);
    expect(result[0]).not.toHaveProperty('kind');
  });

  it('iterateAnnotationTarget yields multiple targets from array', () => {
    const annotation = {
      id: "http://example.org/anno1",
      type: "Annotation",
      body: "http://example.net/body1",
      target: [
        "http://example.org/target1",
        "http://example.org/target2"
      ]
    };
    const m = Maniiifest.parseAnnotation(annotation);
    const result = Array.from(m.iterateAnnotationTarget());
    expect(result).toHaveLength(2);
  });
});
