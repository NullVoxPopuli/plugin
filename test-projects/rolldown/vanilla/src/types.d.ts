declare module '*.svg?sprite=shapes' {
  import type { SvgComponent } from '@svg-jar/plugin/types/dom';

  const Component: SvgComponent;
  export default Component;
}
