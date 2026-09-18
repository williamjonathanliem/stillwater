// ---------------------------------------------------------------
// Catalogue and navigation. All prices are stored in the base
// currency (MYR); the shop context converts them for display.
//
// Reference photography is attached from `media.js` at the bottom of
// this file, so the catalogue itself stays readable.
// ---------------------------------------------------------------

import { PHOTOS } from './media';

export const brand = {
  name: 'Stillwater Atelier',
  script: 'Stillwater',
  logoTop: 'Atelier',
  tagline: 'One-of-a-kind demi-fine gemstone jewellery',
};

export const announcements = [
  'We will be in New York from 20 September to 02 November. Write to us to book a private appointment.',
  'Complimentary insured shipping on every order over RM500.',
  'Commissions are open for the season.',
];

export const navigation = [
  { label: 'Home', href: '/' },
  {
    label: 'Shop',
    href: '/collections',
    columns: [
      {
        title: 'By piece',
        links: [
          { label: 'Everything', href: '/collections/all' },
          { label: 'Earrings', href: '/collections/earrings' },
          { label: 'Necklaces', href: '/collections/necklaces' },
          { label: 'Rings', href: '/collections/rings' },
          { label: 'Bracelets', href: '/collections/bracelets' },
        ],
      },
      {
        title: 'By stone',
        links: [
          { label: 'Tourmaline', href: '/collections/all?stone=tourmaline' },
          { label: 'Sapphire', href: '/collections/all?stone=sapphire' },
          { label: 'Pearl', href: '/collections/all?stone=pearl' },
          { label: 'Aquamarine', href: '/collections/all?stone=aquamarine' },
          { label: 'Moissanite', href: '/collections/all?stone=moissanite' },
        ],
      },
      {
        title: 'Not repeated',
        links: [
          { label: 'One of one', href: '/collections/one-of-one' },
          { label: 'Atelier pieces', href: '/collections/atelier' },
          { label: 'Commission a piece', href: '/custom' },
          { label: 'Book an appointment', href: '/appointments' },
        ],
      },
    ],
    featured: {
      title: 'New this week',
      caption: 'Four settings cut from a single parcel of spinel.',
      href: '/collections/all',
      art: { seed: 11, tone: 'rose' },
    },
  },
  { label: 'Commissions', href: '/custom' },
  { label: 'The atelier', href: '/atelier' },
  { label: 'Our story', href: '/our-story' },
];

export const hero = {
  eyebrow: 'New season',
  lines: ['Rare stones, found', 'one at a time.'],
  caption: 'Every stone chosen by hand, then set to be lived in.',
};

export const marqueeItems = [
  'Chosen by hand',
  'Cut in small runs',
  'Set at our own bench',
  'Kept for a lifetime',
];

export const intro = {
  eyebrow: 'Our promise',
  heading: 'Jewellery drawn slowly, so it outlasts the season it arrives in',
  body: [
    'We believe the jewellery you wear should be as particular as the moments it marks. Nothing here is mass produced, and nothing is chosen by a spreadsheet.',
    'Each parcel of stones is picked in person, then matched to a setting that suits the way it catches light. The result is a small run of pieces, occasionally a single one.',
  ],
  cta: { label: 'Read our story', href: '/our-story' },
};

