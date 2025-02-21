declare module 'html-to-pdf-js' {
  interface PdfOptions {
    /**
     * The filename for the downloaded PDF
     */
    filename: string

    /**
     * Class names to exclude from the PDF
     * @default []
     */
    excludeClassNames?: string[]

    /**
     * HTML tag names to exclude from the PDF
     * @default ['button', 'input', 'select']
     */
    excludeTagNames?: string[]

    /**
     * Override the width of the container
     */
    overrideWidth?: number

    /**
     * Proxy URL for loading external resources
     */
    proxyUrl?: string

    /**
     * PDF compression type
     * @default 'NONE'
     */
    compression?: string

    /**
     * Scale factor for the PDF
     */
    scale?: number

    /**
     * Output format of the result
     * @default 'pdf'
     */
    output?: 'pdf' | 'blob' | 'base64'
  }

  /**
   * Converts a DOM element to PDF and handles the download
   * @param dom - The DOM element to convert
   * @param options - Configuration options for the PDF conversion
   * @param cb - Optional callback function that receives the jsPDF instance
   * @returns Promise that resolves with different types based on output option:
   * - 'pdf': void (triggers download)
   * - 'blob': Blob
   * - 'base64': string
   * - default: jsPDF instance
   */
  function downloadPdf(
    dom: HTMLElement,
    options: PdfOptions,
    cb?: (pdf: any | null) => void
  ): Promise<void | Blob | string | any>

  export = downloadPdf
}