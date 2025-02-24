import { jsPDF } from 'jspdf';

interface DomToImageOptions {
    filter?: (node: Node) => boolean;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
    quality?: number;
    scale?: number;
    imagePlaceholder?: string;
    proxy?: string;
}
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
type PdfResult = jsPDF | Blob | string | null;
type DomToPdfCallback = (result: PdfResult) => void;
interface ElementStyle {
    [key: string]: string;
}
interface ElementOptions {
    className?: string;
    innerHTML?: string;
    style?: ElementStyle;
}
interface PageBreakRules {
    before: boolean;
    after: boolean;
    avoid: boolean;
}
interface FilterElement {
    classList?: DOMTokenList;
    tagName?: string;
}

/**
 * Clone a DOM node
 * @param node The node to clone
 * @param javascriptEnabled Whether to enable JavaScript in the cloned node
 * @returns The cloned node
 */
declare const cloneNode: (node: Node, javascriptEnabled?: boolean) => Node;
/**
 * Create an element with the given properties
 * @param tagName The tag name of the element to create
 * @param options The options for the element
 * @returns The created element
 */
declare const createElement: (tagName: string, options?: ElementOptions) => HTMLElement;
/**
 * Apply styles to an element
 * @param element The element to apply styles to
 * @param styles The styles to apply
 */
declare const applyStyles: (element: HTMLElement, styles: ElementStyle) => void;
/**
 * Remove elements by class name
 * @param container The container element
 * @param classNames The class names to remove
 */
declare const removeElementsByClassName: (container: HTMLElement, classNames: string[]) => void;
/**
 * Remove elements by tag name
 * @param container The container element
 * @param tagNames The tag names to remove
 */
declare const removeElementsByTagName: (container: HTMLElement, tagNames: string[]) => void;

/**
 * Check if canvas is blank
 * @param canvas The canvas to check
 * @returns Whether the canvas is blank
 */
declare const isCanvasBlank: (canvas: HTMLCanvasElement) => boolean;
/**
 * Draw a page of the PDF from the source canvas
 * @param sourceCanvas The source canvas
 * @param pageNumber The page number
 * @param pageCanvas The canvas for the page
 * @param pageHeightPx The height of the page in pixels
 * @returns Whether the page is blank
 */
declare const drawPdfPage: (sourceCanvas: HTMLCanvasElement, pageNumber: number, pageCanvas: HTMLCanvasElement, pageHeightPx: number) => boolean;

/**
 * PDF Generator class that handles PDF creation
 */
declare class PdfGenerator {
    private static readonly A4_HEIGHT;
    private static readonly A4_WIDTH;
    private options;
    private container;
    private callback?;
    /**
     * Create a new PdfGenerator
     * @param container The container element to generate PDF from
     * @param options The options for PDF generation
     * @param callback The callback to call when PDF is generated
     */
    constructor(container: HTMLElement, options?: DomToPdfOptions, callback?: DomToPdfCallback);
    /**
     * Generate the PDF from the container
     * @returns A promise that resolves to the PDF result
     */
    generate(): Promise<PdfResult>;
    /**
     * Generate a canvas from the container
     * @returns A promise that resolves to the canvas
     */
    private generateCanvas;
    /**
     * Create options for dom-to-image
     * @returns The options for dom-to-image
     */
    private createDomToImageOptions;
    /**
     * Create a filter function for dom-to-image
     * @returns The filter function
     */
    private createFilterFunction;
    /**
     * Generate a PDF from a canvas
     * @param canvas The canvas to generate PDF from
     * @returns The PDF result
     */
    private generatePdfFromCanvas;
}

/**
 * Creates and manages the container for DOM-to-PDF conversion
 */
declare class DomContainer {
    private container;
    private overlay;
    private originalElement;
    private options;
    private pageHeightPx;
    private static readonly A4_HEIGHT;
    private static readonly A4_WIDTH;
    /**
     * Create a new DomContainer
     * @param element The element to convert to PDF
     * @param options The options for conversion
     */
    constructor(element: HTMLElement, options?: DomToPdfOptions);
    /**
     * Get the container element
     * @returns The container element
     */
    getContainer(): HTMLElement;
    /**
     * Get the overlay element
     * @returns The overlay element
     */
    getOverlay(): HTMLElement;
    /**
     * Get the page height in pixels
     * @returns The page height in pixels
     */
    getPageHeightPx(): number;
    /**
     * Remove the overlay from the document
     */
    remove(): void;
    /**
     * Create the overlay and container elements
     * @returns The overlay and container elements
     */
    private createOverlayAndContainer;
    /**
     * Setup the container for PDF generation
     */
    private setupContainer;
    /**
     * Remove excluded elements from the container
     */
    private removeExcludedElements;
    /**
     * Handle page breaks for elements in the container
     */
    private handlePageBreaks;
}

/**
 * Generate a PDF from a DOM element
 * @param element The element to generate PDF from
 * @param options The options for PDF generation
 * @param callback Optional callback function that receives the generated PDF
 * @returns A promise that resolves to the generated PDF
 */
declare const domToPdf: (element: HTMLElement, options?: DomToPdfOptions, callback?: DomToPdfCallback) => Promise<PdfResult>;

export { DomContainer, type DomToImageOptions, type DomToPdfCallback, type DomToPdfOptions, type ElementOptions, type ElementStyle, type FilterElement, type PageBreakRules, PdfGenerator, type PdfResult, applyStyles, cloneNode, createElement, domToPdf as default, domToPdf, drawPdfPage, isCanvasBlank, removeElementsByClassName, removeElementsByTagName };