const catalogue = [
  {
    id: 'solene',
    handle: 'solene-earrings',
    name: 'Solene earrings',
    price: 578,
    stone: 'Pink tourmaline',
    stoneKey: 'tourmaline',
    metal: '14k solid gold',
    collections: ['earrings', 'all'],
    badge: null,
    description:
      'A pair of pink tourmalines that came out of the same parcel, matched for tone rather than size. Set close to the ear so the colour sits against the skin instead of hanging away from it.',
    details: [
      'Stone: 5.5mm pink tourmaline, brilliant cut',
      'Metal: 14k solid yellow gold',
      'Drop: 11mm from the lobe',
      'Butterfly backs included',
    ],
    art: { seed: 21, tone: 'rose' },
    artAlt: { seed: 22, tone: 'blush' },
    gallery: [
      { seed: 21, tone: 'rose' },
      { seed: 22, tone: 'blush' },
      { seed: 23, tone: 'pearl' },
    ],
  },
  {
    id: 'verrine',
    handle: 'verrine-earrings',
    name: 'Verrine earrings',
    price: 615,
    stone: 'Blue sapphire',
    stoneKey: 'sapphire',
    metal: '14k solid gold',
    collections: ['earrings', 'one-of-one'],
    badge: 'Sold out',
    soldOut: true,
    description:
      'Two sapphires with a cool, almost grey cast to them. They read navy indoors and closer to slate in daylight, which is the reason we bought them.',
    details: [
      'Stone: 4.8mm blue sapphire, step cut',
      'Metal: 14k solid white gold',
      'Drop: 9mm from the lobe',
      'One pair only',
    ],
    art: { seed: 31, tone: 'indigo' },
    artAlt: { seed: 32, tone: 'aqua' },
    gallery: [
      { seed: 31, tone: 'indigo' },
      { seed: 32, tone: 'aqua' },
      { seed: 33, tone: 'pearl' },
    ],
  },
  {
    id: 'noctis',
    handle: 'noctis-earrings',
    name: 'Noctis earrings',
    price: 619,
    stone: 'Freshwater pearl',
    stoneKey: 'pearl',
    metal: '14k solid gold',
    collections: ['earrings', 'one-of-one'],
    badge: 'Sold out',
    soldOut: true,
    description:
      'Baroque pearls, deliberately mismatched. We set them on a short post so the irregular side turns outward and catches the light as you move.',
    details: [
      'Stone: 8 to 9mm baroque freshwater pearl',
      'Metal: 14k solid yellow gold',
      'Drop: 14mm from the lobe',
      'No two pairs alike',
    ],
    art: { seed: 41, tone: 'pearl' },
    artAlt: { seed: 42, tone: 'lilac' },
    gallery: [
      { seed: 41, tone: 'pearl' },
      { seed: 42, tone: 'lilac' },
      { seed: 43, tone: 'blush' },
    ],
  },
  {
    id: 'marisole',
    handle: 'marisole-earrings',
    name: 'Marisole earrings',
    price: 641,
    stone: 'Green tourmaline',
    stoneKey: 'tourmaline',
    metal: '14k solid gold',
    collections: ['earrings', 'one-of-one', 'all'],
    badge: 'One of one',
    description:
      'A single pair, cut from one rough. The green runs slightly bluer at the edges, which is a quirk of the crystal rather than a flaw in the cut.',
    details: [
      'Stone: 6mm green tourmaline, oval cut',
      'Metal: 14k solid yellow gold',
      'Drop: 12mm from the lobe',
      'One pair only',
    ],
    art: { seed: 51, tone: 'moss' },
    artAlt: { seed: 52, tone: 'aqua' },
    gallery: [
      { seed: 51, tone: 'moss' },
      { seed: 52, tone: 'aqua' },
      { seed: 53, tone: 'pearl' },
    ],
  },
  {
    id: 'cendre',
    handle: 'cendre-huggie-earrings',
    name: 'Cendre huggie earrings',
    price: 495,
    stone: 'Moissanite',
    stoneKey: 'moissanite',
    metal: '14k solid gold',
    collections: ['earrings', 'all'],
    badge: null,
    description:
      'The everyday pair. A narrow huggie with moissanite set flush along the front, sized to sit close enough to sleep in.',
    details: [
      'Stone: 1.5mm moissanite, nine per ear',
      'Metal: 14k solid yellow gold',
      'Inner diameter: 10mm',
      'Hinged closure',
    ],
    art: { seed: 61, tone: 'pearl' },
    artAlt: { seed: 62, tone: 'lilac' },
    gallery: [
      { seed: 61, tone: 'pearl' },
      { seed: 62, tone: 'lilac' },
      { seed: 63, tone: 'aqua' },
    ],
  },
  {
    id: 'petrel',
    handle: 'petrel-stud-earrings',
    name: 'Petrel stud earrings',
    price: 388,
    compareAt: 445,
    stone: 'Rose quartz',
    stoneKey: 'quartz',
    metal: '14k solid gold',
    collections: ['earrings', 'all'],
    badge: 'Sale',
    description:
      'Rose quartz cut shallow so it stays pale rather than turning milky. A quiet stud that suits being worn in a second piercing.',
    details: [
      'Stone: 4mm rose quartz, cabochon',
      'Metal: 14k solid yellow gold',
      'Sits flush to the lobe',
      'Butterfly backs included',
    ],
    art: { seed: 71, tone: 'blush' },
    artAlt: { seed: 72, tone: 'rose' },
    gallery: [
      { seed: 71, tone: 'blush' },
      { seed: 72, tone: 'rose' },
      { seed: 73, tone: 'pearl' },
    ],
  },
  {
    id: 'quarry',
    handle: 'quarry-ring',
    name: 'Quarry ring',
    price: 862,
    stone: 'Spinel',
    stoneKey: 'spinel',
    metal: '14k solid gold',
    collections: ['rings', 'all'],
    badge: null,
    description:
      'A spinel in a plum-grey that shifts warmer under lamplight. The band is squared off on the inside so the stone stays upright through the day.',
    details: [
      'Stone: 7mm spinel, cushion cut',
      'Metal: 14k solid yellow gold',
      'Band width: 2.1mm',
      'Sizes H to S, resizing included',
    ],
    art: { seed: 81, tone: 'indigo' },
    artAlt: { seed: 82, tone: 'moss' },
    gallery: [
      { seed: 81, tone: 'indigo' },
      { seed: 82, tone: 'moss' },
      { seed: 83, tone: 'lilac' },
    ],
  },
  {
    id: 'fenwick',
    handle: 'fenwick-stud-earrings',
    name: 'Fenwick stud earrings',
    price: 402,
    stone: 'Aquamarine',
    stoneKey: 'aquamarine',
    metal: '14k solid gold',
    collections: ['earrings', 'all'],
    badge: null,
    description:
      'Aquamarine kept pale on purpose. Deeper material is easy to find and harder to wear, so we took the lighter end of the parcel.',
    details: [
      'Stone: 5mm aquamarine, brilliant cut',
      'Metal: 14k solid yellow gold',
      'Sits flush to the lobe',
      'Butterfly backs included',
    ],
    art: { seed: 91, tone: 'aqua' },
    artAlt: { seed: 92, tone: 'pearl' },
    gallery: [
      { seed: 91, tone: 'aqua' },
      { seed: 92, tone: 'pearl' },
      { seed: 93, tone: 'moss' },
    ],
  },
  {
    id: 'lowry',
    handle: 'lowry-lariat-necklace',
    name: 'Lowry lariat necklace',
    price: 734,
    stone: 'Blue sapphire',
    stoneKey: 'sapphire',
    metal: '14k solid gold',
    collections: ['necklaces', 'all'],
    badge: null,
    description:
      'A lariat that sits where you set it, with a sapphire on the drop. The chain is soldered link by link so it hangs straight rather than twisting.',
    details: [
      'Stone: 4mm blue sapphire',
      'Metal: 14k solid yellow gold',
      'Length: adjustable 40 to 48cm',
      'Cable chain, 1.1mm',
    ],
    art: { seed: 111, tone: 'indigo' },
    artAlt: { seed: 112, tone: 'aqua' },
    gallery: [
      { seed: 111, tone: 'indigo' },
      { seed: 112, tone: 'aqua' },
      { seed: 113, tone: 'pearl' },
    ],
  },
  {
    id: 'ashfield',
    handle: 'ashfield-pendant',
    name: 'Ashfield pendant',
    price: 556,
    stone: 'Green tourmaline',
    stoneKey: 'tourmaline',
    metal: '14k solid gold',
    collections: ['necklaces', 'all'],
    badge: null,
    description:
      'One tourmaline on a fine chain, bezel set so there is nothing to catch on a collar. Meant to be worn under things and forgotten about.',
    details: [
      'Stone: 5mm green tourmaline, bezel set',
      'Metal: 14k solid yellow gold',
      'Length: adjustable 40 to 45cm',
      'Cable chain, 0.9mm',
    ],
    art: { seed: 121, tone: 'moss' },
    artAlt: { seed: 122, tone: 'aqua' },
    gallery: [
      { seed: 121, tone: 'moss' },
      { seed: 122, tone: 'aqua' },
      { seed: 123, tone: 'pearl' },
    ],
  },
  {
    id: 'thorne',
    handle: 'thorne-tennis-bracelet',
    name: 'Thorne tennis bracelet',
    price: 1480,
    stone: 'Mixed tourmaline',
    stoneKey: 'tourmaline',
    metal: '14k solid gold',
    collections: ['bracelets', 'atelier', 'all'],
    badge: 'Atelier',
    description:
      'Graduated tourmalines run warm to cool along the wrist. Built at our bench over three weeks, one setting at a time.',
    details: [
      'Stones: 42 tourmalines, 2.5mm',
      'Metal: 14k solid yellow gold',
      'Length: made to your wrist',
      'Double safety clasp',
    ],
    art: { seed: 131, tone: 'rose' },
    artAlt: { seed: 132, tone: 'moss' },
    gallery: [
      { seed: 131, tone: 'rose' },
      { seed: 132, tone: 'moss' },
      { seed: 133, tone: 'lilac' },
    ],
  },
  {
    id: 'calder',
    handle: 'calder-band',
    name: 'Calder band',
    price: 648,
    stone: 'Aquamarine',
    stoneKey: 'aquamarine',
    metal: '14k solid gold',
    collections: ['rings', 'all'],
    badge: null,
    description:
      'A flat band with three aquamarines set into the metal rather than on top of it. Stacks without snagging on whatever it sits next to.',
    details: [
      'Stones: three 3mm aquamarines, flush set',
      'Metal: 14k solid yellow gold',
      'Band width: 2.6mm',
      'Sizes H to S, resizing included',
    ],
    art: { seed: 141, tone: 'aqua' },
    artAlt: { seed: 142, tone: 'pearl' },
    gallery: [
      { seed: 141, tone: 'aqua' },
      { seed: 142, tone: 'pearl' },
      { seed: 143, tone: 'indigo' },
    ],
  },
];

