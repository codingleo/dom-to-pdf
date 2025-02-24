declare module 'dom-to-pdf-magic' {
  interface DomToPdfOptions {
    /**
     * Name of the resulted PDF file, default name is 'generated.pdf'
     */
    filename?: string;
    
    /**
     * List of class names of elements to exclude from PDF
     */
    excludeClassNames?: string[];
    
    /**
     * List of html tags to exclude from PDF
     */
    excludeTagNames?: string[];
    
    /**
     * Overrides the width of a container DOM element
     */
    overrideWidth?: number;
    
    /**
     * A route in your app which renders images on your domain to avoid CORS issues
     */
    proxyUrl?: string;
    
    /**
     * Compression of the generated image, can have the values 'NONE', 'FAST', 'MEDIUM' and 'SLOW'
     */
    compression?: 'NONE' | 'FAST' | 'MEDIUM' | 'SLOW';
    
    /**
     * Increases an image's size before exporting to improve the image quality
     */
    scale?: number;
    
    /**
     * Output format of the generated document
     */
    output?: 'pdf' | 'blob' | 'base64';
  }

  type PdfResult = any; // This will be the jsPDF instance or output depending on options

  /**
   * Generate a PDF from a DOM element
   * @param element The element to generate PDF from
   * @param options The options for PDF generation
   * @param callback Optional callback function that receives the generated PDF
   * @returns A promise that resolves to the generated PDF
   */
  function domToPdf(
    element: HTMLElement,
    options?: DomToPdfOptions,
    callback?: (result: PdfResult) => void
  ): Promise<PdfResult>;

  export = domToPdf;
}