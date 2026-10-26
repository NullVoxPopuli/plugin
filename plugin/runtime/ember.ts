// @ts-expect-error @ember/template-compiler is a peer dependency provided by the consuming Ember app
import { template } from '@ember/template-compiler';
// @ts-expect-error @ember/modifier is provided by the consuming Ember app
import { capabilities, setModifierManager } from '@ember/modifier';

/**
 * Modifier that sets the root attributes of the source file on the
 * rendered `<svg>`. Used as `{{rootAttrsModifier rootAttrs}}`.
 *
 * Modifiers run after `...attributes` is applied, so an attribute the
 * element already has came from the caller and is left alone. This lets
 * the caller's attributes win.
 *
 * A modifier is used because the Ember build precompiles `template()`
 * calls and rejects template strings built at runtime. Ember has no
 * default manager for plain function modifiers, so this sets one.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const rootAttrsModifier: object = /*#__PURE__*/ setModifierManager(
  () => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    capabilities: capabilities('3.22'),
    createModifier: () => ({}),
    installModifier(_state: unknown, el: Element, args: { positional: [Record<string, string> | null] }) {
      for (const [name, value] of Object.entries(args.positional[0] ?? {})) {
        if (!el.hasAttribute(name)) el.setAttribute(name, value);
      }
    },
    updateModifier: () => {},
    destroyModifier: () => {},
  }),
  {},
);

/**
 * Creates an Ember component that renders an SVG sprite symbol via `<use href>`.
 * Used in production builds where SVGs are collected into sprite sheets.
 *
 * The template is compiled once with scoped bindings rather than string
 * interpolation, so each SVG reuses the same compiled template. The root
 * attributes are set by a modifier that leaves the caller's attributes alone.
 *
 * @param viewBox The `viewBox` attribute for the `<svg>` element.
 * @param width   The `width` attribute, or `null` to omit.
 * @param height  The `height` attribute, or `null` to omit.
 * @param symbol  The sprite symbol reference (e.g. `/assets/sprite.svg#abc123`).
 * @param rootAttrs Attributes from the root of the source `<svg>`, or `null` if none.
 * @returns       An Ember template component.
 */
export const createSvg = /*#__NO_SIDE_EFFECTS__*/ (
  viewBox: string | null,
  width: string | null,
  height: string | null,
  symbol: string,
  rootAttrs: Record<string, string> | null = null,
): unknown => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return template(
    `<svg viewBox={{viewBox}} width={{width}} height={{height}} ...attributes {{rootAttrsModifier rootAttrs}}>{{yield}}<use href={{symbol}} /></svg>`,
    { scope: () => ({ viewBox, width, height, symbol, rootAttrs, rootAttrsModifier }) },
  );
};

/**
 * Creates an Ember component that renders inline SVG markup.
 * Used in dev mode and for `?unsafe-inline` imports.
 *
 * The SVG markup is injected as raw HTML via triple-curlies `{{{xml}}}`,
 * wrapped in an `<svg>` element that receives `...attributes` for
 * splattributes support. The root attributes are set by a modifier that
 * leaves the caller's attributes alone.
 *
 * @param viewBox The `viewBox` attribute for the wrapper `<svg>`.
 * @param width   The `width` attribute, or `null` to omit.
 * @param height  The `height` attribute, or `null` to omit.
 * @param xml     The inner SVG markup string (children of the root `<svg>`).
 * @param rootAttrs Attributes from the root of the source `<svg>`, or `null` if none.
 * @returns       An Ember template component.
 */
export const createSvgInline = /*#__NO_SIDE_EFFECTS__*/ (
  viewBox: string | null,
  width: string | null,
  height: string | null,
  xml: string,
  rootAttrs: Record<string, string> | null = null,
): unknown => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return template(
    `<svg viewBox={{viewBox}} width={{width}} height={{height}} ...attributes {{rootAttrsModifier rootAttrs}}>{{yield}}{{{xml}}}</svg>`,
    { scope: () => ({ viewBox, width, height, xml, rootAttrs, rootAttrsModifier }) },
  );
};
