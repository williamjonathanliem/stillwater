import { Link } from 'react-router-dom';
import { atelierPage } from '../data/content';
import { productsInCollection } from '../data/site';
import ProductCard from '../components/ProductCard';
import Reveal, { RevealLine } from '../components/Reveal';
import Media from '../components/Media';
import { PHOTOS } from '../data/media';
import { CtaBand, PageHero, StepLadder, usePageTitle } from '../components/PageKit';

export default function AtelierPage() {
  usePageTitle('The atelier');
  const pieces = productsInCollection('atelier');

  return (
    <>
      <PageHero
        eyebrow={atelierPage.eyebrow}
        title={atelierPage.title}
        lede={atelierPage.lede}
        art={atelierPage.art}
        photo={atelierPage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'The atelier' }]}
      >
        <Link className="button" to="/custom">
          Start a commission
        </Link>
      </PageHero>

      <section className="section scheme-light">
        <div className="page-width atelier-intro">
          <Reveal className="atelier-intro__media" variant="reveal--scale">
            <Media photo={PHOTOS.workbench} art={{ seed: 512, tone: 'pearl', variant: 'chain' }} alt="" sizes="(max-width: 900px) 100vw, 40vw" />
          </Reveal>
          <div className="atelier-intro__body">
            {atelierPage.intro.map((paragraph, i) => (
              <Reveal as="p" key={paragraph.slice(0, 24)} className="atelier-intro__lede" delay={i * 140}>
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section scheme-soft">
        <div className="page-width">
          <h2 className="heading-md section-head">
            <RevealLine>What the bench takes on</RevealLine>
          </h2>
          <div className="capability-grid">
            {atelierPage.capabilities.map((capability, i) => (
              <Reveal key={capability.title} className="capability" delay={i * 100}>
                <span className="capability__rule" aria-hidden="true" />
                <h3 className="capability__title">{capability.title}</h3>
                <p className="body-muted">{capability.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section scheme-light">
        <div className="page-width">
          <h2 className="heading-md section-head">
            <RevealLine>How a project runs</RevealLine>
          </h2>
          <StepLadder steps={atelierPage.process} />
        </div>
      </section>

      {pieces.length > 0 && (
        <section className="section scheme-soft">
          <div className="page-width">
            <h2 className="heading-md section-head">
              <RevealLine>Atelier pieces in the shop</RevealLine>
            </h2>
            <div className="product-grid">
              {pieces.map((product, i) => (
                <Reveal key={product.id} delay={i * 90}>
                  <ProductCard product={product} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        heading="Bring us a stone, or let us find one"
        body="Sourcing and quoting cost nothing, and you owe nothing until the wax is approved."
        primary={{ label: 'Start a commission', href: '/custom' }}
        secondary={{ label: 'Commission FAQ', href: '/custom-faq' }}
        art={{ seed: 513, tone: 'indigo' }}
        photo={PHOTOS.solderTorch}
      />
    </>
  );
}
