import { Maniiifest } from '../src/Maniiifest';


describe('Collection functionality', () => {

  const collection = {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    "id": "https://iiif.io/api/cookbook/recipe/0032-collection/collection.json",
    "type": "Collection",
    "label": {
      "en": [
        "Simple Collection Example"
      ]
    }
  }

  const items = [
    {
      "id": "https://iiif.io/api/cookbook/recipe/0032-collection/manifest-01.json",
      "type": "Manifest",
      "label": {
        "en": [
          "The Gulf Stream"
        ]
      }
    },
    {
      "id": "https://iiif.io/api/cookbook/recipe/0032-collection/manifest-02.json",
      "type": "Manifest",
      "label": {
        "en": [
          "Northeaster"
        ]
      }
    }
  ]

  it('should return the correct specificaton type', () => {
    const maniiifest = new Maniiifest(collection);
    const result = maniiifest.getSpecificationType();
    expect(result).toEqual("Collection");
  });

  it('should return the correct collection id', () => {
    const maniiifest = new Maniiifest(collection);
    const result = maniiifest.getCollectionId();
    expect(result).toEqual("https://iiif.io/api/cookbook/recipe/0032-collection/collection.json");
  });

  it('should return the correct collection label', () => {
    const maniiifest = new Maniiifest(collection);
    const label = { en: ["Simple Collection Example"] };
    const result = maniiifest.getCollectionLabel();
    expect(result).toEqual(label);
  });

  it('should return the correct collection label through iteration', () => {
    const maniiifest = new Maniiifest({ items, ...collection });
    const result = Array.from(maniiifest.iterateCollectionLabel());
    expect(result).toEqual([{ en: ["Simple Collection Example"] }]);
  });

  it('should return the correct collection metadata through iteration', () => {
    const metadata = [
      {
        "label": { "en": ["Author"] },
        "value": { "en": ["Anne Author"] }
      }
    ]
    const maniiifest = new Maniiifest({ metadata, items, ...collection });
    const result = Array.from(maniiifest.iterateCollectionMetadata());
    expect(result).toEqual(metadata);
  });

  it('should return empty list if metadata is not set', () => {
    const maniiifest = new Maniiifest({ items, ...collection });
    const result = Array.from(maniiifest.iterateCollectionMetadata());
    expect(result).toEqual([]);
  });

  it('should return correct collection manifest through iteration', () => {
    const maniiifest = new Maniiifest({ items, ...collection });
    const result = Array.from(maniiifest.iterateCollectionManifest());
    expect(result).toEqual(items);
  });

  it('should return empty list if collection items is not set', () => {
    const maniiifest = new Maniiifest(collection);
    const result = Array.from(maniiifest.iterateCollectionManifest());
    expect(result).toEqual([]);
  });

});


