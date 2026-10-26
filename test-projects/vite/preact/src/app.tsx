// Default import - sprite mode
import Arrow from './icons/arrow.svg';

// Named sprite
import Circle from './icons/circle.svg?sprite=shapes';

// Inline mode
import Square from './icons/square.svg?unsafe-inline';

// Root attributes - fill, stroke and stroke-width set only on the root <svg>
import ChevronUp from './icons/chevron-up.svg';
import ChevronUpInline from './icons/chevron-up.svg?unsafe-inline';

export function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>SVG Jar Preact Test</h1>

      <section>
        <h2>Sprite mode (default)</h2>
        <Arrow class="icon" aria-hidden="true" />
      </section>

      <section>
        <h2>Sprite mode with children (title for a11y)</h2>
        <Arrow aria-label="Navigate forward">
          <title>Forward arrow</title>
          <desc>An arrow pointing to the right</desc>
        </Arrow>
      </section>

      <section>
        <h2>Named sprite</h2>
        <Circle class="icon" style={{ width: '48px', height: '48px' }} />
      </section>

      <section>
        <h2>Inline mode</h2>
        <Square class="icon" style={{ width: '48px', height: '48px', color: 'green' }} />
      </section>

      <section>
        <h2>Root attributes</h2>
        <ChevronUp class="hero-sprite" />
        <ChevronUpInline class="hero-inline" />
        <ChevronUp class="hero-sprite-override" stroke-width="3" />
        <ChevronUpInline class="hero-inline-override" stroke-width="3" />
      </section>
    </div>
  );
}
