import { createElement } from './dom';
import { PageBreakRules } from '../types';

/**
 * Handle page break for an element
 * @param element The element to handle page break for
 * @param pageHeightPx The height of a page in pixels
 */
export const handlePageBreak = (element: Element, pageHeightPx: number): void => {
  const rules: PageBreakRules = {
    before: false,
    after: false,
    avoid: true
  };
  
  const clientRect = element.getBoundingClientRect();
  
  if (rules.avoid && !rules.before) {
    const startPage = Math.floor(clientRect.top / pageHeightPx);
    const endPage = Math.floor(clientRect.bottom / pageHeightPx);
    const nPages = Math.abs(clientRect.bottom - clientRect.top) / pageHeightPx;
    
    // Turn on rules.before if the element is broken and is at most one page long
    if (endPage !== startPage && nPages <= 1) {
      rules.before = true;
    }
    
    // Before: Create a padding div to push the element to the next page
    if (rules.before) {
      const pad = createElement('div', {
        style: {
          display: 'block',
          height: `${pageHeightPx - (clientRect.top % pageHeightPx)}px`
        }
      });
      
      element.parentNode?.insertBefore(pad, element);
    }
  }
};