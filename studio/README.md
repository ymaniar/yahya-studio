# Yahya Studio

Portfolio / pitch website for Yahya Studio — premium websites for local businesses (cafés, barbershops, restaurants, small brands).

## Structure

```
studio/
├── index.html
├── success.html          # Netlify Forms redirect target after a successful submission
├── css/
│   ├── style.css        # base styles, layout, components, responsive
│   └── animations.css   # keyframes + reveal-on-scroll transitions
├── js/
│   └── script.js        # mobile nav toggle + scroll-reveal (reduced-motion aware)
├── images/               # project screenshots (not added yet)
└── README.md
```

No framework, no build step — plain HTML/CSS/JS.

## Sections

Hero, Selected Work (Luckin Café + Palm Barber Shop), Services, Process, Why a website matters, Contact form, Footer.

## Contact form (Netlify Forms)

The Contact section (`#contact` in `index.html`) is a real form handled by **Netlify Forms** — no custom backend.

- `<form name="client-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field">` is what Netlify's build-time bot scans for in the deployed HTML. Because this is a plain static site (no JS framework, no build step), the form markup is already present in the shipped `index.html`, so Netlify detects it automatically on deploy — nothing else to configure beyond enabling the site on Netlify.
- The hidden `<input type="hidden" name="form-name" value="client-inquiry">` is required because the form posts as a plain HTML submission (no JS/fetch); Netlify needs it to match the submission to the right form.
- The `bot-field` input (visually hidden off-screen, `aria-hidden="true"`, `tabindex="-1"`) is the spam honeypot — real visitors never see or fill it; bots that do get silently discarded by Netlify.
- On submit, the browser is redirected to `success.html` (`action="/success.html"`), a small branded thank-you page.
- Submitted inquiries appear under **Site → Forms** in the Netlify dashboard once deployed. Locally (`file://` or a plain static server), the form will not actually submit anywhere — that only works once the site is deployed on Netlify.

## Portfolio projects shown

- **Luckin Café** — https://luckin-cafe.netlify.app/
- **Palm Barber Shop** — https://palm-barber-shop.netlify.app/

Both are linked as live external sites only (`target="_blank"`); their source files under `clients/` are not read or modified by this project.

## Known placeholders (to replace later)

- **Project thumbnails**: currently CSS-only textured placeholders (diagonal line pattern + monogram badge) in `work-thumb-luckin`, `work-thumb-palm` — swap in real screenshots in `images/` once available, and update the `<div class="work-thumb">` markup to an `<img>`.
- **Open Graph image**: no `og:image` is set yet since there's no real screenshot/brand image to point to.

## Deliberately not included

- Real phone number or email (not yet provided)
- Client logos/screenshots (placeholder blocks only, per this ticket's instruction)
