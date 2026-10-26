/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
// @ts-expect-error react is a peer dependency provided by the consuming app
import { createElement, useCallback } from 'react';

/**
 * Converts attribute names to the camelCase prop names React expects,
 * e.g. `stroke-width` to `strokeWidth`. React keeps `aria-*` and `data-*`
 * hyphenated.
 */
function toReactProps(rootAttrs: Record<string, string> | null | undefined): Record<string, string> {
  const props: Record<string, string> = {};
  for (const [key, value] of Object.entries(rootAttrs ?? {})) {
    const name = /^(aria|data)-/.test(key) ? key : key.replace(/[-:]([a-z])/g, (_, c: string) => c.toUpperCase());
    props[name] = value;
  }
  return props;
}

/**
 * Creates a React component that renders an SVG sprite symbol via `<use href>`.
 * Used in production builds where SVGs are collected into sprite sheets.
 *
 * The component accepts all SVG attributes as props (className, aria-*, style, etc.)
 * and supports children for accessibility content like `<title>` and `<desc>`.
 *
 * @param viewBox The `viewBox` attribute for the `<svg>` element.
 * @param width   The `width` attribute, or `null` to omit.
 * @param height  The `height` attribute, or `null` to omit.
 * @param href    The sprite symbol reference (e.g. `/assets/sprite.svg#abc123`).
 * @param rootAttrs Attributes from the root of the source `<svg>`, or `null` if none.
 * @returns       A React function component.
 */
export const createSvg: (
  viewBox: string | null,
  width: string | null,
  height: string | null,
  href: string,
  rootAttrs?: Record<string, string> | null,
) => (props: unknown) => Record<string, unknown> = /*#__NO_SIDE_EFFECTS__*/ (
  viewBox,
  width,
  height,
  href,
  rootAttrs,
) => {
  const useEl = createElement('use', { href });
  const rootProps = toReactProps(rootAttrs);

  return (props: unknown) => {
    const { children, ...rest } = props as Record<string, unknown>;
    return createElement(
      'svg',
      { viewBox: viewBox ?? undefined, width: width ?? undefined, height: height ?? undefined, ...rootProps, ...rest },
      children,
      useEl,
    );
  };
};

/**
 * Creates a React component that renders inline SVG markup.
 * Used in dev mode and for `?unsafe-inline` imports.
 *
 * The SVG markup is injected via a ref callback on a `<g>` wrapper
 * so that children (like `<title>` and `<desc>`) can still be passed
 * alongside the markup.
 *
 * @param viewBox The `viewBox` attribute for the wrapper `<svg>`.
 * @param width   The `width` attribute, or `null` to omit.
 * @param height  The `height` attribute, or `null` to omit.
 * @param xml     The inner SVG markup string.
 * @param rootAttrs Attributes from the root of the source `<svg>`, or `null` if none.
 * @returns       A React function component.
 */
export const createSvgInline: (
  viewBox: string | null,
  width: string | null,
  height: string | null,
  xml: string,
  rootAttrs?: Record<string, string> | null,
) => (props: unknown) => Record<string, unknown> = /*#__NO_SIDE_EFFECTS__*/ (
  viewBox,
  width,
  height,
  xml,
  rootAttrs,
) => {
  const rootProps = toReactProps(rootAttrs);

  return (props: unknown) => {
    const { children, ...rest } = props as Record<string, unknown>;
    const setMarkup = useCallback((node: SVGGElement | null) => {
      if (node) node.innerHTML = xml;
    }, []);

    return createElement(
      'svg',
      { viewBox: viewBox ?? undefined, width: width ?? undefined, height: height ?? undefined, ...rootProps, ...rest },
      children,
      createElement('g', { ref: setMarkup }),
    );
  };
};
