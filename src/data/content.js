// ---------------------------------------------------------------
// Copy for the editorial and help pages. All original text.
// ---------------------------------------------------------------

import { PHOTOS } from './media';

export const ourStory = {
  eyebrow: 'Our story',
  title: 'We started with one parcel we could not talk ourselves out of',
  lede: 'Stillwater began as a habit of buying stones nobody had a plan for, and it grew into a bench that builds around them.',
  art: { seed: 501, tone: 'lilac' },
  photo: PHOTOS.benchWork,
  sections: [
    {
      heading: 'A buying trip that went sideways',
      body: [
        'The first parcel was not meant to be bought. It was a tray of tourmalines in a colour the dealer could not place, priced as though the odd tone was a defect rather than the point of them.',
        'We took the lot. There were enough stones for eleven pieces and no two of them matched closely enough to make a run, which turned out to be the way we have worked ever since.',
      ],
      art: { seed: 502, tone: 'rose' },
      photo: PHOTOS.workbench,
    },
    {
      heading: 'Buying before designing',
      body: [
        'Most houses draw a collection and then go looking for stones that fit it. We do the reverse. The stone comes home first, and the setting is drawn to suit what that particular piece of material does with light.',
        'It is slower and it does not scale, which is why a release is often four pieces rather than forty.',
      ],
      art: { seed: 503, tone: 'aqua' },
      photo: PHOTOS.toolTable,
    },
    {
      heading: 'One bench, six hands',
      body: [
        'Everything is set in one workshop by a team small enough that we can name who built your piece. Nothing is sent out to be finished elsewhere and nothing leaves without being looked at twice.',
        'When something needs repairing years later, it comes back to the same bench that made it.',
      ],
      art: { seed: 504, tone: 'moss' },
      photo: PHOTOS.solderTorch,
    },
  ],
  milestones: [
    { year: '2019', text: 'The first parcel of tourmaline, bought without a plan.' },
    { year: '2021', text: 'A permanent bench, and the first goldsmith on staff.' },
    { year: '2023', text: 'Commissions open, by appointment only.' },
    { year: '2025', text: 'Two hundred pieces made, none of them repeated exactly.' },
  ],
};

export const atelierPage = {
  eyebrow: 'The atelier',
  title: 'Where the longer work happens',
  lede: 'Atelier pieces take weeks rather than days. More stones, more setting, and a written note on how each one came together.',
  art: { seed: 511, tone: 'indigo' },
  photo: PHOTOS.solderTorch,
  intro: [
    'The atelier is the part of the workshop that is not tied to a release. It is where a tennis bracelet gets graded stone by stone, where an heirloom is taken apart and rebuilt, and where a commission moves from a drawing to something you can put on.',
    'Work here is booked rather than queued. We take a small number of projects at a time so each one gets the bench to itself when it needs it.',
  ],
  capabilities: [
    {
      title: 'Stone sourcing',
      body: 'We buy to a brief. Tell us the colour, the size and the ceiling, and we will come back with options and honest notes on each.',
    },
    {
      title: 'Reworking heirlooms',
      body: 'Stones can be lifted from a setting that no longer suits and rebuilt into something worn more often. The original is documented before anything is cut.',
    },
    {
      title: 'Matched sets',
      body: 'Pairs and graduated runs, matched by eye across an entire parcel rather than by certificate alone.',
    },
    {
      title: 'Restoration',
      body: 'Worn prongs, thin shanks and stretched chains, repaired to hold for another decade rather than patched to last the season.',
    },
  ],
  process: [
    { step: '01', title: 'Brief', body: 'A conversation about the stone, the wear and the budget. No drawings yet.' },
    { step: '02', title: 'Sourcing', body: 'We show you what we can find, with the trade-offs of each option written down.' },
    { step: '03', title: 'Drawing', body: 'Two or three directions on paper, then one taken to a wax model you can try on.' },
    { step: '04', title: 'Bench', body: 'Casting, setting and finishing, with photographs sent at each stage.' },
    { step: '05', title: 'Handover', body: 'The finished piece, its notes, and a servicing schedule.' },
  ],
};

