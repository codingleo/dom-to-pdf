import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createElement, applyStyles } from '../src/utils/dom';

describe('DOM Utils', () => {
  describe('createElement', () => {
    it('should create an element with the given tag name', () => {
      const el = createElement('div');
      expect(el.tagName).toBe('DIV');
    });

    it('should set className if provided', () => {
      const el = createElement('div', { className: 'test-class' });
      expect(el.className).toBe('test-class');
    });

    it('should apply styles if provided', () => {
      const el = createElement('div', {
        style: { color: 'red', fontSize: '12px' }
      });
      expect(el.style.color).toBe('red');
      expect(el.style.fontSize).toBe('12px');
    });
  });

  describe('applyStyles', () => {
    it('should apply styles to an element', () => {
      const el = createElement('div');
      applyStyles(el, {
        color: 'blue',
        backgroundColor: 'white'
      });
      expect(el.style.color).toBe('blue');
      expect(el.style.backgroundColor).toBe('white');
    });
  });
});