import { customFaqPage, faqPage, jewelleryCarePage, repairsPage, ringSizingPage } from '../data/content';
import { useShop } from '../context/ShopContext';
import { PHOTOS } from '../data/media';
import Reveal, { RevealLine } from '../components/Reveal';
import {
  Accordion,
  CtaBand,
  DataTable,
  PageHero,
  Prose,
  ProseBlock,
  usePageTitle,
} from '../components/PageKit';

/* ---------------------------------------------------------------
   Jewellery care
---------------------------------------------------------------- */
export function JewelleryCare() {
  usePageTitle('Jewellery care');

  return (
    <>
      <PageHero
        eyebrow={jewelleryCarePage.eyebrow}
        title={jewelleryCarePage.title}
        lede={jewelleryCarePage.lede}
        art={jewelleryCarePage.art}
        photo={jewelleryCarePage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Jewellery care' }]}
      />

      <section className="section scheme-light">
        <div className="page-width">
          <div className="capability-grid">
            {jewelleryCarePage.rules.map((rule, i) => (
              <Reveal key={rule.title} className="capability" delay={i * 100}>
                <span className="capability__rule" aria-hidden="true" />
                <h2 className="capability__title">{rule.title}</h2>
                <p className="body-muted">{rule.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section scheme-soft">
        <div className="page-width">
          <h2 className="heading-md section-head">
            <RevealLine>Stone by stone</RevealLine>
          </h2>
          <DataTable
            columns={['Stone', 'What it wants']}
            rows={jewelleryCarePage.stones.map((row) => [row.stone, row.note])}
          />
        </div>
      </section>

      <CtaBand
        heading="Anything we made, we will service"
        body="Inspection and cleaning are free, for as long as you own it."
        primary={{ label: 'Repairs and servicing', href: '/repairs' }}
        secondary={{ label: 'Ask us something', href: '/contact' }}
        art={{ seed: 562, tone: 'pearl' }}
        photo={PHOTOS.boxedNecklace}
      />
    </>
  );
}

/* ---------------------------------------------------------------
   Ring sizing
---------------------------------------------------------------- */
export function RingSizing() {
  usePageTitle('Ring sizing');

  return (
    <>
      <PageHero
        eyebrow={ringSizingPage.eyebrow}
        title={ringSizingPage.title}
        lede={ringSizingPage.lede}
        art={ringSizingPage.art}
        photo={ringSizingPage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Ring sizing' }]}
      />

      <section className="section scheme-light">
        <div className="page-width">
          <div className="capability-grid capability-grid--three">
            {ringSizingPage.methods.map((method, i) => (
              <Reveal key={method.title} className="capability" delay={i * 110}>
                <span className="capability__rule" aria-hidden="true" />
                <h2 className="capability__title">{method.title}</h2>
                <p className="body-muted">{method.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section scheme-soft">
        <div className="page-width">
          <h2 className="heading-md section-head">
            <RevealLine>Size chart</RevealLine>
          </h2>
          <DataTable
            columns={['Size', 'Inside diameter', 'Circumference']}
            rows={ringSizingPage.chart.map((row) => [row.size, row.diameter, row.circumference])}
            caption="UK and Australian sizing"
          />
          <Reveal as="p" className="body-muted table-note" delay={200}>
            {ringSizingPage.note}
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Still unsure?"
        body="We will post a plastic ring sizer anywhere we ship, at no charge."
        primary={{ label: 'Ask for a sizer', href: '/contact' }}
        secondary={{ label: 'Shop rings', href: '/collections/rings' }}
        art={{ seed: 572, tone: 'lilac' }}
        photo={PHOTOS.ringCollection}
      />
    </>
  );
}

/* ---------------------------------------------------------------
   Repairs
---------------------------------------------------------------- */
export function Repairs() {
  usePageTitle('Repairs and servicing');
  const { format } = useShop();

  return (
    <>
      <PageHero
        eyebrow={repairsPage.eyebrow}
        title={repairsPage.title}
        lede={repairsPage.lede}
        art={repairsPage.art}
        photo={repairsPage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Repairs and servicing' }]}
      />

      <section className="section scheme-light">
        <div className="page-width">
          <h2 className="heading-md section-head">
            <RevealLine>What things cost</RevealLine>
          </h2>
          <DataTable
            columns={['Service', 'Price', 'Notes']}
            rows={repairsPage.services.map((row) => [
              row.service,
              row.price === null ? 'On inspection' : row.price === 0 ? 'Free' : format(row.price, { withCode: false }),
              row.note,
            ])}
          />
        </div>
      </section>

      <section className="section scheme-soft">
        <div className="page-width">
          <Prose>
            <ProseBlock heading="The terms, plainly" body={repairsPage.policy} />
          </Prose>
        </div>
      </section>

      <CtaBand
        heading="Send a photograph before you post anything"
        body="Half the time we can tell you it is a quick fix, and occasionally that it does not need fixing."
        primary={{ label: 'Email the bench', href: '/contact' }}
        secondary={{ label: 'Jewellery care', href: '/jewellery-care' }}
        art={{ seed: 582, tone: 'indigo' }}
        photo={PHOTOS.benchWork}
      />
    </>
  );
}

/* ---------------------------------------------------------------
   FAQ pages, both driven by the same grouped accordion
---------------------------------------------------------------- */
function FaqLayout({ page, breadcrumbLabel, cta }) {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        art={page.art}
        photo={page.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: breadcrumbLabel }]}
      />

      <section className="section scheme-light">
        <div className="page-width faq-layout">
          {page.groups.map((group, i) => (
            <div className="faq-group" key={group.title}>
              <h2 className="faq-group__title">
                <RevealLine delay={i * 80}>{group.title}</RevealLine>
              </h2>
              <Accordion items={group.items} />
            </div>
          ))}
        </div>
      </section>

      <CtaBand {...cta} />
    </>
  );
}

export function Faq() {
  usePageTitle('FAQ');
  return (
    <FaqLayout
      page={faqPage}
      breadcrumbLabel="FAQ"
      cta={{
        heading: 'Not covered here?',
        body: 'Write to us. A real person reads it and answers within a working day.',
        primary: { label: 'Contact us', href: '/contact' },
        secondary: { label: 'Shipping and returns', href: '/shipping-returns' },
        art: { seed: 592, tone: 'aqua' },
        photo: PHOTOS.boxedRing,
      }}
    />
  );
}

export function CustomFaq() {
  usePageTitle('Commission FAQ');
  return (
    <FaqLayout
      page={customFaqPage}
      breadcrumbLabel="Commission FAQ"
      cta={{
        heading: 'Ready to start?',
        body: 'Sourcing and quoting are free, and nothing is charged until the wax is approved.',
        primary: { label: 'Send a brief', href: '/custom' },
        secondary: { label: 'See the atelier', href: '/atelier' },
        art: { seed: 602, tone: 'rose' },
        photo: PHOTOS.workbench,
      }}
    />
  );
}