const collectionIndex = [
  {
    id: 'all',
    handle: 'all',
    title: 'Everything',
    blurb: 'The full run, newest first.',
    art: { seed: 100, tone: 'lilac' },
  },
  {
    id: 'earrings',
    handle: 'earrings',
    title: 'Earrings',
    blurb: 'Studs, huggies and drops, most of them small enough to keep on.',
    art: { seed: 101, tone: 'lilac' },
  },
  {
    id: 'necklaces',
    handle: 'necklaces',
    title: 'Necklaces',
    blurb: 'Lariats and pendants on chains soldered link by link.',
    art: { seed: 102, tone: 'aqua' },
  },
  {
    id: 'rings',
    handle: 'rings',
    title: 'Rings',
    blurb: 'Bands and single stones, sized and resized at our bench.',
    art: { seed: 103, tone: 'rose' },
  },
  {
    id: 'bracelets',
    handle: 'bracelets',
    title: 'Bracelets',
    blurb: 'Built to your wrist, with clasps that are meant to be trusted.',
    art: { seed: 104, tone: 'moss' },
  },
  {
    id: 'one-of-one',
    handle: 'one-of-one',
    title: 'One of one',
    blurb: 'Cut from a single rough. When it is gone we cannot make it twice.',
    art: { seed: 105, tone: 'indigo' },
  },
  {
    id: 'atelier',
    handle: 'atelier',
    title: 'Atelier pieces',
    blurb: 'Longer builds, more stones, and a note on how each one was made.',
    art: { seed: 106, tone: 'pearl' },
  },
];