describe('Manifest toplevel functionality', () => {

  const manifest = {
    "id": "https://example.org/iiif/book1/manifest",
    "type": "Manifest",
    "label": { "en": ["Book 1"] }
  }

  it('should return the correct specificaton type', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = maniiifest.getSpecificationType();
    expect(result).toEqual("Manifest");
  });

  it('should return the correct manifest id', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = maniiifest.getManifestId();
    expect(result).toEqual("https://example.org/iiif/book1/manifest");
  });

  it('should return the correct manifest label', () => {
    const maniiifest = new Maniiifest(manifest);
    const label = { en: ["Book 1"] };
    const result = maniiifest.getManifestLabel();
    expect(result).toEqual(label);
  });

  it('should return the correct manifest summary', () => {
    const summary = { "en": ["Book 1, written be Anne Author, published in Paris around 1400."] }
    const maniiifest = new Maniiifest({ summary, ...manifest });
    const result = maniiifest.getManifestSummary();
    expect(result).toEqual(summary);
  });

  it('should return null if summary is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = maniiifest.getManifestSummary();
    expect(result).toBeNull();
  });

  it('should return the correct manifest viewing direction', () => {
    const viewingDirection = "right-to-left";
    const maniiifest = new Maniiifest({ viewingDirection, ...manifest });
    const result = maniiifest.getManifestViewingDirection();
    expect(result).toEqual(viewingDirection);
  });

  it('should return null if viewing direction is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = maniiifest.getManifestViewingDirection();
    expect(result).toBeNull();
  });

  it('should return the correct manifest navDate', () => {
    const navDate = "1856-01-01T00:00:00Z";
    const maniiifest = new Maniiifest({ navDate, ...manifest });
    const result = maniiifest.getManifestNavDate();
    expect(result).toEqual(navDate);
  });

  it('should return null if navDate is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = maniiifest.getManifestNavDate();
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
    const maniiifest = new Maniiifest({ navPlace, ...manifest });
    const result = maniiifest.getManifestNavPlace();
    expect(result).toEqual(navPlace);
  });

  it('should return null if navPlace is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = maniiifest.getManifestNavPlace();
    expect(result).toBeNull();
  });

  it('should return the correct manifest rights', () => {
    const rights = "http://rightsstatements.org/vocab/NoC-NC/1.0/";
    const maniiifest = new Maniiifest({ rights, ...manifest });
    const result = maniiifest.getManifestRights();
    expect(result).toEqual(rights);
  });

  it('should return null if rights is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = maniiifest.getManifestRights();
    expect(result).toBeNull();
  });

  it('should return the correct required statement', () => {
    const requiredStatement = {
      "label": { "en": ["Attribution"] },
      "value": { "en": ["Provided by Example Organization"] }
    }
    const maniiifest = new Maniiifest({ requiredStatement, ...manifest });
    const result = maniiifest.getManifestRequiredStatement();
    expect(result).toEqual(requiredStatement);
  });

  it('should return null if required statement is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = maniiifest.getManifestRequiredStatement();
    expect(result).toBeNull();
  });

  it('should return the correct manifest start', () => {
    const start = {
      "id": "https://example.org/iiif/book1/canvas/p1",
      "type": "Canvas",
      "label": { "en": ["p. 1"] }
    }
    const maniiifest = new Maniiifest({ start, ...manifest });
    const result = maniiifest.getManifestStart();
    expect(result).toEqual(start);
  });

  it('should return null if start is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = maniiifest.getManifestStart();
    expect(result).toBeNull();
  });

  it('should return the correct manifest behavior through iteration', () => {
    const behavior = ["paged"];
    const maniiifest = new Maniiifest({ behavior, ...manifest });
    const result = Array.from(maniiifest.iterateManifestBehavior());
    expect(result).toEqual(behavior);
  });

  it('should return empty list if behavior is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestBehavior());
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
    const maniiifest = new Maniiifest({ rendering, ...manifest });
    const result = Array.from(maniiifest.iterateManifestRendering());
    expect(result).toEqual(rendering);
  });

  it('should return empty list if rendering is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestRendering());
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
    const maniiifest = new Maniiifest({ partOf, ...manifest });
    const result = Array.from(maniiifest.iterateManifestPartOf());
    expect(result).toEqual(partOf);
  });

  it('should return empty list if partOf is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestPartOf());
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
    const maniiifest = new Maniiifest({ seeAlso, ...manifest });
    const result = Array.from(maniiifest.iterateManifestSeeAlso());
    expect(result).toEqual(seeAlso);
  });

  it('should return empty list if seeAlso is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestSeeAlso());
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
    const maniiifest = new Maniiifest({ service, ...manifest });
    const result = Array.from(maniiifest.iterateManifestService());
    expect(result).toEqual(service);
  });

  it('should return empty list if service is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestService());
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
    const maniiifest = new Maniiifest({ services, ...manifest });
    const result = Array.from(maniiifest.iterateManifestServices());
    expect(result).toEqual(services);
  });

  it('should return empty list if services is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestServicesService());
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
    const maniiifest = new Maniiifest({ thumbnail, ...manifest });
    const result = Array.from(maniiifest.iterateManifestThumbnail());
    expect(result).toEqual(thumbnail);
  });

  it('should return empty list if thumbnail is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestThumbnail());
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
    const maniiifest = new Maniiifest({ homepage, ...manifest });
    const result = Array.from(maniiifest.iterateManifestHomepage());
    expect(result).toEqual(homepage);
  });

  it('should return empty list if homepage is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestHomepage());
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
    const maniiifest = new Maniiifest({ provider, ...manifest });
    const result = Array.from(maniiifest.iterateManifestProvider());
    expect(result).toEqual(provider);
  });

  it('should return empty list if provider is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestProvider());
    expect(result).toEqual([]);
  });
});




describe('Manifest canvas functionality', () => {

  const manifest = {
    "id": "https://example.org/iiif/book1/manifest",
    "type": "Manifest",
    "label": { "en": ["Book 1"] }
  }

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
    const maniiifest = new Maniiifest({ items, ...manifest });
    const result = Array.from(maniiifest.iterateManifestCanvas());
    expect(result).toEqual(items);
  });

  it('should return empty list if items is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestCanvas());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest canvas annotation page through iteration', () => {
    const maniiifest = new Maniiifest({ items, ...manifest });
    const result = Array.from(maniiifest.iterateManifestCanvasAnnotationPage());
    expect(result).toEqual(items[0].items);
  });

  it('should return empty list if items is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestCanvasAnnotationPage());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest canvas annotation through iteration', () => {
    const maniiifest = new Maniiifest({ items, ...manifest });
    const result = Array.from(maniiifest.iterateManifestCanvasAnnotation());
    expect(result).toEqual(items[0].items[0].items);
  });

  it('should return empty list if items is not set', () => {
    const maniiifest = new Maniiifest(manifest);
    const result = Array.from(maniiifest.iterateManifestCanvasAnnotation());
    expect(result).toEqual([]);
  });

});
