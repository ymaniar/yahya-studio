# Caramelio — Concept Website (non officiel)

A premium concept/proposal website built by Yahya Studio for **Caramelio**, a café-pâtisserie-breakfast venue in a villa in Targa, Marrakech.

**This is not an official Caramelio website.** It is an internal proposal built to demonstrate what a premium web presence for Caramelio could look like. Caramelio does not currently have a website; this concept was built from publicly available listing information and light user research, not from any material supplied by the business.

- No claim of partnership or affiliation with Caramelio is made.
- No reservations, orders, or contact-form submissions made through this site are real. "Commander sur Glovo" and "Itinéraire" buttons are placeholders / outbound links to be wired to real destinations before any real launch.
- Reviewer quotes on the home page are lightly paraphrased from public review themes (not copied verbatim) and clearly labeled "Avis public" with a disclaimer that this is an aperçu of public reputation, not verified or endorsed content.

## Media

The site now uses the **approved Caramelio media package** (`assets/`), copied in from `caramelio_renamed_assets.zip`:

- `assets/images/` — approved photos, referenced only by their clean, descriptive filenames (e.g. `terrace-01.jpg`, `pastry-box-02.jpg`). The original raw upload filenames are never referenced in site code; see `assets/docs/media-mapping.txt` for the raw→clean mapping kept for reference only.
- `assets/videos/villa-ambience-01.mp4` — a short villa ambience clip, used only as a subtle, muted, looping background layer in the site footer (low opacity, tinted, never full-screen or with sound). It always ships with a `poster` fallback (`assets/images/villa-ambience-poster.jpg`), and `prefers-reduced-motion: reduce` hides the video entirely in favor of a static poster image.
- `assets/docs/` — `contact-sheet.jpg` (visual reference sheet) and `media-mapping.txt` (raw→clean filename mapping), kept for internal reference only, not linked from the site.
- **`assets/images/staff-service-01.jpg` is intentionally not used anywhere on the site** because it shows a visible person — per the media package's own note, it requires Caramelio's explicit approval before any public use.
- Not every supplied photo is used on every page; a curated subset was chosen per section to avoid visual repetition (e.g. only 2 of the 3 near-duplicate dining-room shots are used).

## Inspiration, not imitation

The visual direction is inspired by the maturity and pacing of `pistachio.enisdev.com`, used as an authorized close structural reference (permission confirmed on both the Caramelio and Pistachio/Enisdev side for this specific project). Even with that permission, this remains a Caramelio site: no Pistachio business content, copy, or photography is used anywhere — every image and video on this site is Caramelio's own approved media (`assets/`). What was carried over is structural/stylistic maturity: a cinematic header and hero, a sticky image/scroll storytelling section, a premium picture-frame treatment for photography, an elegant reviews layout, an Instagram-style grid, an accessible FAQ, and a large designed footer. All copy (in French), business content, and photography are Caramelio's own.

## Structure

Five pages share one header, navigation, footer, and design system:

- `index.html` — Accueil: hero (real villa photo), signatures, ambiance de villa (terrasse / salon / pâtisserie), avis, Instagram, FAQ
- `carte.html` — La carte: petit-déjeuner, pâtisserie, boissons & cocktails, enfants — each category paired with a real photo
- `galerie.html` — L'atmosphère: editorial grid + Instagram strip built from the real approved photos
- `occasions.html` — Gâteaux sur mesure: wedding, custom, and kids' cake photography, added because the media package included a strong dedicated set of occasion-cake shots
- `contact.html` — Venir à Caramelio: coordonnées, horaires, services, real exterior/interior photos, map placeholder, FAQ résumée

Supporting files:

- `css/style.css` — the full design system (colors, type, spacing, components)
- `js/script.js` — mobile nav, active nav state, FAQ accordion, scroll behavior
- `content/site-data.json` — structured content, now including real media paths (see below)

## Design system

- **Colors**: deep espresso/charcoal, warm cream, muted caramel, soft gold, pistachio/olive green accent
- **Type**: system serif for headings (editorial feel), system sans for body — no external fonts, no build step
- **Motion**: the homepage hero uses the real Caramelio ambience video with a light, bottom-anchored shade only (never a heavy black filter — the video stays visible). The "Une villa, trois ambiances" section uses a sticky framed image that cross-fades between three photos as each text panel scrolls through view (`IntersectionObserver`, with the first image always shown by default if JavaScript doesn't run). All motion respects `prefers-reduced-motion` (video swaps for its poster image, cross-fades and gradient drift stop).
- **Images**: real, approved Caramelio photography throughout (see Media above), framed with a reusable premium cadre system — `.editorial-frame` (double gold border), `.frame-corner` (corner line detail), and `.frame-medallion` (a small gold diamond detail below the frame). Portrait shots placed in awkward crops (notably the staff/service photo) use `object-fit: contain` on an espresso backdrop instead of a cropping `cover`, so the subject is never cut off badly. A handful of non-visual placeholders (e.g. the contact map) remain CSS-only, clearly labeled as such.

## Real business information used

Sourced from public listing data and user-provided research: name, type, Targa/Marrakech location, address (`JXX2+63R, Marrakech`), phone (`05 24 49 05 95`), approximate price range (50–100 MAD/person), closing time (23:00), services (terrasse, cocktails, menu enfant), and the existence of Instagram/Facebook profiles and a Glovo ordering link. None of this was independently verified beyond the listing/research provided — hours, pricing, and service details are flagged throughout the site as indicative and "à confirmer avec l'établissement."

## Backend-ready JSON

`content/site-data.json` mirrors the content currently hardcoded into the HTML (business info, hours, menu, reviews, FAQ, gallery captions, social/order links, nav). The static pages don't read this file today — it exists to show the shape a future CMS/admin dashboard would populate. Treat it as the contract for that future integration, not a live data source yet.

## Future backend plan

- Admin login
- Menu editor
- Gallery / occasions manager
- Opening hours editor
- FAQ editor
- Social links editor
- Reviews/testimonials manager

## Tech

Static HTML, CSS, and vanilla JavaScript only. No external libraries, no external APIs, no build step, no dependencies. Open any page directly in a browser.
