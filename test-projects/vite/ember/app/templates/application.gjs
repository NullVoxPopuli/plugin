// Default import - sprite mode
import Arrow from '../icons/arrow.svg';

// Named sprite
import Circle from '../icons/circle.svg?sprite=shapes';

// Inline mode
import Square from '../icons/square.svg?unsafe-inline';

// Root attributes - fill, stroke and stroke-width set only on the root <svg>
import ChevronUp from '../icons/chevron-up.svg';
import ChevronUpInline from '../icons/chevron-up.svg?unsafe-inline';

<template>
  <h1>SVG Jar Ember Test</h1>

  <section class="sprite">
    <Arrow class="exist" />
  </section>

  <section class="named-sprite">
    <Circle>
      <title>Has a title</title>
      <desc>Has a description</desc>
    </Circle>
  </section>

  <section class="inline">
    <Square />
  </section>

  <section class="root-attrs">
    <ChevronUp class="hero-sprite" />
    <ChevronUpInline class="hero-inline" />
    <ChevronUp class="hero-sprite-override" stroke-width="3" />
    <ChevronUpInline class="hero-inline-override" stroke-width="3" />
  </section>

  {{outlet}}
</template>