export const customPage = {
  eyebrow: 'Commissions',
  title: 'Commission a piece around a stone nobody else will wear',
  lede: 'Four to eight weeks from first conversation to finished piece, with a fixed price agreed before any metal is cut.',
  art: { seed: 521, tone: 'rose' },
  photo: PHOTOS.benchLamp,
  steps: [
    {
      step: '01',
      title: 'Tell us what you are after',
      body: 'A colour, an occasion, a stone you already own, or nothing more than a budget. The form below is enough to start.',
    },
    {
      step: '02',
      title: 'We source and quote',
      body: 'Within a week we come back with stone options and a fixed, itemised price. Nothing is charged at this point.',
    },
    {
      step: '03',
      title: 'Drawings and a wax',
      body: 'You approve a drawing, then a wax model in the exact dimensions, so the size is settled before casting.',
    },
    {
      step: '04',
      title: 'Built and handed over',
      body: 'Four to eight weeks at the bench. Half the balance on approval of the wax, half on completion.',
    },
  ],
  pricing: [
    { tier: 'Reset an existing stone', from: 900, note: 'Your stone, our setting and labour.' },
    { tier: 'Single stone commission', from: 1600, note: 'Stone sourced by us, one central stone.' },
    { tier: 'Multi-stone or matched set', from: 3200, note: 'Graduated runs, pairs and full suites.' },
  ],
  subjects: ['A new piece', 'Resetting an heirloom', 'A matched pair', 'Something else'],
  budgets: ['Under RM1,500', 'RM1,500 to RM3,000', 'RM3,000 to RM6,000', 'Above RM6,000'],
};

export const appointmentsPage = {
  eyebrow: 'Appointments',
  title: 'See the stones before you decide',
  lede: 'Private appointments at the workshop, or a video call with the parcel on the table.',
  art: { seed: 531, tone: 'aqua' },
  photo: PHOTOS.boxedNecklace,
  kinds: [
    {
      title: 'At the workshop',
      duration: '60 minutes',
      body: 'Come and look through what we have bought recently. You can try pieces on and watch work happening at the bench.',
    },
    {
      title: 'By video',
      duration: '30 minutes',
      body: 'We put the parcel under a lamp and a camera. Better than photographs for judging colour, and it costs nothing.',
    },
    {
      title: 'Travelling dates',
      duration: 'By arrangement',
      body: 'A few times a year we take a selection on the road. New York from 20 September to 02 November.',
    },
  ],
  times: ['10:00', '11:30', '14:00', '15:30', '17:00'],
};

export const stockistsPage = {
  eyebrow: 'Stockists',
  title: 'Where to find us in person',
  lede: 'A short list, kept short on purpose. Each of these holds a genuine selection rather than a single case.',
  art: { seed: 541, tone: 'moss' },
  photo: PHOTOS.ringOnFinger,
  stockists: [
    { city: 'Kuala Lumpur', name: 'The workshop', address: 'By appointment only', note: 'Full range, plus the stones not yet set.' },
    { city: 'Singapore', name: 'Keppel & Vale', address: '14 Bussorah Street', note: 'Earrings and rings.' },
    { city: 'Melbourne', name: 'North Merchant', address: '208 Gertrude Street', note: 'Seasonal selection.' },
    { city: 'London', name: 'Ardent Row', address: '9 Lamb Conduit Passage', note: 'Earrings only.' },
    { city: 'New York', name: 'Travelling, 20 Sep to 02 Nov', address: 'Location on booking', note: 'Full range.' },
  ],
};

