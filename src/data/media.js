// ---------------------------------------------------------------
// Real reference media.
//
// Photography: Unsplash, hotlinked from their image CDN, which is what
// the Unsplash license and API guidelines ask for. Every entry keeps the
// photographer's handle and the photo's page slug so the credit can be
// traced back. See CREDITS.md.
//
// Video: a Mixkit preview file for the hero. It is hotlinked so the
// project runs with nothing to download, but for production you should
// pull the clip down and self-host it from `public/media/` and point
// `heroVideo.sources` at the local path. .gitignore already excludes
// that folder's video files from the repository.
// ---------------------------------------------------------------

/** Builds a sized, cropped Unsplash URL from a photo's base. */
export function unsplashUrl(base, { w = 900, h, q = 78, fit = 'crop' } = {}) {
  const params = new URLSearchParams({
    auto: 'format',
    fit,
    q: String(q),
    w: String(w),
  });
  if (h) params.set('h', String(h));
  return `${base}?${params.toString()}`;
}

/** Builds a srcset across sensible widths, keeping the crop ratio. */
export function unsplashSrcSet(base, widths, ratio) {
  return widths
    .map((w) => {
      const h = ratio ? Math.round(w * ratio) : undefined;
      return `${unsplashUrl(base, { w, h })} ${w}w`;
    })
    .join(', ');
}

