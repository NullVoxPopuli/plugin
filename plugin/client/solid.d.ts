// Type declarations for SVG imports handled by @svg-jar/plugin with the Solid target.
//
// Add this to your project's tsconfig.json:
//
//   {
//     "compilerOptions": {
//       "types": ["@svg-jar/plugin/client/solid"]
//     }
//   }
//
// The component type is exported by name from "@svg-jar/plugin/types/solid".

declare module '*.svg' {
  import type { SvgComponent } from '@svg-jar/plugin/types/solid';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?current-color' {
  import type { SvgComponent } from '@svg-jar/plugin/types/solid';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?skip-current-color' {
  import type { SvgComponent } from '@svg-jar/plugin/types/solid';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?unsafe-inline' {
  import type { SvgComponent } from '@svg-jar/plugin/types/solid';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?file' {
  const url: string;
  export default url;
}
