declare module '*.svg?sprite=shapes' {
  import type { SvgComponent } from '@svg-jar/plugin/types/dom';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?sprite=animated' {
  import type { SvgComponent } from '@svg-jar/plugin/types/dom';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?sprite=fonts' {
  import type { SvgComponent } from '@svg-jar/plugin/types/dom';

  const Component: SvgComponent;
  export default Component;
}