/* ---------------------------------------------------------------
   The photo library. `base` is the Unsplash CDN path with no query,
   so any size can be requested from it.
---------------------------------------------------------------- */
export const PHOTOS = {
  greenStoneRing: {
    base: 'https://images.unsplash.com/photo-1592317295760-5c1f677dfc78',
    alt: 'A gold ring set with a green gemstone',
    credit: 'Providence Vintage Jewelry',
    handle: 'providencevintagejewelry',
    slug: 'gold-and-green-gemstone-ring-s9al8aIiVNU',
  },
  beadedBracelet: {
    base: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427',
    alt: 'A gold and red beaded bracelet',
    credit: 'Luisana Galicia',
    handle: 'luisanagalicia',
    slug: 'gold-and-red-beaded-bracelet-rGz2Z6tVaeg',
  },
  earringPair: {
    base: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584',
    alt: 'A pair of silver earrings laid flat',
    credit: 'Arteum.ro',
    handle: 'arteum',
    slug: 'pair-of-silver-earring-lot-GKbfUFna-9I',
  },
  purpleStar: {
    base: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1',
    alt: 'A silver star setting with a purple stone',
    credit: 'Philippe Van Doninck',
    handle: 'phillekes',
    slug: 'silver-and-purple-star-accessory-7IUKOXTVPEg',
  },
  threeDiamonds: {
    base: 'https://images.unsplash.com/photo-1653405507161-da7d205d86f4',
    alt: 'Three cut stones in different colours on a dark background',
    credit: 'Deng Xiang',
    handle: 'dengxiangs',
    slug: 'three-different-colored-diamonds-on-a-black-background-WR98S28oRLM',
  },
  greenRing: {
    base: 'https://images.unsplash.com/photo-1599708978061-501091150ec9',
    alt: 'A silver ring set with a green stone',
    credit: 'Edgar Soto',
    handle: 'edgardo1987',
    slug: 'silver-and-green-stone-ring-o87CUS_uDiQ',
  },
  yellowRing: {
    base: 'https://images.unsplash.com/photo-1653190262923-fa971c552377',
    alt: 'A yellow stone ring with three stones set across it',
    credit: 'Denise Taylor',
    handle: 'asana_crystals',
    slug: 'a-yellow-diamond-ring-with-three-diamonds-on-it-V6CM24byQus',
  },
  blueSet: {
    base: 'https://images.unsplash.com/photo-1770722272510-ef28c6f57541',
    alt: 'A sparkling blue gemstone set against a deep blue background',
    credit: 'Ahmadreza Rezaie',
    handle: 'ahmdrzarzai',
    slug: 'sparkling-blue-gemstone-jewelry-set-on-dark-blue-background-RuCUa6CtfFE',
  },
  pinkStone: {
    base: 'https://images.unsplash.com/photo-1705575420317-daaed2ab4cf3',
    alt: 'A pink cut stone resting on a pale surface',
    credit: 'Sameer Ali',
    handle: 'samepixel_0075',
    slug: 'a-pink-diamond-sitting-on-top-of-a-pile-of-snow-3emqbUumYpQ',
  },
  marbleBeads: {
    base: 'https://images.unsplash.com/photo-1627234553051-3d60e738b534',
    alt: 'Blue and green stone beads laid on a wooden board',
    credit: 'Alin Andersen',
    handle: 'onixion',
    slug: 'blue-and-green-marble-beads-on-brown-wooden-board-0OsBYvCV0mc',
  },
  whiteCollection: {
    base: 'https://images.unsplash.com/photo-1634076665897-7af1821ef7dc',
    alt: 'An assortment of jewellery arranged on a white surface',
    credit: 'Margaret Amelia',
    handle: 'rananjayexports',
    slug: 'a-collection-of-jewelry-on-a-white-surface-CLjZqCCFz3A',
  },
  ringOnSilk: {
    base: 'https://images.unsplash.com/photo-1761754642919-207d8dd8d1e2',
    alt: 'A red stone ring resting on blue silk',
    credit: 'Ömer Evren',
    handle: 'omerevren',
    slug: 'a-ruby-and-diamond-ring-on-blue-silk-4umS5MUGoew',
  },
  ringCollection: {
    base: 'https://images.unsplash.com/photo-1559075638-e9b2a2e02849',
    alt: 'A collection of rings in assorted colours',
    credit: 'William F. Santos',
    handle: 'youwwwill',
    slug: 'assorted-color-ring-collection-0ZtwYJkzoc8',
  },
  blueStone: {
    base: 'https://images.unsplash.com/photo-1613843351058-1dd06fda7c02',
    alt: 'A pale blue stone on a white surface',
    credit: 'Jacek Dylag',
    handle: 'dylu',
    slug: 'blue-stone-on-white-surface-agsdDgRW2Ps',
  },
  wornBracelet: {
    base: 'https://images.unsplash.com/photo-1721206624468-2b3496c3bcfc',
    alt: 'A bracelet worn on the wrist',
    credit: 'Prahant Studio',
    handle: 'prahantstudio',
    slug: 'a-woman-wearing-a-bracelet-with-a-tag-on-it-neY4pbW5S1g',
  },

  /* ---- workshop, packaging and editorial, used by the sub-pages ---- */
  benchWork: {
    base: 'https://images.unsplash.com/photo-1715374033196-0ff662284a7e',
    alt: 'A jeweller working on a piece at the bench',
    credit: 'Kelly Sikkema',
    handle: 'kellysikkema',
    slug: 'a-woman-is-working-on-a-piece-of-jewelry-g4m_xpePyiU',
  },
  workbench: {
    base: 'https://images.unsplash.com/photo-1772442125267-7640b4b5f2fe',
    alt: 'A jeweller at a workbench, shaping a piece by hand',
    credit: 'GN Hearing',
    handle: 'gnhearingglobal',
    slug: 'a-woman-working-on-jewelry-at-a-workbench-9rdoc89WxP0',
  },
  solderTorch: {
    base: 'https://images.unsplash.com/photo-1777107508716-60847cc18803',
    alt: 'A jeweller using a torch to solder a ring',
    credit: 'Mazin Omron',
    handle: 'mazinomron',
    slug: 'a-jeweler-uses-a-torch-to-solder-a-ring-RQRGW-lSLWk',
  },
  blueGreenRing: {
    base: 'https://images.unsplash.com/photo-1587948228392-2a77eaae9b17',
    alt: 'A silver ring set with blue and green stones',
    credit: 'Jenni Peterson',
    handle: 'photosbyjenni',
    slug: 'silver-blue-and-green-gemstone-ring-4Vfsfjv6GJ0',
  },
  ringOnFinger: {
    base: 'https://images.unsplash.com/photo-1624588057318-5f1b2eb81012',
    alt: 'A slim silver ring worn on a finger',
    credit: 'Tahlia Claire',
    handle: 'tahliaclaire',
    slug: 'silver-ring-on-persons-finger-e_vZmriImrE',
  },
  toolTable: {
    base: 'https://images.unsplash.com/photo-1659032882718-3e54e7da86ab',
    alt: 'A workbench covered with tools and small parts',
    credit: 'Ric de Oliveira',
    handle: 'ricdeoliveira',
    slug: 'a-table-with-various-objects-on-it-FZpjCtOUPr8',
  },
  benchLamp: {
    base: 'https://images.unsplash.com/photo-1659032882703-f1e4983fe1b8',
    alt: 'A workbench with a lamp angled over it',
    credit: 'Ric de Oliveira',
    handle: 'ricdeoliveira',
    slug: 'a-table-with-a-lamp-and-several-wires-yOCtta47_6o',
  },
  boxedNecklace: {
    base: 'https://images.unsplash.com/photo-1680200256120-8ac04eb6f01d',
    alt: 'A necklace resting inside an open jewellery box',
    credit: 'Ian Talmacs',
    handle: 'iantalmacs',
    slug: 'a-jewelry-box-with-a-necklace-inside-of-it-zPYro5uenhs',
  },
  boxedRing: {
    base: 'https://images.unsplash.com/photo-1720784191768-7e7417f9bf44',
    alt: 'A ring seated in a small presentation box',
    credit: 'Luna Jewels',
    handle: 'lunajewels',
    slug: 'a-pink-box-with-a-ring-inside-of-it-orF19n7Rd2o',
  },
  ribbonBox: {
    base: 'https://images.unsplash.com/photo-1656746678972-11e2707f26bb',
    alt: 'A blue gift box tied with a white ribbon',
    credit: 'Filipp Roman',
    handle: 'filipp_roman_photography',
    slug: 'a-blue-box-with-a-white-ribbon-Gxt7TyCd2hk',
  },
  shippingBox: {
    base: 'https://images.unsplash.com/photo-1595246135406-803418233494',
    alt: 'A plain cardboard shipping box on a white table',
    credit: 'Mildlee',
    handle: 'mildlee',
    slug: 'brown-cardboard-box-on-white-table-7KKy7-TeeVs',
  },
  clarpBox: {
    base: 'https://images.unsplash.com/photo-1780744871777-fec13139d281',
    alt: 'A leather box with a clasp, on a white surface',
    credit: 'Al Rahmaniyah',
    handle: 'al_rahmaniyah887',
    slug: 'a-brown-leather-box-with-a-gold-clasp-on-white-SnNWvRGPTlY',
  },
  openBook: {
    base: 'https://images.unsplash.com/photo-1686575131650-e02f84970212',
    alt: 'A book resting on a white sheet',
    credit: 'Harper Sunday',
    handle: 'harpersunday',
    slug: 'a-book-sitting-on-top-of-a-white-sheet-7BQ3bMgHPlI',
  },
};

/* ---------------------------------------------------------------
   Hero video
---------------------------------------------------------------- */
export const heroVideo = {
  // Swap for '/media/hero.mp4' once the clip is downloaded and self-hosted.
  sources: [{ src: 'https://assets.mixkit.co/videos/20877/20877-720.mp4', type: 'video/mp4' }],
  // Shown while the video buffers, and left in place if it never plays.
  poster: PHOTOS.ringOnSilk,
  credit: 'Mixkit, "Diamond ring up close"',
  creditUrl: 'https://mixkit.co/free-stock-video/jewelry/',
};

export const CREDIT_LIST = Object.values(PHOTOS);
