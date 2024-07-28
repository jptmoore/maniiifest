
import { Manifesty } from '../src/Manifesty'; 
import * as F from '../src/specification';

jest.mock('../src/specification', () => ({
  readSpecificationT: jest.fn(),
  writeLabelT: jest.fn(),
  writeSummaryT: jest.fn(),
}));

describe('Manifesty.getManifestLabel', () => {
  let manifesty: Manifesty;
  const mockLabel = { "label": "Example Label" };

  beforeEach(() => {
    jest.clearAllMocks();
    manifesty = new Manifesty({});
    manifesty.specification = {
      kind: '',
      value: { label: mockLabel },
    };
  });

  test('returns processed label when kind is "Manifest"', () => {
    manifesty.specification.kind = 'Manifest';
    const mockLabel = { "label": "Example Label" }; // Define the mock label to be used in the test
    const expectedLabel = { "label": mockLabel };
    (F.writeLabelT as jest.Mock).mockReturnValue(expectedLabel);
    const result = manifesty.getManifestLabel();
    expect(F.writeLabelT).toHaveBeenCalledWith(mockLabel); 
    expect(result).toEqual(expectedLabel);
  });

  test('returns null when kind is not "Manifest"', () => {
    manifesty.specification.kind = 'NotManifest';
    const result = manifesty.getManifestLabel();
    expect(F.writeLabelT).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});

describe('Manifesty.getManifestSummary', () => {
  let manifesty: Manifesty;
  const mockSummary = { "summary": "Example Summary" };

  beforeEach(() => {
    jest.clearAllMocks();
    manifesty = new Manifesty({});
    manifesty.specification = {
      kind: '',
      value: { summary: mockSummary },
    };
  });

  test('returns processed summary when kind is "Manifest"', () => {
    manifesty.specification.kind = 'Manifest';
    const expectedSummary = { "summary": mockSummary };
    (F.writeSummaryT as jest.Mock).mockReturnValue(expectedSummary);
    const result = manifesty.getManifestSummary();
    expect(F.writeSummaryT).toHaveBeenCalledWith(mockSummary); 
    expect(result).toEqual(expectedSummary);
  });

  test('returns null when kind is not "Manifest"', () => {
    manifesty.specification.kind = 'NotManifest';
    const result = manifesty.getManifestSummary();
    expect(F.writeSummaryT).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});

