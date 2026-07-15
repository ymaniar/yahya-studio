# Yahya Studio — Signature Local Business Template

A reusable, premium website template for local businesses — cafés, restaurants, barbershops, salons, sports centers, and similar experience-led brands. Built as a starting point Yahya Studio can adapt per client, not a one-off client site.

This is **not** the Yahya Studio portfolio and does not touch `studio/`, `clients/`, `products/`, or any other existing project files.

## Inspiration, not imitation

The visual direction draws inspiration from the mature, editorial style of premium local-business sites (referenced during planning: `pistachio.enisdev.com`) — specifically the *ideas* of:

- image-led storytelling and calm pacing
- atmospheric background sections
- elegant serif/sans typography pairing
- a strong, fully designed footer
- an organized reviews section
- an FAQ accordion
- an Instagram/gallery grid
- a consistent multi-page system

No text, layout, assets, or branding were copied from that or any other reference. All copy, structure, colors, and placeholder imagery here are original to this template, built around a fictional demo business (**Maison Local**) whose content is clearly labeled as placeholder/demo throughout.

## Structure

Four pages share one header, navigation, footer, and design system:

- `index.html` — home: hero, signature items, atmosphere/story panels, reviews, Instagram grid, FAQ
- `menu.html` — categorized menu with pricing
- `gallery.html` — editorial image grid + Instagram grid
- `contact.html` — contact cards, hours, map placeholder, FAQ summary

Supporting files:

- `css/style.css` — the full design system (colors, type, spacing, components)
- `js/script.js` — mobile nav, active nav state, FAQ accordion, scroll behavior
- `content/site-data.json` — structured placeholder content (see below)

## Design system

- **Colors**: deep espresso/charcoal, warm cream, muted gold, soft green accent
- **Type**: system serif for headings (editorial feel), system sans for body — no external fonts, no build step
- **Motion**: subtle only — a slow CSS-gradient "video-like" hero/footer background, hover states, accordion expand. All motion respects `prefers-reduced-motion`.
- **Images**: no real photography is included. Every image slot is a CSS-gradient placeholder (`.placeholder-art`) styled to read as premium editorial imagery rather than an empty gray box. Swap these `<div>`s for real `<img>`/`<video>` per client.

## Backend-ready JSON

`content/site-data.json` mirrors the content currently hardcoded into the HTML (business info, hours, menu, reviews, FAQ, gallery captions, social links, nav). The static pages don't read this file today — it exists to show the shape a future CMS/backend would populate. Treat it as the contract for that future integration, not a live data source yet.

## Future backend plan

- Supabase database for structured content
- Admin login for the studio/client
- Menu editor
- Gallery manager
- FAQ editor
- Opening hours editor
- Reviews/testimonials manager
- Per-client deployment from this same template base

## Using this template for a new client

1. Duplicate this folder into `clients/<client-name>/`.
2. Replace `Maison Local` branding, copy, and placeholder content throughout the HTML and `site-data.json`.
3. Replace `.placeholder-art` blocks with real photography/video.
4. Adjust the CSS custom properties in `:root` (`css/style.css`) for the client's palette while keeping the same structure and spacing scale.

## Tech

Static HTML, CSS, and vanilla JavaScript only. No external libraries, no external APIs, no build step, no dependencies. Open any page directly in a browser.
