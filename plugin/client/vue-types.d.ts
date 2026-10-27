// Named types for SVG imports handled by @svg-jar/plugin with the Vue target.
//
//   import type { SvgComponent } from '@svg-jar/plugin/types/vue';
//
// This file only exports types. To type the `*.svg` imports themselves, add
// "@svg-jar/plugin/client/vue" to "types" in your tsconfig.json.

import type { Component } from 'vue';

/** Vue component that renders an SVG import. */
export type SvgComponent = Component;
