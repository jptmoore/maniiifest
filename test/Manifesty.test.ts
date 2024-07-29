import { Manifesty } from '../src/Manifesty';

describe('Manifesty functionality', () => {

  const manifest = {
    "id": "https://example.org/iiif/book1/manifest",
    "type": "Manifest",
    "label": { "en": ["Book 1"] }
  }

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

});

