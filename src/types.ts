import { jsPDF } from 'jspdf';

// Custom type definitions for dom-to-image (we'll use require() instead of import in the code)
export interface DomToImageOptions {
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

export interface DomToPdfOptions {
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

export type PdfResult = jsPDF | Blob | string | null;

export type DomToPdfCallback = (result: PdfResult) => void;

export interface ElementStyle {
  [key: string]: string;
}

export interface ElementOptions {
  className?: string;
  innerHTML?: string;
  style?: ElementStyle;
}

export interface PageBreakRules {
  before: boolean;
  after: boolean;
  avoid: boolean;
}

export interface FilterElement {
  classList?: DOMTokenList;
  tagName?: string;
}