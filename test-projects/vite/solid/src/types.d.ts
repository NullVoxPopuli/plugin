declare module '*.svg?sprite=shapes' {
  import type { SvgComponent } from '@svg-jar/plugin/types/solid';

  const Component: SvgComponent;
  export default Component;
}
