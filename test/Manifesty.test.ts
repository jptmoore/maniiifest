import { Manifesty } from '../src/Manifesty';


describe('Collection functionality', () => {

  const collection = {
    "id": "https://example.org/iiif/book1/manifest",
    "type": "Collection",
    "label": { "en": ["Book 1"] }
  }

  it('should return the collection', () => {
    const manifesty = new Manifesty(collection);
    const result = manifesty.getCollection();
    expect(result).toEqual(collection);
  });

});


describe('Manifest functionality', () => {

  const manifest = {
    "id": "https://example.org/iiif/book1/manifest",
    "type": "Manifest",
    "label": { "en": ["Book 1"] }
  }

  it('should return the manifest', () => {
    const manifesty = new Manifesty(manifest);
    const result = manifesty.getManifest();
    expect(result).toEqual(manifest);
  });

  it('should return the correct manifest label', () => {
    const manifesty = new Manifesty(manifest);
    const label = { en: ["Book 1"] };
    const result = manifesty.getManifestLabel();
    expect(result).toEqual(label);
  });

  it('should return the correct manifest summary', () => {
    const summary = { "en": ["Book 1, written be Anne Author, published in Paris around 1400."] }
    const manifesty = new Manifesty({ summary, ...manifest });
    const result = manifesty.getManifestSummary();
    expect(result).toEqual(summary);
  });

  it('should return null if summary is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = manifesty.getManifestSummary();
    expect(result).toBeNull();
  });

  it('should return the correct manifest viewing direction', () => {
    const viewingDirection = "right-to-left";
    const manifesty = new Manifesty({ viewingDirection, ...manifest });
    const result = manifesty.getManifestViewingDirection();
    expect(result).toEqual(viewingDirection);
  });

  it('should return null if viewing direction is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = manifesty.getManifestViewingDirection();
    expect(result).toBeNull();
  });

  it('should return the correct manifest navDate', () => {
    const navDate = "1856-01-01T00:00:00Z";
    const manifesty = new Manifesty({ navDate, ...manifest });
    const result = manifesty.getManifestNavDate();
    expect(result).toEqual(navDate);
  });

  it('should return null if navDate is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = manifesty.getManifestNavDate();
    expect(result).toBeNull();
  });

  it('should return the correct manifest navPlace', () => {
    const navPlace = {
      "id": "http://example.com/feature-collection/1",
      "type": "FeatureCollection",
      "features": [
        {
          "id": "http://example.com/feature/1",
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              9.938,
              51.533
            ]
          }
        }
      ]
    }
    const manifesty = new Manifesty({ navPlace, ...manifest });
    const result = manifesty.getManifestNavPlace();
    expect(result).toEqual(navPlace);
  });

  it('should return null if navPlace is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = manifesty.getManifestNavPlace();
    expect(result).toBeNull();
  });

  it('should return the correct manifest rights', () => {
    const rights = "http://rightsstatements.org/vocab/NoC-NC/1.0/";
    const manifesty = new Manifesty({ rights, ...manifest });
    const result = manifesty.getManifestRights();
    expect(result).toEqual(rights);
  });

  it('should return null if rights is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = manifesty.getManifestRights();
    expect(result).toBeNull();
  });

  it('should return the correct required statement', () => {
    const requiredStatement = {
      "label": { "en": ["Attribution"] },
      "value": { "en": ["Provided by Example Organization"] }
    }
    const manifesty = new Manifesty({ requiredStatement, ...manifest });
    const result = manifesty.getManifestRequiredStatement();
    expect(result).toEqual(requiredStatement);
  });

  it('should return null if required statement is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = manifesty.getManifestRequiredStatement();
    expect(result).toBeNull();
  });

  it('should return the correct manifest start', () => {
    const start = {
      "id": "https://example.org/iiif/book1/canvas/p1",
      "type": "Canvas",
      "label": { "en": ["p. 1"] }
    }
    const manifesty = new Manifesty({ start, ...manifest });
    const result = manifesty.getManifestStart();
    expect(result).toEqual(start);
  });

  it('should return null if start is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = manifesty.getManifestStart();
    expect(result).toBeNull();
  });

  it('should return the correct manifest behavior through iteration', () => {
    const behavior = ["paged"];
    const manifesty = new Manifesty({ behavior, ...manifest });
    const result = Array.from(manifesty.iterateManifestBehavior());
    expect(result).toEqual(behavior);
  });

  it('should return empty list if behavior is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = Array.from(manifesty.iterateManifestBehavior());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest rending through iteration', () => {
    const rendering = [
      {
        "id": "https://example.org/iiif/book1.pdf",
        "type": "Text",
        "label": { "en": ["Download as PDF"] },
        "format": "application/pdf"
      }
    ]
    const manifesty = new Manifesty({ rendering, ...manifest });
    const result = Array.from(manifesty.iterateManifestRendering());
    expect(result).toEqual(rendering);
  });

  it('should return empty list if rendering is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = Array.from(manifesty.iterateManifestRendering());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest partOf through iteration', () => {
    const partOf = [
      {
        "id": "https://example.org/iiif/book1/collection",
        "type": "Collection",
        "label": { "en": ["Book 1"] }
      }
    ]
    const manifesty = new Manifesty({ partOf, ...manifest });
    const result = Array.from(manifesty.iterateManifestPartOf());
    expect(result).toEqual(partOf);
  });

  it('should return empty list if partOf is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = Array.from(manifesty.iterateManifestPartOf());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest seeAlso through iteration', () => {
    const seeAlso = [
      {
        "id": "https://example.org/iiif/book1.xml",
        "type": "Dataset",
        "label": { "en": ["Metadata as XML"] },
        "format": "application/xml"
      }
    ]
    const manifesty = new Manifesty({ seeAlso, ...manifest });
    const result = Array.from(manifesty.iterateManifestSeeAlso());
    expect(result).toEqual(seeAlso);
  });

  it('should return empty list if seeAlso is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = Array.from(manifesty.iterateManifestSeeAlso());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest service through iteration', () => {
    const service = [
      {
        "id": "https://example.org/iiif/book1/access-control",
        "type": "AuthCookieService1",
        "profile": "http://iiif.io/api/auth/1"
      }
    ]
    const manifesty = new Manifesty({ service, ...manifest });
    const result = Array.from(manifesty.iterateManifestService());
    expect(result).toEqual(service);
  });

  it('should return empty list if service is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = Array.from(manifesty.iterateManifestService());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest services through iteration', () => {
    const services = [
      {
        "@id": "https://example.org/iiif/auth/login",
        "@type": "AuthCookieService1",
        "label": "Login to Example Institution",
        "profile": "http://iiif.io/api/auth/1/login",
        "service": [
          {
            "@id": "https://example.org/iiif/auth/token",
            "@type": "AuthTokenService1",
            "profile": "http://iiif.io/api/auth/1/token"
          }
        ]
      }
    ]
    const manifesty = new Manifesty({ services, ...manifest });
    const result = Array.from(manifesty.iterateManifestServices());
    expect(result).toEqual(services);
  });

  it('should return empty list if services is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = Array.from(manifesty.iterateManifestServicesService());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest thumbnail through iteration', () => {
    const thumbnail = [
      {
        "id": "https://example.org/iiif/book1/page1/full/80,100/0/default.jpg",
        "type": "Image",
        "format": "image/jpeg",
        "service": [
          {
            "id": "https://example.org/iiif/book1/page1",
            "type": "ImageService3",
            "profile": "level1"
          }
        ]
      }
    ]
    const manifesty = new Manifesty({ thumbnail, ...manifest });
    const result = Array.from(manifesty.iterateManifestThumbnail());
    expect(result).toEqual(thumbnail);
  });

  it('should return empty list if thumbnail is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = Array.from(manifesty.iterateManifestThumbnail());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest homepage through iteration', () => {
    const homepage = [
      {
        "id": "http://example.org",
        "type": "Text",
        "label": { "en": ["Example Organization Homepage"] }
      }
    ]
    const manifesty = new Manifesty({ homepage, ...manifest });
    const result = Array.from(manifesty.iterateManifestHomepage());
    expect(result).toEqual(homepage);
  });

  it('should return empty list if homepage is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = Array.from(manifesty.iterateManifestHomepage());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest provider through iteration', () => {
    const provider = [
      {
        "id": "http://example.org",
        "type": "Text",
        "label": { "en": ["Example Organization"] }
      }
    ]
    const manifesty = new Manifesty({ provider, ...manifest });
    const result = Array.from(manifesty.iterateManifestProvider());
    expect(result).toEqual(provider);
  });

  it('should return empty list if provider is not set', () => {
    const manifesty = new Manifesty(manifest);
    const result = Array.from(manifesty.iterateManifestProvider());
    expect(result).toEqual([]);
  });

  describe('Manifest canvas annotation functionality', () => {
    const items = [
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
                      "profile": "level2",
                      "service": [
                        {
                          "@id": "https://example.org/iiif/auth/login",
                          "@type": "AuthCookieService1"
                        }
                      ]
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
      }]

    it('should return the correct manifest canvas through iteration', () => {
      const manifesty = new Manifesty({ items, ...manifest });
      const result = Array.from(manifesty.iterateManifestCanvas());
      expect(result).toEqual(items);
    });

  });

  describe('Manifest annotation functionality', () => {

    const annotations = [
      {
        "id": "https://example.org/iiif/book1/page/manifest/1",
        "type": "AnnotationPage",
        "items": [
          {
            "id": "https://example.org/iiif/book1/page/manifest/a1",
            "type": "Annotation",
            "motivation": "commenting",
            "body": {
              "type": "TextualBody",
              "language": "en",
              "value": "I love this manifest!"
            },
            "target": "https://example.org/iiif/book1/manifest"
          }
        ]
      }
    ]

    it('should return the correct manifest W3c annotations through iteration', () => {
      const expected = [{
        "id": "https://example.org/iiif/book1/page/manifest/a1",
        "type": "Annotation",
        "motivation": "commenting",
        "body": {
          "type": "TextualBody",
          "language": "en",
          "value": "I love this manifest!"
        },
        "target": "https://example.org/iiif/book1/manifest"
      }]
      const manifesty = new Manifesty({ annotations, ...manifest });
      const result = Array.from(manifesty.iterateManifestW3cAnnotation());
      expect(result).toEqual(expected);
    });

    it('should return empty list if annotations is not set', () => {
      const manifesty = new Manifesty(manifest);
      const result = Array.from(manifesty.iterateManifestW3cAnnotation());
      expect(result).toEqual([]);
    });

    it('should return the correct manifest W3c annotation pages through iteration', () => {
      const manifesty = new Manifesty({ annotations, ...manifest });
      const result = Array.from(manifesty.iterateManifestW3cAnnotationPage());
      expect(result).toEqual(annotations);
    });

  });

});