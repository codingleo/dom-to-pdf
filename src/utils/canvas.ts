/**
 * Check if canvas is blank
 * @param canvas The canvas to check
 * @returns Whether the canvas is blank
 */
export const isCanvasBlank = (canvas: HTMLCanvasElement): boolean => {
  const blank = document.createElement('canvas');
  blank.width = canvas.width;
  blank.height = canvas.height;
  const ctx = blank.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, blank.width, blank.height);
  }
  
  return canvas.toDataURL() === blank.toDataURL();
};

/**
 * Draw a page of the PDF from the source canvas
 * @param sourceCanvas The source canvas
 * @param pageNumber The page number
 * @param pageCanvas The canvas for the page
 * @param pageHeightPx The height of the page in pixels
 * @returns Whether the page is blank
 */
export const drawPdfPage = (
  sourceCanvas: HTMLCanvasElement,
  pageNumber: number,
  pageCanvas: HTMLCanvasElement,
  pageHeightPx: number
): boolean => {
  const pageCtx = pageCanvas.getContext('2d');
  
  if (!pageCtx) {
    throw new Error('Could not get canvas context');
  }
  
  const w = pageCanvas.width;
  const h = pageCanvas.height;
  
  pageCtx.fillStyle = 'white';
  pageCtx.fillRect(0, 0, w, h);
  pageCtx.drawImage(sourceCanvas, 0, pageNumber * pageHeightPx, w, h, 0, 0, w, h);
  
  return !isCanvasBlank(pageCanvas);
};