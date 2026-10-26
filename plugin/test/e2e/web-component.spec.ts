import { test, expect } from '@playwright/test';
import {
  assetsDir,
  expectSvgsVisible,
  expectInlineSvg,
  expectDefaultSprite,
  expectNamedSprite,
  expectSpriteContainsArrow,
  expectSpriteNoInlineSvgs,
  expectNamedSpriteContainsCircle,
  expectChunkContainsSpriteRefs,
  expectChunkContainsInlineMarkup,
  expectRootAttrs,
  expectInlineChildrenInheritRootAttrs,
} from './helpers.ts';

const ASSETS = assetsDir('web-component');

test.describe('Web Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('SVG Jar Web Component Test');
  });

  test('renders SVGs inside custom elements', async ({ page }) => {
    await expectSvgsVisible(page);
  });

  test('sprite icons with <use href>', async ({ page }) => {
    const use = page.locator('svg-arrow svg use, svg-circle svg use').first();
    await expect(use).toBeAttached();
  });

  test('inline SVGs', async ({ page }) => {
    await expectInlineSvg(page);
  });

  test('custom elements are registered', async ({ page }) => {
    await expect(page.locator('svg-arrow').first()).toBeAttached();
  });

  test('children moved inside SVG', async ({ page }) => {
    const title = page.locator('svg-arrow svg title');
    await expect(title.first()).toBeAttached();
    await expect(title.first()).toHaveText('Forward arrow');
  });

  // -- Root attributes --

  test('sprite <svg> gets the root attributes', async ({ page }) => {
    await expectRootAttrs(page, 'svg-chevron-up.hero-sprite svg');
  });

  test('inline <svg> gets the root attributes', async ({ page }) => {
    await expectRootAttrs(page, 'svg-chevron-up-inline.hero-inline svg');
    await expectInlineChildrenInheritRootAttrs(page, 'svg-chevron-up-inline.hero-inline svg');
  });

  test('CSS rule overrides a root attribute on a sprite <svg>', async ({ page }) => {
    await expect(page.locator('svg-chevron-up.hero-css-override svg')).toHaveCSS('stroke-width', '3px');
  });

  test('CSS rule overrides a root attribute on an inline <svg>', async ({ page }) => {
    await expect(page.locator('svg-chevron-up-inline.hero-css-override svg')).toHaveCSS('stroke-width', '3px');
  });

  // -- Visual regression --

  test('all SVGs render correctly', async ({ page }) => {
    const app = page.locator('#app');
    await expect(app).toBeVisible();
    await expect(app).toHaveScreenshot('all-svgs.png', { maxDiffPixelRatio: 0.01 });
  });

  // -- Build output --

  test('emits default sprite', () => expectDefaultSprite(ASSETS));
  test('emits named sprite', () => expectNamedSprite(ASSETS));
  test('sprite contains arrow', () => expectSpriteContainsArrow(ASSETS));
  test('sprite excludes inline SVGs', () => expectSpriteNoInlineSvgs(ASSETS));
  test('named sprite contains circle', () => expectNamedSpriteContainsCircle(ASSETS));
  test('chunk references sprites', () => expectChunkContainsSpriteRefs(ASSETS));
  test('chunk embeds inline markup', () => expectChunkContainsInlineMarkup(ASSETS));
});
