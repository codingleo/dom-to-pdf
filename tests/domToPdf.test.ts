import { describe, it, expect, vi, beforeEach } from 'vitest';
import { domToPdf } from '../src';

// Mock dependencies
vi.mock('../src/core/PdfGenerator', () => {
  return {
    PdfGenerator: vi.fn().mockImplementation(() => ({
      generate: vi.fn().mockResolvedValue({})
    }))
  };
});

vi.mock('../src/core/DomContainer', () => {
  return {
    DomContainer: vi.fn().mockImplementation(() => ({
      getContainer: vi.fn().mockReturnValue(document.createElement('div')),
      remove: vi.fn()
    }))
  };
});

describe('domToPdf', () => {
  let element: HTMLElement;
  
  beforeEach(() => {
    element = document.createElement('div');
    vi.clearAllMocks();
  });
  
  it('should create a DomContainer and PdfGenerator', async () => {
    const { DomContainer } = await import('../src/core/DomContainer');
    const { PdfGenerator } = await import('../src/core/PdfGenerator');
    
    await domToPdf(element, {
      filename: 'test.pdf',
      output: 'pdf'
    });
    
    expect(DomContainer).toHaveBeenCalledWith(element, expect.anything());
    expect(PdfGenerator).toHaveBeenCalled();
  });
  
  it('should handle errors and call the callback with null', async () => {
    const { DomContainer } = await import('../src/core/DomContainer');
    
    // Mock the DomContainer to throw an error
    vi.mocked(DomContainer).mockImplementationOnce(() => {
      throw new Error('Test error');
    });
    
    const callback = vi.fn();
    const result = await domToPdf(element, {}, callback);
    
    expect(callback).toHaveBeenCalledWith(null);
    expect(result).toBeNull();
  });
  
  it('should pass options to PdfGenerator', async () => {
    const { PdfGenerator } = await import('../src/core/PdfGenerator');
    
    const options = {
      filename: 'custom.pdf',
      excludeClassNames: ['hidden'],
      output: 'blob'
    };
    
    await domToPdf(element, options);
    
    expect(PdfGenerator).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining(options),
      undefined
    );
  });
});