export const journalPosts = [
  {
    slug: 'reading-colour-in-tourmaline',
    title: 'Reading colour in tourmaline',
    date: '2026-08-14',
    readingTime: '6 min',
    excerpt: 'Why the same stone looks green at the bench and grey by a window, and how we buy around it.',
    art: { seed: 551, tone: 'moss' },
    photo: PHOTOS.marbleBeads,
    body: [
      'Tourmaline is the most honest stone we buy and the hardest to photograph. It shifts more than almost anything else in the tray, and the shift is not a defect. It is a consequence of how the crystal grows.',
      'A rough crystal absorbs light differently along its length than across it. Cut one way you get a saturated green that holds up under a lamp. Cut the other way the same material goes flat and slightly grey. Most of the price difference between two stones that look identical in a photograph comes down to which of those two decisions the cutter made.',
      'When we buy, we look at every stone twice: once under the dealer\'s lamp, which flatters everything, and once by a window, which flatters nothing. A stone that survives both is worth paying for. A stone that only works under the lamp will disappoint the person wearing it within a week.',
      'This is also why we photograph pieces in daylight even though the lamp shots are prettier. You are going to wear it outside.',
    ],
  },
  {
    slug: 'what-a-wax-model-is-for',
    title: 'What a wax model is actually for',
    date: '2026-06-02',
    readingTime: '4 min',
    excerpt: 'The step in a commission that people want to skip, and the reason we never do.',
    art: { seed: 552, tone: 'pearl' },
    photo: PHOTOS.greenStoneRing,
    body: [
      'Every commission goes through a wax model, and roughly half the people who commission from us ask whether it can be skipped. It adds a week and it looks, frankly, like nothing much.',
      'The reason it stays is that a drawing cannot tell you how a piece sits. A ring that reads elegant on paper can turn out to catch on a sleeve. A pendant drawn at the right size can hang a few millimetres too low and sit wrong under a collar. You find this out by putting the wax on and living with it for an afternoon.',
      'Changes at the wax stage cost an hour. The same change after casting means starting again. That is the whole argument.',
    ],
  },
  {
    slug: 'buying-a-parcel',
    title: 'What happens when we buy a parcel',
    date: '2026-03-19',
    readingTime: '7 min',
    excerpt: 'Twenty stones arrive. Four become pieces. Here is what happens to the rest.',
    art: { seed: 553, tone: 'rose' },
    photo: PHOTOS.threeDiamonds,
    body: [
      'A parcel is rarely uniform. You buy twenty stones because four of them are exceptional and the dealer will not split the lot, and then you own sixteen stones with no home.',
      'Some of them are matched into pairs over the following months as similar material comes through. Some go into the case for commissions, where a client with a specific colour in mind will occasionally pick exactly the stone we could not place. A few get recut, which loses weight but can rescue a bad proportion.',
      'And some sit in a drawer for years. We have stones bought in the first season that still have not found the right setting. They are not losses. They are the reason the shop can offer something that was not designed by committee.',
    ],
  },
];

export const jewelleryCarePage = {
  eyebrow: 'Jewellery care',
  title: 'How to keep it looking like it did',
  lede: 'Solid gold and real stones are durable, not indestructible. A few habits make the difference over a decade.',
  art: { seed: 561, tone: 'pearl' },
  photo: PHOTOS.blueGreenRing,
  rules: [
    {
      title: 'Last on, first off',
      body: 'Put jewellery on after perfume, sunscreen and hairspray, and take it off before you take anything else off. Most dulling is a build-up of product, not wear.',
    },
    {
      title: 'Cleaning at home',
      body: 'Warm water, a drop of unscented dish soap and a soft toothbrush. Rinse properly and dry with a lint-free cloth. That handles almost everything.',
    },
    {
      title: 'What to keep it away from',
      body: 'Chlorine, bleach and saltwater. Chlorine attacks the alloys in gold over time, and the damage is structural rather than cosmetic.',
    },
    {
      title: 'Storing it',
      body: 'Separately, and flat. Stones scratch other stones, and chains left in a heap will knot in ways that cost more to undo than to replace.',
    },
  ],
  stones: [
    { stone: 'Sapphire, spinel, moissanite', note: 'Hard-wearing. Safe with soap and a brush.' },
    { stone: 'Tourmaline, aquamarine', note: 'Durable but dislikes knocks. Avoid ultrasonic cleaners.' },
    { stone: 'Pearl', note: 'Wipe with a damp cloth only. Never soak, never use a brush.' },
    { stone: 'Rose quartz', note: 'Can fade in prolonged direct sunlight. Store out of a window.' },
  ],
};

export const ringSizingPage = {
  eyebrow: 'Ring sizing',
  title: 'Getting the size right the first time',
  lede: 'Measure at the end of the day, on a warm hand, and take the larger of two readings.',
  art: { seed: 571, tone: 'lilac' },
  photo: PHOTOS.ringOnFinger,
  methods: [
    {
      title: 'With a ring you already wear',
      body: 'Measure the inside diameter in millimetres, across the widest point. Send us the number and we will convert it.',
    },
    {
      title: 'With a strip of paper',
      body: 'Wrap a strip around the base of the finger, mark where it overlaps, and measure the length in millimetres. That is the circumference.',
    },
    {
      title: 'Ask us for a sizer',
      body: 'We post a plastic ring sizer anywhere we ship, at no charge. It is the most reliable option and worth the wait.',
    },
  ],
  chart: [
    { size: 'H', diameter: '15.3mm', circumference: '48.0mm' },
    { size: 'J', diameter: '15.9mm', circumference: '50.0mm' },
    { size: 'L', diameter: '16.5mm', circumference: '51.9mm' },
    { size: 'N', diameter: '17.1mm', circumference: '53.8mm' },
    { size: 'P', diameter: '17.7mm', circumference: '55.7mm' },
    { size: 'R', diameter: '18.3mm', circumference: '57.6mm' },
    { size: 'S', diameter: '18.9mm', circumference: '59.5mm' },
  ],
  note: 'One free resize within twelve months on every ring, provided the band allows it. Flush-set and full-eternity designs cannot always be resized, and we will say so before you order.',
};

