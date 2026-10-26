// Default import - sprite mode
import Arrow from './icons/arrow.svg';

// Named sprite
import Circle from './icons/circle.svg?sprite=shapes';

// Inline mode
import Square from './icons/square.svg?unsafe-inline';

// File mode - raw URL
import starUrl from './icons/star.svg?file';

// Embedded refs - SVG with <use href> referencing another SVG
import UseRef from './icons/with-use-ref.svg';

// Embedded refs - SVG with <image href> referencing a PNG
import ImageRef from './icons/with-image-ref.svg';

// External asset refs - absolute URLs that must pass through unchanged
import ExternalImage from './icons/with-external-image.svg';
import FontRef from './icons/with-font-ref.svg?sprite=fonts';

// Root attributes - fill, stroke and stroke-width set only on the root <svg>
import ChevronUp from './icons/chevron-up.svg';
import ChevronUpInline from './icons/chevron-up.svg?unsafe-inline';

// Source order - complex SVG with layered shapes, gradients, clip-paths, text
import SourceOrder from './icons/source-order.svg';

const app = document.getElementById('app')!;

// Sprite mode - call the factory to create a DOM node
app.appendChild(Arrow());

// Sprite mode with options - attributes, title, desc
app.appendChild(
  Arrow({
    class: 'icon',
    'aria-label': 'Navigate forward',
    title: 'Forward arrow',
    desc: 'An arrow pointing to the right',
  }),
);

// Named sprite
app.appendChild(Circle());

// Inline mode
app.appendChild(Square());

// Inline mode with options
app.appendChild(Square({ class: 'inline-icon', title: 'Blue square' }));

// File mode - create an img element with the URL
const img = document.createElement('img');
img.src = starUrl;
img.alt = 'Star';
app.appendChild(img);

// Embedded refs (local)
app.appendChild(UseRef());
app.appendChild(ImageRef());

// External asset refs (absolute URLs - should remain unchanged in output)
app.appendChild(ExternalImage());
app.appendChild(FontRef());

// Root attributes, then a caller stroke-width that must win over them
app.appendChild(ChevronUp({ class: 'hero-sprite' }));
app.appendChild(ChevronUpInline({ class: 'hero-inline' }));
app.appendChild(ChevronUp({ class: 'hero-sprite-override', 'stroke-width': '3' }));
app.appendChild(ChevronUpInline({ class: 'hero-inline-override', 'stroke-width': '3' }));

// A CSS rule on the <svg> must also win over the root attributes
const style = document.createElement('style');
style.textContent = '.hero-css-override { stroke-width: 3; }';
document.head.appendChild(style);
app.appendChild(ChevronUp({ class: 'hero-css-override' }));

// Source order - render at larger size to see detail
const sourceOrderEl = SourceOrder();
sourceOrderEl.style.width = '100px';
sourceOrderEl.style.height = '100px';
app.appendChild(sourceOrderEl);
