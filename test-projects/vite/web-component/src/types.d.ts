declare module '*.svg?sprite=shapes' {
  import type { SvgComponent } from '@svg-jar/plugin/types/web-component';

  const Component: SvgComponent;
  export default Component;
}
