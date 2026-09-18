import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Media from '../components/Media';
import { PHOTOS } from '../data/media';
import { usePageTitle } from '../components/PageKit';

export default function NotFound() {
  usePageTitle('Not found');

  return (
    <section className="section scheme-light not-found">
      <div className="not-found__art" aria-hidden="true">
        <Media photo={PHOTOS.toolTable} art={{ seed: 909, tone: 'pearl', variant: 'scene' }} ratio={0.5} alt="" priority sizes="100vw" />
        <span className="not-found__scrim" />
      </div>

      <div className="page-width not-found__inner">
        <Reveal as="p" className="eyebrow">
          404
        </Reveal>
        <Reveal as="h1" className="heading-lg" delay={120}>
          That page is not here
        </Reveal>
        <Reveal as="p" className="body-muted" delay={220}>
          Pieces come and go quickly, so a link to something sold out sometimes stops working. These should still be
          good.
        </Reveal>
        <Reveal className="not-found__actions" delay={320}>
          <Link className="button" to="/collections/all">
            Browse the shop
          </Link>
          <Link className="button button--outline" to="/contact">
            Ask us what happened
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
