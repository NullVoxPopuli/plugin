import { optimize, type Config as SvgoConfig, type PluginConfig } from 'svgo';

export type { Config as SvgoConfig } from 'svgo';

/** Freezes an object and every object inside it. */
function deepFreeze<T extends object>(value: T): T {
  for (const child of Object.values(value)) {
    if (typeof child === 'object' && child !== null) deepFreeze(child);
  }
  return Object.freeze(value);
}

/**
 * Baseline SVGO configuration used when `svgo: true` (the default).
 *
 * Preserves IDs (needed for sprite symbol references), path data
 * precision, numeric values, and hidden elements. Strips `<title>`
 * elements since they cause tooltip issues in browsers.
 *
 * A custom `svgo` config replaces this one. To extend it, copy its plugins
 * into the custom config. It is frozen so that changes made by one caller
 * cannot change the default for every build.
 *
 * @example
 *   svgJar({ svgo: { plugins: [...baselineSvgoConfig.plugins, 'removeDimensions'] } })
 */
export const baselineSvgoConfig: { readonly plugins: readonly PluginConfig[] } = deepFreeze({
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: { minify: false, remove: false },
          convertPathData: false,
          removeHiddenElems: false,
          cleanupNumericValues: false,
        },
      },
    },
    'removeTitle',
  ],
});

/**
 * Optimizes an SVG string using SVGO.
 *
 * @param svg    The raw SVG string to optimize.
 * @param config Controls optimization behavior:
 *               - `true`:  use `baselineSvgoConfig` (default)
 *               - `false`: return the SVG unchanged
 *               - object:  custom SVGO config (used as-is, not merged)
 * @returns The optimized SVG string.
 *
 * @example
 *   optimizeSvg('<svg>...</svg>', true)   // baseline optimization
 *   optimizeSvg('<svg>...</svg>', false)  // no-op, returns input
 *   optimizeSvg('<svg>...</svg>', { plugins: ['removeComments'] })
 */
export function optimizeSvg(svg: string, config: boolean | SvgoConfig): string {
  if (config === false) {
    return svg;
  }

  const svgoConfig = config === true ? { plugins: [...baselineSvgoConfig.plugins] } : config;
  const result = optimize(svg, svgoConfig);
  return result.data;
}