export const repairsPage = {
  eyebrow: 'Repairs and servicing',
  title: 'It comes back to the bench that made it',
  lede: 'Anything we made, we will service. Anything we did not, we will look at and tell you honestly.',
  art: { seed: 581, tone: 'indigo' },
  photo: PHOTOS.toolTable,
  services: [
    { service: 'Inspection and clean', price: 0, note: 'Free, always, on anything we made.' },
    { service: 'Rhodium or gold replating', price: 180, note: 'White gold, per piece.' },
    { service: 'Resize, first within 12 months', price: 0, note: 'Where the design allows.' },
    { service: 'Resize, thereafter', price: 220, note: 'Up or down two sizes.' },
    { service: 'Retip or replace prongs', price: 260, note: 'Per stone, including resetting.' },
    { service: 'Chain repair', price: 150, note: 'Soldered, not linked.' },
    { service: 'Stone replacement', price: null, note: 'Quoted after inspection.' },
  ],
  policy: [
    'Everything we make carries a two-year warranty against manufacturing fault, which covers setting failure and solder joints. It does not cover impact damage, loss, or wear that comes from ordinary use.',
    'Send a photograph before posting anything. Half the time we can tell you it is a five-minute fix, and occasionally we can tell you not to bother.',
    'Turnaround is two to three weeks for most work. Insured return shipping is included.',
  ],
};

export const faqPage = {
  eyebrow: 'FAQ',
  title: 'The questions we get most',
  lede: 'If something here is not covered, write to us. A real person answers.',
  art: { seed: 591, tone: 'aqua' },
  photo: PHOTOS.whiteCollection,
  groups: [
    {
      title: 'Ordering',
      items: [
        {
          q: 'Why is so much of the shop sold out?',
          a: 'Because most pieces are made in runs of two to six, and a few are made once. We do not restock a piece unless the same material comes through again, which is rarely.',
        },
        {
          q: 'Can you make another one of something sold out?',
          a: 'Sometimes. If the stone is findable we will quote it as a commission. If the piece was one of one, we will say so rather than substitute a stone quietly.',
        },
        {
          q: 'Do you hold pieces?',
          a: 'For 48 hours, once, by email. We do not hold anything against a deposit.',
        },
      ],
    },
    {
      title: 'Materials',
      items: [
        {
          q: 'Is the gold solid?',
          a: 'Yes. Everything is 14k solid gold unless a piece explicitly states otherwise. We do not sell plated or filled work.',
        },
        {
          q: 'Are the stones natural?',
          a: 'All natural except moissanite, which is lab grown and labelled as such on every piece that uses it.',
        },
        {
          q: 'Do stones come with certificates?',
          a: 'Stones above a certain value do. Below that, certification costs more than it tells you, and we would rather put the money into the setting.',
        },
      ],
    },
    {
      title: 'Wearing it',
      items: [
        {
          q: 'Can I shower in it?',
          a: 'You can, but do not swim in it. Chlorine and saltwater are the two things that genuinely shorten the life of solid gold.',
        },
        {
          q: 'Will it tarnish?',
          a: 'Solid gold does not tarnish. It can dull from product build-up, which soap and a soft brush will fix.',
        },
        {
          q: 'Is it safe for sensitive ears?',
          a: 'Yes. Posts and backs are solid gold with no nickel.',
        },
      ],
    },
  ],
};

