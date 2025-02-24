import { removeElementsByClassName, removeElementsByTagName, createElement, cloneNode } from '../utils/dom';
import { handlePageBreak } from '../utils/pageBreaks';
import { DomToPdfOptions } from '../types';

/**
 * Creates and manages the container for DOM-to-PDF conversion
 */
export class DomContainer {
  private container: HTMLElement;
  private overlay: HTMLElement;
  private originalElement: HTMLElement;
  private options: Required<Pick<DomToPdfOptions, 'excludeClassNames' | 'excludeTagNames' | 'overrideWidth'>>;
  private pageHeightPx: number;
  
  private static readonly A4_HEIGHT = 841.89;
  private static readonly A4_WIDTH = 595.28;
  
  /**
   * Create a new DomContainer
   * @param element The element to convert to PDF
   * @param options The options for conversion
   */
  constructor(element: HTMLElement, options: DomToPdfOptions = {}) {
    this.originalElement = element;
    this.options = {
      excludeClassNames: options.excludeClassNames || [],
      excludeTagNames: options.excludeTagNames || ['button', 'input', 'select'],
      overrideWidth: options.overrideWidth || 0
    };
    
    const { overlay, container } = this.createOverlayAndContainer();
    this.overlay = overlay;
    this.container = container;
    
    // Calculate page height
    const innerRatio = DomContainer.A4_HEIGHT / DomContainer.A4_WIDTH;
    const containerWidth = this.options.overrideWidth || this.container.getBoundingClientRect().width;
    this.pageHeightPx = Math.floor(containerWidth * innerRatio);
    
    // Setup the container
    this.setupContainer();
  }
  
  /**
   * Get the container element
   * @returns The container element
   */
  public getContainer(): HTMLElement {
    return this.container;
  }
  
  /**
   * Get the overlay element
   * @returns The overlay element
   */
  public getOverlay(): HTMLElement {
    return this.overlay;
  }
  
  /**
   * Get the page height in pixels
   * @returns The page height in pixels
   */
  public getPageHeightPx(): number {
    return this.pageHeightPx;
  }
  
  /**
   * Remove the overlay from the document
   */
  public remove(): void {
    document.body.removeChild(this.overlay);
  }
  
  /**
   * Create the overlay and container elements
   * @returns The overlay and container elements
   */
  private createOverlayAndContainer(): { overlay: HTMLElement, container: HTMLElement } {
    // Create overlay styles
    const overlayStyle: Record<string, string> = {
      position: 'fixed',
      zIndex: '1000',
      opacity: '0',
      left: '0',
      right: '0',
      bottom: '0',
      top: '0',
      backgroundColor: 'rgba(0,0,0,0.8)'
    };
    
    if (this.options.overrideWidth) {
      overlayStyle.width = `${this.options.overrideWidth}px`;
    }
    
    // Create container styles
    const containerStyle: Record<string, string> = {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      height: 'auto',
      margin: 'auto',
      overflow: 'auto',
      backgroundColor: 'white'
    };
    
    // Create elements
    const overlay = createElement('div', { style: overlayStyle });
    const container = createElement('div', { style: containerStyle });
    
    // Append cloned element to container
    container.appendChild(cloneNode(this.originalElement) as Node);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    
    return { overlay, container };
  }
  
  /**
   * Setup the container for PDF generation
   */
  private setupContainer(): void {
    // Remove excluded elements
    this.removeExcludedElements();
    
    // Handle page breaks
    this.handlePageBreaks();
  }
  
  /**
   * Remove excluded elements from the container
   */
  private removeExcludedElements(): void {
    const { excludeClassNames, excludeTagNames } = this.options;
    
    removeElementsByClassName(this.container, excludeClassNames);
    removeElementsByTagName(this.container, excludeTagNames);
  }
  
  /**
   * Handle page breaks for elements in the container
   */
  private handlePageBreaks(): void {
    const elements = this.container.querySelectorAll('*');
    
    Array.from(elements).forEach(element => {
      handlePageBreak(element, this.pageHeightPx);
    });
  }
}