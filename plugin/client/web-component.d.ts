// Type declarations for SVG imports handled by @svg-jar/plugin with the web-component target.
//
// Add this to your project's tsconfig.json:
//
//   {
//     "compilerOptions": {
//       "types": ["@svg-jar/plugin/client/web-component"]
//     }
//   }
//
// The component type is exported by name from "@svg-jar/plugin/types/web-component".

declare module '*.svg' {
  import type { SvgComponent } from '@svg-jar/plugin/types/web-component';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?current-color' {
  import type { SvgComponent } from '@svg-jar/plugin/types/web-component';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?skip-current-color' {
  import type { SvgComponent } from '@svg-jar/plugin/types/web-component';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?unsafe-inline' {
  import type { SvgComponent } from '@svg-jar/plugin/types/web-component';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?file' {
  const url: string;
  export default url;
}
