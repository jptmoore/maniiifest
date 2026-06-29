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

describe('Annotation GeoJSON target', () => {

  const featureTarget = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[[1000, 1024], [2000, 1024], [2000, 2024], [1000, 2024], [1000, 1024]]]
    },
    properties: { source: "extract" }
  };

  const featureAnnotation = {
    id: "https://example.org/anno-1",
    type: "Annotation",
    motivation: ["commenting", "tagging"],
    target: featureTarget,
    body: [{ type: "TextualBody", purpose: "identifying", value: "Boundary" }]
  };

  const featureCollectionTarget = {
    id: "https://example.org/fc/1",
    type: "FeatureCollection",
    features: [
      {
        id: "https://example.org/feature/1",
        type: "Feature",
        properties: {},
        geometry: { type: "Point", coordinates: [9.938, 51.533] }
      }
    ]
  };

  it('parses a Feature target without throwing and round-trips', () => {
    const m = Maniiifest.parseAnnotation(featureAnnotation);
    const result = Array.from(m.iterateAnnotationTarget());
    expect(result).toHaveLength(1);
    const target = result[0] as any;
    expect(target).not.toHaveProperty('kind');
    expect(target.type).toBe("Feature");
    expect(target.geometry).toEqual(featureTarget.geometry);
  });

  it('parses a FeatureCollection target without throwing and round-trips', () => {
    const annotation = { ...featureAnnotation, target: featureCollectionTarget };
    const m = Maniiifest.parseAnnotation(annotation);
    const result = Array.from(m.iterateAnnotationTarget());
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(featureCollectionTarget);
    expect(result[0]).not.toHaveProperty('kind');
  });

  it('getAnnotationTargetFeature returns the Feature target geometry/coordinates', () => {
    const m = Maniiifest.parseAnnotation(featureAnnotation);
    const feature = m.getAnnotationTargetFeature();
    expect(feature).not.toBeNull();
    expect(feature!.type).toBe("Feature");
    expect(feature!.geometry).toEqual(featureTarget.geometry);
  });

  it('getAnnotationTargetFeature returns null for a non-Feature target', () => {
    const annotation = { ...featureAnnotation, target: "http://example.org/target1" };
    const m = Maniiifest.parseAnnotation(annotation);
    expect(m.getAnnotationTargetFeature()).toBeNull();
  });

  it('getAnnotationTargetFeatureCollection returns the FeatureCollection target', () => {
    const annotation = { ...featureAnnotation, target: featureCollectionTarget };
    const m = Maniiifest.parseAnnotation(annotation);
    const fc = m.getAnnotationTargetFeatureCollection();
    expect(fc).not.toBeNull();
    expect(fc!.type).toBe("FeatureCollection");
    expect(fc!.features).toHaveLength(1);
  });

  it('iterateAnnotationTargetFeature yields the single Feature target', () => {
    const m = Maniiifest.parseAnnotation(featureAnnotation);
    const result = Array.from(m.iterateAnnotationTargetFeature());
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("Feature");
    expect(result[0].geometry).toEqual(featureTarget.geometry);
  });

  it('iterateAnnotationTargetFeature yields features from a FeatureCollection target', () => {
    const annotation = { ...featureAnnotation, target: featureCollectionTarget };
    const m = Maniiifest.parseAnnotation(annotation);
    const result = Array.from(m.iterateAnnotationTargetFeature());
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("https://example.org/feature/1");
  });

  it('iterateAnnotationTargetGeometryPointCoordinates yields point coordinates from a Feature target', () => {
    const pointAnnotation = {
      ...featureAnnotation,
      target: {
        type: "Feature",
        geometry: { type: "Point", coordinates: [9.938, 51.533] },
        properties: {}
      }
    };
    const m = Maniiifest.parseAnnotation(pointAnnotation);
    const result = Array.from(m.iterateAnnotationTargetGeometryPointCoordinates());
    expect(result).toEqual([9.938, 51.533]);
  });

  it('iterateAnnotationTargetGeometryPointCoordinates yields point coordinates from a FeatureCollection target', () => {
    const annotation = { ...featureAnnotation, target: featureCollectionTarget };
    const m = Maniiifest.parseAnnotation(annotation);
    const result = Array.from(m.iterateAnnotationTargetGeometryPointCoordinates());
    expect(result).toEqual([9.938, 51.533]);
  });

  it('does not throw when a manifest canvas annotation has a Feature target', () => {
    const manifest = {
      "@context": "http://iiif.io/api/presentation/3/context.json",
      "id": "https://example.org/m.json",
      "type": "Manifest",
      "label": { "en": ["x"] },
      "items": [{
        "id": "https://example.org/canvas/1",
        "type": "Canvas",
        "width": 4032, "height": 3024,
        "items": [],
        "annotations": [{
          "id": "https://example.org/canvas/1/features",
          "type": "AnnotationPage",
          "items": [featureAnnotation]
        }]
      }]
    };
    expect(() => new Maniiifest(manifest)).not.toThrow();
  });

  it('keeps georeferencing working: SpecificResource target + FeatureCollection body', () => {
    const annotation = {
      id: "https://example.org/anno-geo",
      type: "Annotation",
      motivation: "georeferencing",
      target: {
        type: "SpecificResource",
        source: "https://example.org/canvas/1"
      },
      body: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: { type: "Point", coordinates: [9.938, 51.533] }
          }
        ]
      }
    };
    const m = Maniiifest.parseAnnotation(annotation);
    const targets = Array.from(m.iterateAnnotationTarget());
    expect(targets).toHaveLength(1);
    expect((targets[0] as any).type).toBe("SpecificResource");
    expect(m.getAnnotationFeatureCollection()).not.toBeNull();
  });
});

