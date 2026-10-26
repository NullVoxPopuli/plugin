import type { Config as SvgoConfig } from 'svgo';
import { DEFAULT_ROOT_ATTRIBUTES } from './constants.ts';

/** Supported framework targets for component generation. */
export type SvgJarTarget = 'dom' | 'ember' | 'react' | 'preact' | 'vue' | 'solid' | 'web-component';

/**
 * Plugin options for @svg-jar/plugin.
 */
export interface SvgJarOptions {
  /** Framework target for component generation. Default: `'dom'`. */
  target?: SvgJarTarget;

  /**
   * SVGO configuration.
   * - `true` (default): use baseline config with sensible defaults
   * - `false`: disable optimization entirely
   * - object: custom SVGO config, deep-merged with baseline
   */
  svgo?: boolean | SvgoConfig;

  /** Default sprite name for bare SVG imports. Default: `'sprite'`. */
  defaultSprite?: string;

  /** Replace non-`none` fill/stroke with `currentColor`. Default: `false`. */
  currentColor?: boolean;

  /**
   * Attributes to copy from the root `<svg>` of each source file to the
   * `<svg>` that the runtime renders. Attributes passed by the caller,
   * and CSS rules on the rendered `<svg>`, override them.
   *
   * The default list holds the presentation attributes that children
   * inherit, such as `fill`, `stroke` and `stroke-width`. A list given
   * here replaces the default list. An empty list copies nothing.
   *
   * @example
   * // Also copy aria-hidden from each source file
   * svgJar({ rootAttributes: ['fill', 'stroke', 'stroke-width', 'aria-hidden'] })
   */
  rootAttributes?: string[];

  /**
   * Sprite sheets to inline directly into the HTML document rather than
   * emit as external asset files (Vite only, via `transformIndexHtml`).
   *
   * Inlining keeps symbols in the same document as their `<use>` elements,
   * which is required for CSS animations (`@keyframes`), SMIL animations
   * (`<animate>`, `<animateMotion>`), and `@font-face` rules inside SVG
   * `<style>` tags to work correctly.
   *
   * - `true`: embed all sprite sheets
   * - `false` (default): emit all sprites as external files
   * - `string[]`: embed only the named sprites in the array
   *
   * @example
   * // Embed only the 'animated' sprite sheet
   * svgJar({ embedded: ['animated'] })
   *
   * @example
   * // Embed all sprite sheets
   * svgJar({ embedded: true })
   */
  embedded?: boolean | string[];

  /**
   * Base public path prepended to emitted asset URLs (sprite sheets and
   * `?file` assets), e.g. `'/vendor/icons/'`.
   *
   * Defaults to the bundler's base path in Vite (`base` from the resolved
   * config), and `'/'` in other bundlers. Set this when the build output
   * is served from a known non-root location - for example an internal
   * package built with Rolldown/tsdown whose `dist/assets` the consuming
   * app copies to a fixed public path.
   *
   * A trailing slash is added if missing.
   *
   * @example
   * // Emitted URLs become /vendor/icons/assets/sprite-<hash>.svg#<id>
   * svgJar({ base: '/vendor/icons/' })
   */
  base?: string;
}

/**
 * Fully resolved options with all fields required.
 */
export interface ResolvedOptions {
  target: SvgJarTarget;
  svgo: boolean | SvgoConfig;
  defaultSprite: string;
  currentColor: boolean;
  rootAttributes: string[];
  embedded: boolean | string[];
  /** Normalized base path (trailing slash ensured), or undefined to use the bundler default. */
  base: string | undefined;
}

/**
 * Merges user-provided options with defaults.
 *
 * @param options Raw user options.
 * @returns Fully resolved options with all defaults applied.
 */
export function resolveOptions(options: SvgJarOptions = {}): ResolvedOptions {
  return {
    target: options.target ?? 'dom',
    svgo: options.svgo ?? true,
    defaultSprite: options.defaultSprite ?? 'sprite',
    currentColor: options.currentColor ?? false,
    rootAttributes: options.rootAttributes ?? [...DEFAULT_ROOT_ATTRIBUTES],
    embedded: options.embedded ?? false,
    base: options.base == null ? undefined : options.base.endsWith('/') ? options.base : `${options.base}/`,
  };
}
