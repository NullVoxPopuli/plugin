// Named types for SVG imports handled by @svg-jar/plugin with the Preact target.
//
//   import type { SvgComponent } from '@svg-jar/plugin/types/preact';
//
// This file only exports types. To type the `*.svg` imports themselves, add
// "@svg-jar/plugin/client/preact" to "types" in your tsconfig.json.

import type { FunctionComponent, JSX } from 'preact';

/** Preact component that renders an SVG import. */
export type SvgComponent = FunctionComponent<JSX.SVGAttributes<SVGSVGElement>>;
