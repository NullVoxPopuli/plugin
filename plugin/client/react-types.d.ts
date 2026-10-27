// Named types for SVG imports handled by @svg-jar/plugin with the React target.
//
//   import type { SvgComponent } from '@svg-jar/plugin/types/react';
//
// This file only exports types. To type the `*.svg` imports themselves, add
// "@svg-jar/plugin/client/react" to "types" in your tsconfig.json.

import type { FC, SVGAttributes, ReactNode } from 'react';

/** React component that renders an SVG import. */
export type SvgComponent = FC<SVGAttributes<SVGSVGElement> & { children?: ReactNode }>;