export const customFaqPage = {
  eyebrow: 'Commission FAQ',
  title: 'Commissioning, answered plainly',
  lede: 'What it costs, how long it takes, and what happens if you change your mind.',
  art: { seed: 601, tone: 'rose' },
  photo: PHOTOS.benchWork,
  groups: [
    {
      title: 'Before you commit',
      items: [
        {
          q: 'What does it cost to start?',
          a: 'Nothing. Sourcing and quoting are free, and you owe nothing until you approve the wax model.',
        },
        {
          q: 'How long does it take?',
          a: 'Four to eight weeks once the wax is approved. Sourcing an unusual stone can add several weeks before that, and we will tell you up front if it will.',
        },
        {
          q: 'Can I use my own stone?',
          a: 'Yes, and it is the most common commission we take. We inspect and photograph it before any work starts, and we will tell you if it is too fragile to reset.',
        },
      ],
    },
    {
      title: 'During the build',
      items: [
        {
          q: 'Can I change the design partway?',
          a: 'Freely before the wax is approved. After casting, a change usually means starting the setting again, and we will quote it before doing anything.',
        },
        {
          q: 'Do I see progress?',
          a: 'Photographs at each stage: stone selection, drawing, wax, casting, setting, finish.',
        },
        {
          q: 'What if I do not like the wax?',
          a: 'We redraw it. That is exactly what the wax stage is for, and there is no charge for the first revision.',
        },
      ],
    },
    {
      title: 'Afterwards',
      items: [
        {
          q: 'Can a commission be returned?',
          a: 'No. Commissioned work is made to your specification, which is why the wax approval step exists.',
        },
        {
          q: 'Is it covered by the warranty?',
          a: 'Yes, on the same two-year terms as everything else we make.',
        },
      ],
    },
  ],
};

export const shippingPage = {
  eyebrow: 'Shipping and returns',
  title: 'Getting it to you, and back if it is wrong',
  lede: 'Everything ships insured and signed for. Nothing is left at a door.',
  art: { seed: 611, tone: 'pearl' },
  photo: PHOTOS.shippingBox,
  zones: [
    { zone: 'Malaysia', time: '1 to 3 working days', cost: 0, note: 'Free on every order.' },
    { zone: 'Singapore and Brunei', time: '2 to 4 working days', cost: 45, note: 'Free above RM500.' },
    { zone: 'Rest of Asia and Australia', time: '4 to 7 working days', cost: 90, note: 'Free above RM500.' },
    { zone: 'Europe, UK and North America', time: '5 to 10 working days', cost: 140, note: 'Free above RM500.' },
  ],
  returns: [
    'Fourteen days from delivery to start a return, on anything in the shop that has not been worn or altered.',
    'Commissions, resized rings and engraved pieces cannot be returned, because they were made to your specification.',
    'Return shipping is on us if the piece is faulty or not what was described. Otherwise it is on you, and it must be insured.',
    'Refunds go back to the original payment method within five working days of the piece arriving and passing inspection.',
  ],
  duties: 'Orders outside Malaysia may attract import duty. That is charged by the destination country and is not included in the price.',
};

export const trackOrderPage = {
  eyebrow: 'Track an order',
  title: 'Where is it',
  lede: 'Enter the order number from your confirmation email and the email address you used.',
  art: { seed: 621, tone: 'lilac' },
  photo: PHOTOS.shippingBox,
  stages: ['Order received', 'At the bench', 'Final inspection', 'Shipped', 'Delivered'],
  sample: {
    number: 'SW-4821',
    stage: 2,
    piece: 'Quarry ring, size N',
    updated: 'Updated yesterday at 16:40',
    note: 'Setting complete. Moving to polish and final inspection this week.',
  },
};

export const giftCardsPage = {
  eyebrow: 'Gift cards',
  title: 'When the choice should be theirs',
  lede: 'Sent by email within the hour, or posted on a printed card if you would rather hand it over.',
  art: { seed: 631, tone: 'blush' },
  photo: PHOTOS.ribbonBox,
  amounts: [250, 500, 1000, 1500, 2500],
  points: [
    'Valid for three years from the date of purchase.',
    'Can be spent across several orders, and the balance carries over.',
    'Works on commissions as well as pieces in the shop.',
    'Not refundable for cash, and cannot be replaced if the code is lost.',
  ],
};

export const contactPage = {
  eyebrow: 'Contact us',
  title: 'Write to a person, not a queue',
  lede: 'We answer within one working day, usually sooner.',
  art: { seed: 641, tone: 'aqua' },
  photo: PHOTOS.benchLamp,
  channels: [
    { label: 'General and orders', value: 'hello@stillwater.example', note: 'Within one working day.' },
    { label: 'Commissions', value: 'atelier@stillwater.example', note: 'Within two working days.' },
    { label: 'Repairs', value: 'bench@stillwater.example', note: 'Send a photograph first.' },
    { label: 'Press', value: 'press@stillwater.example', note: 'Assets on request.' },
  ],
  hours: [
    { day: 'Monday to Friday', time: '10:00 to 18:00' },
    { day: 'Saturday', time: '11:00 to 16:00, by appointment' },
    { day: 'Sunday', time: 'Closed' },
  ],
  subjects: ['An order', 'A commission', 'A repair', 'Something else'],
};
