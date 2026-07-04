# Luckin Café

A premium single-page website for Luckin Café — café, snack & pâtisserie in Targa, Marrakech.

## Structure

```
clients/luckin-cafe/
├── index.html          # Page markup
├── css/
│   ├── style.css        # Layout, components, typography, colors, responsive rules
│   └── animations.css    # Scroll-reveal system, keyframes, reduced-motion behavior
├── js/
│   └── script.js         # Menu tab switching, scroll-reveal, hero parallax, progress bar
└── images/
    ├── luckin-logo.png
    ├── hero-exterior.png    # Café exterior at night (used in hero, gallery, and terrace section)
    └── gallery-breakfast.png
```

## Tech stack

Plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies. Open `index.html` directly in a browser to view the site.

## Notes

- The menu section uses the ARIA tabs pattern (`role="tablist"`/`"tab"`/`"tabpanel"`) for accessible category switching.
- Animations respect `prefers-reduced-motion`.
- Content is a curated selection from the full Luckin Café menu — see the on-page note near the Menu section.
