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
├── images/               # logo, favicon mark, and project preview screenshots
└── README.md
```

No framework, no build step — plain HTML/CSS/JS.

## Sections

Hero (with an interactive canvas starfield background), Selected Work (Luckin Café + Palm Barber Shop), Services & stack, Process, Why it matters, Contact form (Netlify Forms), Footer.

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

## Project preview images

`images/luckin-cafe-preview.jpg` and `images/palm-barber-preview.jpg` are hero-section screenshots (1280×800) captured directly from the two live sites, used as the `<img>` thumbnails in the Selected Work cards. Both are `loading="lazy"` with explicit `width`/`height` to avoid layout shift.

## Branding assets

- **Logo**: `images/yahya-studio-logo.png` (1704×314 horizontal wordmark), used in the header (`loading="eager"`), the footer (`loading="lazy"`), and as the `og:image` for social link previews.
- **Favicon**: `images/yahya-studio-mark.png` (459×459 square mark), referenced via `<link rel="icon" type="image/png">` in both `index.html` and `success.html`.
- Both PNGs are palette-optimized (no visible quality loss) to keep the eagerly-loaded header asset lightweight.

## Hero starfield

The hero background (`#heroStarfield` canvas in `index.html`, logic in `js/script.js`) is a lightweight vanilla-JS particle field: ambient drift by default, a soft cursor-reactive glow on hover-capable devices, a single static frame under `prefers-reduced-motion`, and the animation loop pauses automatically whenever the hero scrolls out of view or the browser tab is hidden (via `IntersectionObserver` + the Page Visibility API) to avoid unnecessary CPU/GPU use.

## Visual identity

Dark "tech studio" theme: near-black background (`--color-bg`), white/soft-gray text, and an electric cyan + indigo gradient accent (`--color-accent`, `--color-accent-2`), all defined as CSS custom properties in `css/style.css`. Labels, tags, index numbers, and form field labels use a system monospace stack (`--font-mono`) for a code/interface-inspired feel — no external fonts loaded.

## Deliberately not included

- Real phone number or email (not yet provided)
