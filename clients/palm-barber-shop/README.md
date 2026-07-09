# Palm Barber Shop

Live website for Palm Barber Shop, a men's barbershop (salon de coiffure homme) in Targa, Marrakech.

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

- `images/palm-exterior.jpg` — real shop façade photo, used in the hero and gallery. Hero uses `object-position: center 28%` to keep the signage in frame on wide viewports; the mobile hero height is capped at `62vh` so the narrower crop still shows the full sign.
- `images/palm-interior.jpg` — real interior/atmosphere photo, used in the interior section and gallery, framed at a 4:3 aspect ratio matching the source photo (near-zero crop).

## Known / confirmed information

- Business name: Palm Barber Shop
- Phone / WhatsApp: +212 643-934031
- Address: Targa, Ennakhil 1, 147, Marrakech
- Closing time: Ferme à 21:00
- Services and prices: real, confirmed (see Services section in `index.html`)

## Deliberately not included

The following were **not** invented and should be added only once confirmed with the client:

- Full opening hours (only the closing time is shown)
- Map embed
- Customer reviews / testimonials
- Awards, years of experience, team names

## TODO before/at deployment

- Add canonical URL, `og:url`, and an absolute `og:image` after Netlify deployment (currently `images/palm-exterior.jpg` is a relative path, which most social platforms won't resolve for link previews).
