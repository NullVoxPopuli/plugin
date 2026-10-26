import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { optimizeSvg } from '../../src/svg/optimize.ts';
import { baselineSvgoConfig } from '../../src/index.ts';

const FIXTURES_DIR = path.join(import.meta.dirname, '..', '_fixtures');

function readFixture(name: string): string {
  return readFileSync(path.join(FIXTURES_DIR, name), 'utf-8');
}

describe('optimizeSvg', () => {
  describe('with baseline config (true)', () => {
    it('produces valid SVG output', () => {
      const input = readFixture('simple.svg');
      const output = optimizeSvg(input, true);

      expect(output).toContain('<svg');
      expect(output).toContain('<path');
    });

    it('preserves IDs', () => {
      const input = readFixture('nested-groups.svg');
      const output = optimizeSvg(input, true);

      expect(output).toContain('id="outer"');
      expect(output).toContain('id="inner"');
    });

    it('preserves viewBox', () => {
      const input = readFixture('simple.svg');
      const output = optimizeSvg(input, true);

      expect(output).toContain('viewBox="0 0 24 24"');
    });

    it('inlines CSS from <style> tags onto elements', () => {
      const input = readFixture('with-style-tag.svg');
      const output = optimizeSvg(input, true);

      // <style> tag should be removed
      expect(output).not.toContain('<style');

      // Classes should be removed (styles are inlined)
      expect(output).not.toContain('class=');

      // Styles should be inline on each element
      expect(output).toContain('fill:#e91e63');
      expect(output).toContain('fill:#2196f3');
      expect(output).toContain('stroke:#0d47a1');
      expect(output).toContain('fill:none');
      expect(output).toContain('stroke:#333');
    });

    it('strips title elements', () => {
      const input =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>My Icon</title><path d="M0 0"/></svg>';
      const output = optimizeSvg(input, true);

      expect(output).not.toContain('<title');
      expect(output).not.toContain('My Icon');
    });
  });

  describe('disabled (false)', () => {
    it('returns the input unchanged', () => {
      const input = readFixture('simple.svg');
      const output = optimizeSvg(input, false);

      expect(output).toBe(input);
    });
  });

  describe('baselineSvgoConfig', () => {
    it('is the config used when svgo is true', () => {
      const input = readFixture('source-order.svg');

      expect(optimizeSvg(input, { plugins: [...baselineSvgoConfig.plugins] })).toBe(optimizeSvg(input, true));
    });

    it('can be extended with more plugins', () => {
      const input = readFixture('with-dimensions.svg');
      const output = optimizeSvg(input, { plugins: [...baselineSvgoConfig.plugins, 'removeDimensions'] });

      // removeDimensions ran
      expect(output).not.toContain('width="24"');
      // The baseline cleanupIds settings still apply
      expect(optimizeSvg(readFixture('nested-groups.svg'), { plugins: [...baselineSvgoConfig.plugins] })).toContain(
        'id="outer"',
      );
    });

    it('cannot be changed by the caller', () => {
      expect(Object.isFrozen(baselineSvgoConfig)).toBe(true);
      expect(Object.isFrozen(baselineSvgoConfig.plugins)).toBe(true);
      expect(() => {
        (baselineSvgoConfig.plugins as unknown[]).push('removeDimensions');
      }).toThrow(TypeError);
    });
  });

  describe('with custom config', () => {
    it('applies the custom SVGO config', () => {
      const input =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- comment --><path d="M0 0"/></svg>';
      const output = optimizeSvg(input, {
        plugins: ['removeComments'],
      });

      expect(output).not.toContain('<!-- comment -->');
      expect(output).toContain('<path');
    });

    it('uses the custom config in place of the baseline, without merging', () => {
      const input =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>My Icon</title><path d="M0 0"/></svg>';
      const output = optimizeSvg(input, { plugins: ['removeComments'] });

      // The baseline removes <title>, so its presence shows the baseline did not run
      expect(output).toContain('<title>My Icon</title>');
    });
  });
});
