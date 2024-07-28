import { Manifesty } from '../src/Manifesty';
import { readJsonFromFile } from '../src/utils';

describe('test Manifest', () => {
  let filename = 'test/detailed.json';
  let manifesty: Manifesty;
  let jsonData: any;

  beforeAll(() => {
    jsonData = readJsonFromFile(filename);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    manifesty = new Manifesty(jsonData);
  });

  it('should return the correct manifest label', () => {
    const expectedResult = { "en": ["Book 1"] };
    const result = manifesty.getManifestLabel();
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult));
  });

  it('should return the correct manifest summary', () => {
    const expectedResult = { "en": ["Book 1, written be Anne Author, published in Paris around 1400."] };
    const result = manifesty.getManifestSummary();
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult));
  });
});

