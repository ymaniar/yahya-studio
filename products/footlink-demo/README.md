# Kick Off Booking Hub — Proposal Demo

**Book pitches. Create matches. Find missing players.**

This is a **proposal demo**, built to show what a booking and open-match
platform could look like for **Kick Off Marrakech** (kickoff.ma). It is not
official, not commissioned, and not affiliated with Kick Off unless and until
they choose to use it. It exists to be shown to the center as a concept.

The internal product concept behind this demo is called **FootLink** — a
booking and player-matching platform for football (and, here, padel) centers.
The visible UI in this demo is branded for Kick Off specifically, since it's
built around one real target center.

## What this is

- A **static front-end proposal demo**, not a production product.
- Plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no
  external libraries or APIs.
- All data (availability, open matches, dashboard schedule, players, stats)
  is **mock data defined in `js/script.js`** and lives only in memory for the
  current page session. Reloading the page resets everything.
- Public facts referenced from kickoff.ma: name, location (Targa, Marrakech —
  Route de Targa, Marrakech 40000), sports offered (football 5v5/7v7 rental,
  padel court rental), opening hours (daily 08h00–01h00), and the published
  reception / football WhatsApp / padel WhatsApp numbers.
- All visuals (the pitch backdrop, icons, cards) are **CSS-generated or
  hand-authored inline SVG** — no images were copied, scraped, or hotlinked
  from kickoff.ma or anywhere else.

## What this is not

- **Not an official Kick Off platform.** It should not be presented or
  described as one unless Kick Off approves it.
- **No real bookings are sent.** The booking form and the "Simulate booking"
  action only show a local success message — nothing is transmitted anywhere.
- **No backend, database, or authentication.**
- **No online payments.** The payment model is cash paid at the center; the
  platform only handles reservation and confirmation.
- WhatsApp buttons open real `wa.me` links using Kick Off's **publicly listed
  numbers** (football, padel, reception), prefilled with draft messages — but
  clicking them does not send anything automatically; the user would still
  need to press send in WhatsApp themselves.

## Files

```
products/footlink-demo/
├── index.html       # single-page demo: hero, booking, availability, matches, dashboard, benefits, owner preview
├── css/style.css     # light, premium pitch-green visual design
├── js/script.js      # mock data + all interactivity
└── README.md
```

## Try it

Open `index.html` directly in a browser, or serve the folder with any static
file server. No installation or build step required.

## Interactions in this demo

- Sport toggle (Football / Padel) in the booking form swaps pitch-type
  options and the available pitch/court list.
- Availability tabs (Football / Padel) — clicking any available, almost-full,
  or open-match slot pre-fills the booking form above.
- Booking form → shows a "Booking request created" success card (no data sent).
- Open match "Join match" — increments the joined-player count live; the hero
  preview card mirrors the first open match's live numbers.
- Dashboard schedule rows: **Confirm** / **Cancel** update the row status and
  the dashboard stat tiles live.
- WhatsApp buttons (open matches, dashboard schedule, player database, owner
  preview) open prefilled `wa.me` links using Kick Off's published numbers —
  football requests go to the football WhatsApp, padel to the padel WhatsApp.
- Owner preview section: "View dashboard" scrolls to the dashboard, "Simulate
  booking" fills and submits a sample booking to demonstrate the flow, "Open
  WhatsApp confirmation" opens a prefilled French-language message to the
  football WhatsApp number.

## Future backend plan

This demo is intentionally static so it can be shown to Kick Off without any
infrastructure commitment. A real version would add:

- **Supabase Auth** for player and club-owner accounts.
- **Supabase Postgres** as the real booking, match, and player database.
- A real **club dashboard login**, scoped to Kick Off staff.
- A **WhatsApp confirmation flow** (e.g. via WhatsApp Business API) replacing
  the placeholder-triggered `wa.me` links with real automated confirmations.
- **Online payments** as an optional add-on later, with cash-at-center
  remaining supported.
