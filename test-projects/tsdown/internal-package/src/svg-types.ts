// Type tests for the SVG import declarations. `pnpm typecheck` fails if an
// SVG import does not have the named `SvgComponent` type.

import type { SvgComponent } from '@svg-jar/plugin/types/dom';
import Arrow from './icons/arrow.svg';
import Square from './icons/square.svg?unsafe-inline';

export const arrow: SvgComponent = Arrow;
export const square: SvgComponent = Square;

// @ts-expect-error an SVG import is a component, so this fails unless the type is `any`
export const notANumber: number = Arrow;
