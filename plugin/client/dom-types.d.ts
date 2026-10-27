// Named types for SVG imports handled by @svg-jar/plugin with the DOM target.
//
//   import type { SvgComponent } from '@svg-jar/plugin/types/dom';
//
// This file only exports types. To type the `*.svg` imports themselves, add
// "@svg-jar/plugin/client/dom" to "types" in your tsconfig.json.

/**
 * Options for the rendered SVG element. `title` and `desc` create child
 * elements for accessibility. Any other property is set as an attribute on
 * the `<svg>` element.
 */
export interface SvgOptions {
  /** Creates a `<title>` child element for accessibility. */
  title?: string;
  /** Creates a `<desc>` child element for accessibility. */
  desc?: string;
  /** Any other properties are set as attributes on the `<svg>` element. */
  [attr: string]: string | undefined;
}

/** Factory function that creates a new SVG DOM element on each call. */
export type SvgComponent = (options?: SvgOptions) => SVGSVGElement;
