declare module '*.svg?sprite=shapes' {
  import type { SvgOptions } from '@svg-jar/plugin/runtime/dom';

  const component: (options?: SvgOptions) => SVGSVGElement;
  export default component;
}

declare module '*.svg?sprite=animated' {
  import type { SvgOptions } from '@svg-jar/plugin/runtime/dom';

  const component: (options?: SvgOptions) => SVGSVGElement;
  export default component;
}

declare module '*.svg?sprite=fonts' {
  import type { SvgOptions } from '@svg-jar/plugin/runtime/dom';

  const component: (options?: SvgOptions) => SVGSVGElement;
  export default component;
}
