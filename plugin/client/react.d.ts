// Type declarations for SVG imports handled by @svg-jar/plugin with the React target.
//
// Add this to your project's tsconfig.json:
//
//   {
//     "compilerOptions": {
//       "types": ["@svg-jar/plugin/client/react"]
//     }
//   }
//
// The component type is exported by name from "@svg-jar/plugin/types/react".

declare module '*.svg' {
  import type { SvgComponent } from '@svg-jar/plugin/types/react';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?current-color' {
  import type { SvgComponent } from '@svg-jar/plugin/types/react';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?skip-current-color' {
  import type { SvgComponent } from '@svg-jar/plugin/types/react';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?unsafe-inline' {
  import type { SvgComponent } from '@svg-jar/plugin/types/react';

  const Component: SvgComponent;
  export default Component;
}

declare module '*.svg?file' {
  const url: string;
  export default url;
}
