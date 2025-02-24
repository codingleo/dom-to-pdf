import { ElementOptions, ElementStyle } from '../types';

/**
 * Clone a DOM node
 * @param node The node to clone
 * @param javascriptEnabled Whether to enable JavaScript in the cloned node
 * @returns The cloned node
 */
export const cloneNode = (node: Node, javascriptEnabled = false): Node => {
  let child: Node | null;
  let clone: Node;
  
  clone = node.nodeType === 3 
    ? document.createTextNode((node as Text).nodeValue || '') 
    : (node as Element).cloneNode(false);
  
  child = node.firstChild;
  
  while (child) {
    if (javascriptEnabled === true || child.nodeType !== 1 || (child as Element).nodeName !== 'SCRIPT') {
      clone.appendChild(cloneNode(child, javascriptEnabled));
    }
    child = child.nextSibling;
  }
  
  if (node.nodeType === 1) {
    if ((node as Element).nodeName === 'CANVAS') {
      const canvas = node as HTMLCanvasElement;
      const cloneCanvas = clone as HTMLCanvasElement;
      cloneCanvas.width = canvas.width;
      cloneCanvas.height = canvas.height;
      cloneCanvas.getContext('2d')?.drawImage(canvas, 0, 0);
    } else if ((node as Element).nodeName === 'TEXTAREA' || (node as Element).nodeName === 'SELECT') {
      (clone as HTMLTextAreaElement | HTMLSelectElement).value = (node as HTMLTextAreaElement | HTMLSelectElement).value;
    }
    
    clone.addEventListener('load', () => {
      (clone as Element).scrollTop = (node as Element).scrollTop;
      (clone as Element).scrollLeft = (node as Element).scrollLeft;
    }, true);
  }
  
  return clone;
};

/**
 * Create an element with the given properties
 * @param tagName The tag name of the element to create
 * @param options The options for the element
 * @returns The created element
 */
export const createElement = (tagName: string, options: ElementOptions = {}): HTMLElement => {
  const { className, innerHTML, style } = options;
  const el = document.createElement(tagName);
  
  if (className) {
    el.className = className;
  }
  
  if (innerHTML) {
    el.innerHTML = innerHTML;
    const scripts = el.getElementsByTagName('script');
    let i = scripts.length;
    
    while (i-- > 0) {
      scripts[i].parentNode?.removeChild(scripts[i]);
    }
  }
  
  if (style) {
    applyStyles(el, style);
  }
  
  return el;
};

/**
 * Apply styles to an element
 * @param element The element to apply styles to
 * @param styles The styles to apply
 */
export const applyStyles = (element: HTMLElement, styles: ElementStyle): void => {
  Object.keys(styles).forEach(key => {
    element.style[key as any] = styles[key];
  });
};

/**
 * Remove elements by class name
 * @param container The container element
 * @param classNames The class names to remove
 */
export const removeElementsByClassName = (container: HTMLElement, classNames: string[]): void => {
  classNames.forEach(className => {
    container.querySelectorAll(`.${className}`).forEach(el => el.remove());
  });
};

/**
 * Remove elements by tag name
 * @param container The container element
 * @param tagNames The tag names to remove
 */
export const removeElementsByTagName = (container: HTMLElement, tagNames: string[]): void => {
  tagNames.forEach(tagName => {
    const elements = container.getElementsByTagName(tagName);
    
    for (let i = elements.length - 1; i >= 0; i--) {
      if (elements[i]) {
        elements[i].parentNode?.removeChild(elements[i]);
      }
    }
  });
};