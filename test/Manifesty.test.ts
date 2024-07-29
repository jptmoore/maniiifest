import { Manifesty } from '../src/Manifesty';

describe('Manifesty functionality', () => {

  it('should return the correct manifest label', () => {
    const jsonData = {
      "id": "https://example.org/iiif/book1/manifest",
      "type": "Manifest",
      "label": { "en": ["Book 1"] }
    }
    const manifesty = new Manifesty(jsonData);
    const expectedResult = { en: ["Book 1"] };
    const result = manifesty.getManifestLabel();
    expect(result).toEqual(expectedResult);
  });

  it('should return the correct manifest summary', () => {
    const jsonData = {
      "id": "https://example.org/iiif/book1/manifest",
      "type": "Manifest",
      "label": { "en": ["Book 1"] },
      "summary": { "en": ["Book 1, written be Anne Author, published in Paris around 1400."] }
    }
    const manifesty = new Manifesty(jsonData);
    const expectedResult = { en: ["Book 1, written be Anne Author, published in Paris around 1400."] };
    const result = manifesty.getManifestSummary();
    expect(result).toEqual(expectedResult);
  });

  it('should return null if summary is not set', () => {
    const jsonData = {
      "id": "https://example.org/iiif/book1/manifest",
      "type": "Manifest",
      "label": { "en": ["Book 1"] }
    }
    const manifesty = new Manifesty(jsonData);
    const result = manifesty.getManifestSummary();
    expect(result).toBeNull();
  });

  it('should return the correct manifest viewing direction', () => {
    const jsonData = {
      "id": "https://example.org/iiif/book1/manifest",
      "type": "Manifest",
      "label": { "en": ["Book 1"] },
      "viewingDirection": "right-to-left"
    }
    const manifesty = new Manifesty(jsonData);
    const expectedResult = "right-to-left";
    const result = manifesty.getManifestViewingDirection();
    expect(result).toEqual(expectedResult);
  });

  it('should return null if viewing direction is not set', () => {
    const jsonData = {
      "id": "https://example.org/iiif/book1/manifest",
      "type": "Manifest",
      "label": { "en": ["Book 1"] }
    }
    const manifesty = new Manifesty(jsonData);
    const result = manifesty.getManifestViewingDirection();
    expect(result).toBeNull();
  });

  it('should return the correct manifest behavior through iteration', () => {
    const jsonData = {
      "id": "https://example.org/iiif/book1/manifest",
      "type": "Manifest",
      "label": { "en": ["Book 1"] },
      "behavior": ["paged"]
    }
    const manifesty = new Manifesty(jsonData);
    const expectedResult = ["paged"];
    const result = Array.from(manifesty.iterateManifestBehavior());
    expect(result).toEqual(expectedResult);
  });

  it('should return empty list if behavior is not set', () => {
    const jsonData = {
      "id": "https://example.org/iiif/book1/manifest",
      "type": "Manifest",
      "label": { "en": ["Book 1"] }
    }
    const manifesty = new Manifesty(jsonData);
    const result = Array.from(manifesty.iterateManifestBehavior());
    expect(result).toEqual([]);
  });

  it('should return the correct manifest navDate', () => {
    const jsonData = {
      "id": "https://example.org/iiif/book1/manifest",
      "type": "Manifest",
      "label": { "en": ["Book 1"] },
      "navDate": "1856-01-01T00:00:00Z"
    }
    const manifesty = new Manifesty(jsonData);
    const expectedResult = "1856-01-01T00:00:00Z";
    const result = manifesty.getManifestNavDate();
    expect(result).toEqual(expectedResult);
  });

  it('should return null if navDate is not set', () => {
    const jsonData = {
      "id": "https://example.org/iiif/book1/manifest",
      "type": "Manifest",
      "label": { "en": ["Book 1"] }
    }
    const manifesty = new Manifesty(jsonData);
    const result = manifesty.getManifestNavDate();
    expect(result).toBeNull();
  });

});

