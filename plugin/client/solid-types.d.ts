// Named types for SVG imports handled by @svg-jar/plugin with the Solid target.
//
//   import type { SvgComponent } from '@svg-jar/plugin/types/solid';
//
// This file only exports types. To type the `*.svg` imports themselves, add
// "@svg-jar/plugin/client/solid" to "types" in your tsconfig.json.

import type { Component, JSX, ParentProps } from 'solid-js';

/** Solid component that renders an SVG import. */
export type SvgComponent = Component<ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>>>;
