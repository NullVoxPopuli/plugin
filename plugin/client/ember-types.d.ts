// Named types for SVG imports handled by @svg-jar/plugin with the Ember target.
//
//   import type { SvgComponent } from '@svg-jar/plugin/types/ember';
//
// This file only exports types. To type the `*.svg` imports themselves, add
// "@svg-jar/plugin/client/ember" to "types" in your tsconfig.json.

import type { ComponentLike } from '@glint/template';

/** Ember component that renders an SVG import. */
export type SvgComponent = ComponentLike<{
  Element: SVGSVGElement;
  Blocks: {
    default: [];
  };
}>;
