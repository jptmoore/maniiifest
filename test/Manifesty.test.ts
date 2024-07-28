import { Manifesty } from '../src/Manifesty';
import { readJsonFromFile } from '../src/utils';

describe('Manifesty functionality', () => {
  let manifesty: Manifesty;
  let jsonData: any;
  const filename = 'test/detailed.json';

  beforeAll(async () => {
    jsonData = await readJsonFromFile(filename);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    manifesty = new Manifesty(jsonData);
  });

  it('should return the correct manifest label', async () => {
    const expectedResult = { en: ["Book 1"] };
    const result = manifesty.getManifestLabel();
    expect(result).toEqual(expectedResult);
  });

  it('should return the correct manifest summary', async () => {
    const expectedResult = { en: ["Book 1, written be Anne Author, published in Paris around 1400."] };
    const result = manifesty.getManifestSummary();
    expect(result).toEqual(expectedResult);
  });
});

