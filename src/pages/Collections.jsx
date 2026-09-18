import { Link } from 'react-router-dom';
import { collectionCount, collections } from '../data/site';
import { PHOTOS } from '../data/media';
import Media from '../components/Media';
import Reveal from '../components/Reveal';
import { CtaBand, PageHero, usePageTitle } from '../components/PageKit';
import { Arrow } from '../components/Sections';
import Marquee from '../components/Marquee';

export default function Collections() {
  usePageTitle('Collections');

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Collections"
        lede="Seven ways into the same small catalogue. Most pieces appear in more than one."
        art={{ seed: 700, tone: 'lilac' }}
        photo={PHOTOS.whiteCollection}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Collections' }]}
      />

      <section className="section scheme-light">
        <div className="page-width collections-grid">
          {collections.map((collection, i) => (
            <Reveal key={collection.id} delay={i * 80} className="collection-tile">
              <Link to={`/collections/${collection.handle}`}>
                <div className="collection-tile__media">
                  <Media
                    photo={collection.photo}
                    art={collection.art}
                    alt={collection.title}
                    sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 30vw"
                  />
                  <span className="collection-tile__count">
                    {collectionCount(collection.handle)}{' '}
                    {collectionCount(collection.handle) === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>
                <div className="collection-tile__body">
                  <h2 className="collection-tile__title">{collection.title}</h2>
                  <p className="body-muted">{collection.blurb}</p>
                  <span className="collection-tile__go">
                    Open <Arrow direction="right" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee speed={30} scheme="scheme-soft" />

      <CtaBand
        heading="Cannot find the colour you had in mind?"
        body="Tell us what you are looking for and we will source it before we draw anything."
        primary={{ label: 'Start a commission', href: '/custom' }}
        secondary={{ label: 'Book an appointment', href: '/appointments' }}
        art={{ seed: 701, tone: 'indigo' }}
        photo={PHOTOS.benchLamp}
      />
    </>
  );
}
