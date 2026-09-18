# Stillwater — React storefront

A React storefront built in Vite: 20 routes, a persistent cart, a live currency
switcher, and a hand-built motion system. No UI framework beyond React and the
router.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/collections` | Collections index |
| `/collections/:handle` | Collection, with sort, stock filter and stone filter |
| `/products/:handle` | Product, with gallery, sizes and quantity |
| `/cart` | Bag, discount code and checkout |
| `/our-story` | Our story |
| `/atelier` | The atelier |
| `/custom` | Commissions, with a brief form |
| `/appointments` | Appointments, with a booking form |
| `/stockists` | Stockists |
| `/journal`, `/journal/:slug` | Journal index and post |
| `/jewellery-care` | Jewellery care |
| `/ring-sizing` | Ring sizing, with a size chart |
| `/repairs` | Repairs and servicing |
| `/faq`, `/custom-faq` | FAQ and commission FAQ |
| `/shipping-returns` | Shipping and returns |
| `/track-order` | Track an order |
| `/gift-cards` | Gift cards, with a live preview |
| `/contact` | Contact |
| `*` | Not found |

## Cart

State lives in [ShopContext.jsx](src/context/ShopContext.jsx) and persists to
`localStorage`, so a reload or a route change keeps the bag. On load it
rehydrates each line against the catalogue, so a saved cart can never show a
stale price.

It handles add, quantity changes, removal, emptying, a free-shipping threshold
with a progress bar, a discount code, and a checkout confirmation. Sold-out
pieces cannot be added, and rings require a size before the add succeeds.

## Currency

Prices are stored once in the base currency and converted at render time
through the context's `format`. Switching currency in the header or the footer
re-prices every product card, product page, cart line, gift card and price table
at once, and the choice persists.

Seven currencies ship in [currencies.js](src/data/currencies.js), with fixed
sample rates and per-currency decimal places, so yen renders without decimals.
Point `rate` at a live feed and nothing else changes.

## Animations

1. **Hero** — a looping video background, a slow ken-burns push on the poster
   underneath it, and headline lines rising out of overflow masks.
2. **Scroll reveal** — an `IntersectionObserver` flips `data-revealed`; grids
   cascade by passing an incrementing delay.
3. **Header** — transparent over the home hero, frosted once scrolled, retracts
   downward and returns upward.
4. **Mega menu** — a `clip-path` wipe with columns staggering in behind it.
5. **Marquee** — two identical runs, translated by exactly `-50%`. The gap lives
   on each item rather than in a flex `gap`, so one run is precisely half the
   track and the loop has zero seam error. Each run repeats the phrase list three
   times so it always overflows the viewport.
6. **Product cards** — lift, crossfade to a second angle with a counter-zoom, and
   a quick-add that slides over the image edge.
7. **Drawers, search and accordions** — edge slides with a blurring backdrop,
   a search panel that drops from the top, and accordions that open through a
   `grid-template-rows` transition.
8. **Route changes** — each page fades up, and navigation resets scroll.

Everything collapses under `prefers-reduced-motion: reduce`.

## Colour and type

The palette was rebuilt around readability. The reference site's `#3F4A96` at
Newsreader 200 looked elegant at a glance but was genuinely tiring to read, and
the muted body text failed the accessibility minimum outright.

| | Before | Now |
| --- | --- | --- |
| Foreground | `#3F4A96` | `#232C66` |
| Heading | `#3F4A96` | `#1A2257` |
| Heading weight | 200 | 400 |
| Label weight | 400 | 600 |
| Muted text opacity | 0.60 | 0.78 |
| Body contrast on white | 7.98:1 | 12.93:1 |
| Muted contrast on white | 3.01:1 | 6.59:1 |

The muted figure is the one that mattered. At 3.01:1 it sat below the WCAG AA
minimum of 4.5:1, which is why long paragraphs were hard going.

Weight is handled in two places. Headings move from Newsreader 200 to 400, and
the small uppercase labels, which carry wide letter-spacing and were the
thinnest text on the page, step up to 600 with slightly tighter tracking so the
heavier weight does not read as loose.

Every value is a token in [tokens.css](src/styles/tokens.css), so the whole
palette moves from one place.

## Imagery

Two layers, defined in [media.js](src/data/media.js).

**Reference photographs** come from Unsplash, hotlinked from their image CDN
with per-breakpoint `srcset` and lazy loading. Twenty-eight photos cover
products, collections, journal posts, every sub-page header, every closing
band, the story panels, the gift card preview and the 404.

**Generated artwork** in [GemArt.jsx](src/components/GemArt.jsx) is drawn from
numeric seeds and sits underneath every photo. It paints instantly, so a frame
is never empty while an image loads, and it stays if the image fails. Anything
with no photo mapped simply renders the artwork, which is how the page-hero
backdrops and CTA bands still work.

[Media.jsx](src/components/Media.jsx) is the component that combines them.
Every photographer is credited in [CREDITS.md](CREDITS.md).

The house name, product names and every line of copy are original to this build.
What was reproduced from the reference site is the layout, the token system and
the motion.

## Hero video

The hero is a looping, muted, inline video with the heading centred over it and
no call-to-action button. A poster photograph paints first and stays until the
video actually starts, so there is no black frame, and it remains if the video
never plays.

Autoplay is refused while a document is hidden, so a page opened in a background
tab retries when the tab comes to the front. Under
`prefers-reduced-motion: reduce` the video is left alone and the still poster is
shown instead.

The clip is currently hotlinked from Mixkit so the project runs with nothing to
download. **Before shipping, self-host it** — see [CREDITS.md](CREDITS.md) for
the two-line change. `.gitignore` already excludes `public/media/*.mp4`.

## Forms

Every form validates locally and reports success in place. Nothing is posted,
because there is no back end behind this. `useLocalForm` in
[PageKit.jsx](src/components/PageKit.jsx) is the shared hook.

## Structure

```
src/
  App.jsx                 routes, scroll reset, page transition
  context/ShopContext.jsx cart and currency, persisted
  data/site.js            catalogue, navigation, collections
  data/content.js         editorial and help page copy
  data/currencies.js      rates, symbols, decimals
  hooks/useReveal.js      reveal, scroll direction, scroll lock, parallax
  styles/tokens.css       colour schemes, type scale, easing curves
  styles/base.css         reset, buttons, reveal primitives, keyframes
  styles/components.css   home page sections and chrome
  styles/pages.css        sub-page components
  components/             header, drawers, cards, PageKit primitives, GemArt
  pages/                  one file per route group
```
