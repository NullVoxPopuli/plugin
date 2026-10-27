// Type tests for the SVG import declarations. `pnpm typecheck` fails if an
// SVG import does not have the named `SvgComponent` type.

import type { SvgComponent } from '@svg-jar/plugin/types/ember';
import Arrow from '../app/icons/arrow.svg';
import Square from '../app/icons/square.svg?unsafe-inline';
import Circle from '../app/icons/circle.svg?sprite=shapes';

export const arrow: SvgComponent = Arrow;
export const square: SvgComponent = Square;
export const circle: SvgComponent = Circle;

// @ts-expect-error an SVG import is a component, so this fails unless the type is `any`
export const notANumber: number = Arrow;
