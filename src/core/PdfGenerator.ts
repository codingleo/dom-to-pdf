import { jsPDF } from 'jspdf';
import { drawPdfPage } from '../utils/canvas';
import { DomToPdfCallback, DomToPdfOptions, FilterElement, PdfResult } from '../types';

// Use require instead of import for dom-to-image to avoid type issues
const domToImage = require('dom-to-image');

/**
 * PDF Generator class that handles PDF creation
 */
export class PdfGenerator {
  private static readonly A4_HEIGHT = 841.89;
  private static readonly A4_WIDTH = 595.28;
  
  private options: Required<DomToPdfOptions>;
  private container: HTMLElement;
  private callback?: DomToPdfCallback;
  
  /**
   * Create a new PdfGenerator
   * @param container The container element to generate PDF from
   * @param options The options for PDF generation
   * @param callback The callback to call when PDF is generated
   */
  constructor(container: HTMLElement, options: DomToPdfOptions = {}, callback?: DomToPdfCallback) {
    this.container = container;
    this.callback = callback;
    
    // Set default options
    this.options = {
      filename: options.filename || 'generated.pdf',
      excludeClassNames: options.excludeClassNames || [],
      excludeTagNames: options.excludeTagNames || ['button', 'input', 'select'],
      overrideWidth: options.overrideWidth || 0,
      proxyUrl: options.proxyUrl || '',
      compression: options.compression || 'NONE',
      scale: options.scale || 0,
      output: options.output || 'pdf'
    };
  }
  
  /**
   * Generate the PDF from the container
   * @returns A promise that resolves to the PDF result
   */
  public async generate(): Promise<PdfResult> {
    try {
      const canvas = await this.generateCanvas();
      return this.generatePdfFromCanvas(canvas);
    } catch (error) {
      if (this.callback) {
        this.callback(null);
      }
      console.error(error);
      return null;
    }
  }
  
  /**
   * Generate a canvas from the container
   * @returns A promise that resolves to the canvas
   */
  private async generateCanvas(): Promise<HTMLCanvasElement> {
    const opts = this.createDomToImageOptions();
    return domToImage.toCanvas(this.container, opts);
  }
  
  /**
   * Create options for dom-to-image
   * @returns The options for dom-to-image
   */
  private createDomToImageOptions(): any {
    const opts: any = {
      filter: this.createFilterFunction(),
      proxy: this.options.proxyUrl
    };
    
    if (this.options.scale) {
      const offsetWidth = this.container.offsetWidth;
      const offsetHeight = this.container.offsetHeight;
      
      const style = {
        transform: `scale(${this.options.scale})`,
        transformOrigin: 'top left',
        width: `${offsetWidth}px`,
        height: `${offsetHeight}px`
      };
      
      const scaleObj = {
        width: offsetWidth * this.options.scale,
        height: offsetHeight * this.options.scale,
        quality: 1,
        style
      };
      
      Object.assign(opts, scaleObj);
    }
    
    return opts;
  }
  
  /**
   * Create a filter function for dom-to-image
   * @returns The filter function
   */
  private createFilterFunction(): (element: FilterElement) => boolean {
    const { excludeClassNames, excludeTagNames } = this.options;
    
    return ({ classList, tagName }: FilterElement): boolean => {
      if (classList) {
        for (const className of excludeClassNames) {
          if (Array.prototype.indexOf.call(classList, className) >= 0) {
            return false;
          }
        }
      }
      
      const tag = tagName?.toLowerCase();
      return tag ? excludeTagNames.indexOf(tag) < 0 : true;
    };
  }
  
  /**
   * Generate a PDF from a canvas
   * @param canvas The canvas to generate PDF from
   * @returns The PDF result
   */
  private generatePdfFromCanvas(canvas: HTMLCanvasElement): PdfResult {
    const { A4_WIDTH, A4_HEIGHT } = PdfGenerator;
    const { compression, filename, output } = this.options;
    
    // Calculate container dimensions
    const containerWidth = this.options.overrideWidth || this.container.getBoundingClientRect().width;
    const pageHeightPx = Math.floor(containerWidth * (A4_HEIGHT / A4_WIDTH));
    
    // Initialize the PDF
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'a4'
    });
    
    // Calculate pages
    const pxFullHeight = canvas.height;
    const nPages = Math.ceil(pxFullHeight / pageHeightPx);
    
    // Page canvas for drawing each page
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = pageHeightPx;
    
    // Process each page
    for (let page = 0; page < nPages; page++) {
      // Adjust height for last page if needed
      let pageHeight = A4_HEIGHT;
      
      if (page === nPages - 1 && pxFullHeight % pageHeightPx !== 0) {
        pageCanvas.height = pxFullHeight % pageHeightPx;
        pageHeight = (pageCanvas.height * A4_WIDTH) / pageCanvas.width;
      }
      
      // Draw page and skip if blank
      const isNotBlank = drawPdfPage(canvas, page, pageCanvas, pageHeightPx);
      
      if (!isNotBlank) {
        continue;
      }
      
      // Add new page if not the first page
      if (page > 0) {
        pdf.addPage();
      }
      
      // Add image to PDF
      const imgData = pageCanvas.toDataURL('image/PNG');
      pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH, pageHeight, undefined, compression);
    }
    
    // Call callback if provided
    if (this.callback) {
      this.callback(pdf);
    }
    
    // Handle different output formats
    if (output === 'blob') {
      return pdf.output('blob');
    }
    
    if (output === 'base64') {
      return pdf.output('datauristring');
    }
    
    if (output === 'pdf') {
      return pdf.save(filename);
    }
    
    return pdf;
  }
}