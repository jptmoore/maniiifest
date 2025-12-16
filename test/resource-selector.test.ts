import { normalize_resource_selector } from '../src/adapter';

describe('normalize_resource_selector', () => {
  
  // Mock function to capture the normalized input
  const mockFn = jest.fn((input, context) => input);

  beforeEach(() => {
    mockFn.mockClear();
  });

  describe('String selector (T1)', () => {
    it('should normalize string selector correctly', () => {
      const selector = "https://example.com/page.html#xywh=160,120,320,240";
      
      // Cast to any to bypass TypeScript constraint for string input
      const result = normalize_resource_selector(selector as any, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T1', selector], selector);
      expect(result).toEqual(['T1', selector]);
    });
  });

  describe('PointSelector (T2)', () => {
    it('should normalize PointSelector correctly', () => {
      const selector = {
        type: 'PointSelector',
        t: 14.5
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T2', selector], selector);
      expect(result).toEqual(['T2', selector]);
    });
  });

  describe('FragmentSelector (T3)', () => {
    it('should normalize FragmentSelector correctly', () => {
      const selector = {
        type: 'FragmentSelector',
        conformsTo: 'http://www.w3.org/TR/media-frags/',
        value: 'xywh=160,120,320,240'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T3', selector], selector);
      expect(result).toEqual(['T3', selector]);
    });

    it('should handle FragmentSelector with spatial coordinates', () => {
      const selector = {
        type: 'FragmentSelector',
        conformsTo: 'http://www.w3.org/TR/media-frags/',
        value: 'xywh=pixel:160,120,320,240'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T3', selector], selector);
      expect(result).toEqual(['T3', selector]);
    });

    it('should handle FragmentSelector with temporal coordinates', () => {
      const selector = {
        type: 'FragmentSelector',
        conformsTo: 'http://www.w3.org/TR/media-frags/',
        value: 't=30,60'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T3', selector], selector);
      expect(result).toEqual(['T3', selector]);
    });
  });

  describe('SvgSelector (T4)', () => {
    it('should normalize SvgSelector correctly', () => {
      const selector = {
        type: 'SvgSelector',
        value: '<svg xmlns="http://www.w3.org/2000/svg"><polygon points="270,230 270,320 440,320 440,230"/></svg>'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T4', selector], selector);
      expect(result).toEqual(['T4', selector]);
    });

    it('should handle complex SVG selector', () => {
      const selector = {
        type: 'SvgSelector',
        value: '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="50" fill="transparent" stroke="red" stroke-width="2"/></svg>'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T4', selector], selector);
      expect(result).toEqual(['T4', selector]);
    });
  });

  describe('ImageApiSelector (T5)', () => {
    it('should normalize ImageApiSelector correctly', () => {
      const selector = {
        type: 'ImageApiSelector',
        region: '0,0,1000,2000'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T5', selector], selector);
      expect(result).toEqual(['T5', selector]);
    });

    it('should normalize iiif:ImageApiSelector correctly', () => {
      const selector = {
        type: 'iiif:ImageApiSelector',
        region: 'full',
        size: '!1000,1000'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T5', selector], selector);
      expect(result).toEqual(['T5', selector]);
    });

    it('should handle ImageApiSelector with all parameters', () => {
      const selector = {
        type: 'ImageApiSelector',
        region: '125,15,570,772',
        size: '300,',
        rotation: '90',
        quality: 'gray',
        format: 'jpg'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T5', selector], selector);
      expect(result).toEqual(['T5', selector]);
    });
  });

  describe('TextQuoteSelector (T6)', () => {
    it('should normalize TextQuoteSelector with exact match', () => {
      const selector = {
        type: 'TextQuoteSelector',
        exact: 'Selected text content'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T6', selector], selector);
      expect(result).toEqual(['T6', selector]);
    });

    it('should handle TextQuoteSelector with prefix and suffix', () => {
      const selector = {
        type: 'TextQuoteSelector',
        exact: 'Selected text content',
        prefix: 'This is the ',
        suffix: ' that was chosen.'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T6', selector], selector);
      expect(result).toEqual(['T6', selector]);
    });

    it('should handle TextQuoteSelector with refinedBy', () => {
      const selector = {
        type: 'TextQuoteSelector',
        exact: 'Selected text content',
        refinedBy: {
          type: 'TextPositionSelector',
          start: 0,
          end: 21
        }
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T6', selector], selector);
      expect(result).toEqual(['T6', selector]);
    });
  });

  describe('XPathSelector (T7)', () => {
    it('should normalize XPathSelector correctly', () => {
      const selector = {
        type: 'XPathSelector',
        value: '//div[@class="content"]/p[2]'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T7', selector], selector);
      expect(result).toEqual(['T7', selector]);
    });

    it('should handle complex XPathSelector', () => {
      const selector = {
        type: 'XPathSelector',
        value: '//article[@id="main-content"]//p[contains(@class, "highlight")]'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T7', selector], selector);
      expect(result).toEqual(['T7', selector]);
    });

    it('should handle XPathSelector with refinedBy', () => {
      const selector = {
        type: 'XPathSelector',
        value: '//div[@class="content"]',
        refinedBy: {
          type: 'TextQuoteSelector',
          exact: 'specific text'
        }
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T7', selector], selector);
      expect(result).toEqual(['T7', selector]);
    });
  });

  describe('Error handling', () => {
    it('should throw error for unknown selector type', () => {
      const unknownSelector = {
        type: 'UnknownSelector',
        value: 'something'
      };
      
      expect(() => {
        normalize_resource_selector(unknownSelector, undefined, mockFn);
      }).toThrow(`${JSON.stringify(unknownSelector)}: Input type did not match expected types.`);
    });

    it('should throw error for object without type', () => {
      const invalidSelector = {
        value: 'something'
      };
      
      expect(() => {
        normalize_resource_selector(invalidSelector as any, undefined, mockFn);
      }).toThrow(`${JSON.stringify(invalidSelector)}: Input type did not match expected types.`);
    });

    it('should throw error for null input', () => {
      expect(() => {
        normalize_resource_selector(null as any, undefined, mockFn);
      }).toThrow("Cannot read properties of null (reading 'type')");
    });

    it('should throw error for number input', () => {
      const numberInput = 123;
      
      expect(() => {
        normalize_resource_selector(numberInput as any, undefined, mockFn);
      }).toThrow(`123: Input type did not match expected types.`);
    });
  });

  describe('Context handling', () => {
    it('should use provided context', () => {
      const selector = {
        type: 'FragmentSelector',
        value: 'xywh=160,120,320,240'
      };
      const customContext = { customData: 'test' };
      
      normalize_resource_selector(selector, customContext, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T3', selector], customContext);
    });

    it('should default context to selector when not provided', () => {
      const selector = {
        type: 'FragmentSelector',
        value: 'xywh=160,120,320,240'
      };
      
      normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T3', selector], selector);
    });
  });

  describe('Real-world examples', () => {
    it('should handle W3C Annotation FragmentSelector example', () => {
      const selector = {
        type: 'FragmentSelector',
        conformsTo: 'http://www.w3.org/TR/media-frags/',
        value: 'xywh=pixel:160,120,320,240'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T3', selector], selector);
      expect(result).toEqual(['T3', selector]);
    });

    it('should handle IIIF Canvas FragmentSelector', () => {
      const selector = {
        type: 'FragmentSelector',
        conformsTo: 'http://www.w3.org/TR/media-frags/',
        value: 'xywh=100,100,300,200'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T3', selector], selector);
      expect(result).toEqual(['T3', selector]);
    });

    it('should handle Web Annotation TextQuoteSelector', () => {
      const selector = {
        type: 'TextQuoteSelector',
        exact: 'anotation',
        prefix: 'this is an ',
        suffix: ' that has a'
      };
      
      const result = normalize_resource_selector(selector, undefined, mockFn);
      
      expect(mockFn).toHaveBeenCalledWith(['T6', selector], selector);
      expect(result).toEqual(['T6', selector]);
    });
  });
});