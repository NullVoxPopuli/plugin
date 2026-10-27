// Named types for SVG imports handled by @svg-jar/plugin with the web-component target.
//
//   import type { SvgComponent } from '@svg-jar/plugin/types/web-component';
//
// This file only exports types. To type the `*.svg` imports themselves, add
// "@svg-jar/plugin/client/web-component" to "types" in your tsconfig.json.

/** Custom element class to register with customElements.define(). */
export type SvgComponent = typeof HTMLElement;
