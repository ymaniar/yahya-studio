# Palm Barber Shop

Concept website for Palm Barber Shop, a men's barbershop (salon de coiffure homme).

## Structure

```
clients/palm-barber-shop/
├── index.html
├── css/
│   ├── style.css        # base styles, layout, components, responsive
│   └── animations.css   # keyframes + reveal-on-scroll transitions
├── js/
│   └── script.js        # mobile nav toggle + scroll-reveal (reduced-motion aware)
├── images/
│   ├── palm-exterior.jpg
│   └── palm-interior.jpg
└── README.md
```

No framework, no build step — plain HTML/CSS/JS.

## Images

- `images/palm-exterior.jpg` — real shop façade photo, used in the hero and gallery. Hero uses `object-position: center 30%` to keep the signage in frame on wide viewports; the mobile hero height is capped at `62vh` so the narrower crop still shows the full sign.
- `images/palm-interior.jpg` — real interior/atmosphere photo, used in the interior section and gallery, framed at a 4:3 aspect ratio matching the source photo (near-zero crop).

## Known / confirmed information

- Business name: Palm Barber Shop
- Phone: 06 43 00 34 85
- WhatsApp: +212 6 43 00 34 85
- Closing time (from Google): closes at 21:00

## Deliberately not included

The following were **not** invented and should be added only once confirmed with the client:

- Real service prices (currently shown as "Prix à confirmer")
- Full opening hours (only the closing time is shown)
- Street address
- Map embed
- Customer reviews / testimonials