export const pillars = [
  {
    title: 'Chosen by hand',
    body: 'Each piece starts at a dealer table, with stones picked parcel by parcel.',
    icon: 'gem',
  },
  {
    title: 'Drawn to last',
    body: 'Every line is decided on paper first, then tested against daily wear.',
    icon: 'compass',
  },
  {
    title: 'Made at the bench',
    body: 'A small team of goldsmiths builds and inspects every piece before it ships.',
    icon: 'hand',
  },
];

export const quote = {
  text: 'Found with patience, drawn with care, worn without occasion.',
  cta: { label: 'Shop now', href: '/collections/all' },
};

export const atelier = {
  eyebrow: 'The atelier',
  heading: 'A commission begins with a single stone',
  body: 'Bring an heirloom, a colour, or nothing at all. We will source the stone, draw the setting with you, and hand the finished piece back with the notes from its making.',
  points: [
    'A private sourcing appointment, in person or online',
    'Drawings and a wax model before anything is cast',
    'Four to eight weeks at the bench, start to finish',
  ],
  cta: { label: 'Enquire about a commission', href: '/custom' },
  art: { seed: 201, tone: 'indigo' },
};

export const footerColumns = [
  {
    title: 'The house',
    links: [
      { label: 'Our story', href: '/our-story' },
      { label: 'The atelier', href: '/atelier' },
      { label: 'Appointments', href: '/appointments' },
      { label: 'Stockists', href: '/stockists' },
      { label: 'Journal', href: '/journal' },
    ],
  },
  {
    title: 'Care & help',
    links: [
      { label: 'Jewellery care', href: '/jewellery-care' },
      { label: 'Ring sizing', href: '/ring-sizing' },
      { label: 'Repairs and servicing', href: '/repairs' },
      { label: 'Commission FAQ', href: '/custom-faq' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Orders',
    links: [
      { label: 'Shipping and returns', href: '/shipping-returns' },
      { label: 'Track an order', href: '/track-order' },
      { label: 'Gift cards', href: '/gift-cards' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
];

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
];


/* ---------------------------------------------------------------
   Reference photography, attached by id. A product without an entry
   here simply falls back to its generated artwork.
---------------------------------------------------------------- */
const PRODUCT_PHOTOS = {
  solene: [PHOTOS.earringPair, PHOTOS.purpleStar, PHOTOS.whiteCollection],
  verrine: [PHOTOS.blueSet, PHOTOS.blueStone, PHOTOS.threeDiamonds],
  noctis: [PHOTOS.purpleStar, PHOTOS.earringPair, PHOTOS.whiteCollection],
  marisole: [PHOTOS.threeDiamonds, PHOTOS.marbleBeads, PHOTOS.greenRing],
  cendre: [PHOTOS.whiteCollection, PHOTOS.earringPair, PHOTOS.ringCollection],
  petrel: [PHOTOS.pinkStone, PHOTOS.threeDiamonds, PHOTOS.purpleStar],
  quarry: [PHOTOS.ringOnSilk, PHOTOS.yellowRing, PHOTOS.ringCollection],
  fenwick: [PHOTOS.blueStone, PHOTOS.blueSet, PHOTOS.marbleBeads],
  lowry: [PHOTOS.marbleBeads, PHOTOS.blueSet, PHOTOS.blueStone],
  ashfield: [PHOTOS.greenRing, PHOTOS.greenStoneRing, PHOTOS.marbleBeads],
  thorne: [PHOTOS.beadedBracelet, PHOTOS.wornBracelet, PHOTOS.ringCollection],
  calder: [PHOTOS.greenStoneRing, PHOTOS.ringCollection, PHOTOS.yellowRing],
};

const COLLECTION_PHOTOS = {
  all: PHOTOS.whiteCollection,
  earrings: PHOTOS.earringPair,
  necklaces: PHOTOS.marbleBeads,
  rings: PHOTOS.ringCollection,
  bracelets: PHOTOS.beadedBracelet,
  'one-of-one': PHOTOS.threeDiamonds,
  atelier: PHOTOS.ringOnSilk,
};

export const products = catalogue.map((product) => {
  const photos = PRODUCT_PHOTOS[product.id] || [];
  return { ...product, photos, photo: photos[0] || null, photoAlt: photos[1] || photos[0] || null };
});

export const collections = collectionIndex.map((collection) => ({
  ...collection,
  photo: COLLECTION_PHOTOS[collection.handle] || null,
}));

/* ---------------- lookups ---------------- */

export function getProduct(handle) {
  return products.find((product) => product.handle === handle) || null;
}

export function getCollection(handle) {
  return collections.find((collection) => collection.handle === handle) || null;
}

export function productsInCollection(handle) {
  if (!handle || handle === 'all') return products;
  return products.filter((product) => product.collections.includes(handle));
}

export function collectionCount(handle) {
  return productsInCollection(handle).length;
}

export function relatedProducts(product, limit = 4) {
  if (!product) return products.slice(0, limit);
  const sameCollection = products.filter(
    (candidate) =>
      candidate.id !== product.id &&
      candidate.collections.some((c) => c !== 'all' && product.collections.includes(c))
  );
  const filler = products.filter(
    (candidate) => candidate.id !== product.id && !sameCollection.includes(candidate)
  );
  return [...sameCollection, ...filler].slice(0, limit);
}
