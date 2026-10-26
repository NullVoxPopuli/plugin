import { h, type JSX } from 'preact';
import { useCallback } from 'preact/hooks';

type SvgProps = JSX.SVGAttributes<SVGSVGElement> & {
  children?: unknown;
};

/**
 * Creates a Preact component that renders an SVG sprite symbol via `<use href>`.
 * Used in production builds where SVGs are collected into sprite sheets.
 *
 * The component accepts all SVG attributes as props (class, aria-*, style, etc.)
 * and supports children for accessibility content like `<title>` and `<desc>`.
 *
 * @param viewBox The `viewBox` attribute for the `<svg>` element.
 * @param width   The `width` attribute, or `null` to omit.
 * @param height  The `height` attribute, or `null` to omit.
 * @param href    The sprite symbol reference (e.g. `/assets/sprite.svg#abc123`).
 * @param rootAttrs Attributes from the root of the source `<svg>`, or `null` if none.
 * @returns       A Preact function component.
 */
export const createSvg: (
  viewBox: string | null,
  width: string | null,
  height: string | null,
  href: string,
  rootAttrs?: Record<string, string> | null,
) => unknown = /*#__NO_SIDE_EFFECTS__*/ (viewBox, width, height, href, rootAttrs) => {
  const useEl = h('use', { href });

  return (props: SvgProps) => {
    const { children, ...rest } = props;
    return h(
      'svg',
      { viewBox: viewBox ?? undefined, width: width ?? undefined, height: height ?? undefined, ...rootAttrs, ...rest },
      children,
      useEl,
    );
  };
};

/**
 * Creates a Preact component that renders inline SVG markup.
 * Used in dev mode and for `?unsafe-inline` imports.
 *
 * The SVG markup is injected via a ref callback on a `<g>` element so
 * that children (like `<title>` and `<desc>`) can still be passed
 * alongside the markup.
 *
 * @param viewBox The `viewBox` attribute for the wrapper `<svg>`.
 * @param width   The `width` attribute, or `null` to omit.
 * @param height  The `height` attribute, or `null` to omit.
 * @param xml     The inner SVG markup string.
 * @param rootAttrs Attributes from the root of the source `<svg>`, or `null` if none.
 * @returns       A Preact function component.
 */
export const createSvgInline: (
  viewBox: string | null,
  width: string | null,
  height: string | null,
  xml: string,
  rootAttrs?: Record<string, string> | null,
) => unknown = /*#__NO_SIDE_EFFECTS__*/ (viewBox, width, height, xml, rootAttrs) => {
  return (props: SvgProps) => {
    const { children, ...rest } = props;
    const setMarkup = useCallback((node: SVGGElement | null) => {
      if (node) node.innerHTML = xml;
    }, []);

    return h(
      'svg',
      { viewBox: viewBox ?? undefined, width: width ?? undefined, height: height ?? undefined, ...rootAttrs, ...rest },
      children,
      h('g', { ref: setMarkup }),
    );
  };
};
