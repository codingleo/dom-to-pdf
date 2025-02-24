import { DomContainer } from './core/DomContainer';
import { PdfGenerator } from './core/PdfGenerator';
import { DomToPdfCallback, DomToPdfOptions, PdfResult } from './types';

/**
 * Generate a PDF from a DOM element
 * @param element The element to generate PDF from
 * @param options The options for PDF generation
 * @param callback Optional callback function that receives the generated PDF
 * @returns A promise that resolves to the generated PDF
 */
const domToPdf = async (
  element: HTMLElement,
  options: DomToPdfOptions = {},
  callback?: DomToPdfCallback
): Promise<PdfResult> => {
  try {
    // Create container
    const domContainer = new DomContainer(element, options);
    
    // Generate PDF
    const pdfGenerator = new PdfGenerator(domContainer.getContainer(), options, callback);
    const result = await pdfGenerator.generate();
    
    // Clean up
    domContainer.remove();
    
    return result;
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (callback) {
      callback(null);
    }
    return null;
  }
};

export default domToPdf;
export { domToPdf };
export * from './types';
export * from './utils/dom';
export * from './utils/canvas';
export * from './core/PdfGenerator';
export * from './core/DomContainer';