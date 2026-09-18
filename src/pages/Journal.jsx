import { Link, useParams } from 'react-router-dom';
import { journalPosts } from '../data/content';
import { PHOTOS } from '../data/media';
import GemArt from '../components/GemArt';
import Media from '../components/Media';
import Reveal, { RevealLine } from '../components/Reveal';
import { Breadcrumb, CtaBand, PageHero, usePageTitle } from '../components/PageKit';
import NotFound from './NotFound';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ---------------------------------------------------------------
   Journal index
---------------------------------------------------------------- */
export function Journal() {
  usePageTitle('Journal');

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the bench"
        lede="Occasional writing about stones, setting, and the decisions behind a piece."
        art={{ seed: 550, tone: 'pearl' }}
        photo={PHOTOS.openBook}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
      />

      <section className="section scheme-light">
        <div className="page-width">
          <ul className="journal-list">
            {journalPosts.map((post, i) => (
              <Reveal as="li" key={post.slug} className="journal-card" delay={i * 110}>
                <Link to={`/journal/${post.slug}`}>
                  <div className="journal-card__media">
                    <Media
                      photo={post.photo}
                      art={post.art}
                      ratio={0.8}
                      alt={post.title}
                      sizes="(max-width: 900px) 100vw, 35vw"
                    />
                  </div>
                  <div className="journal-card__body">
                    <p className="journal-card__meta eyebrow">
                      {formatDate(post.date)} · {post.readingTime}
                    </p>
                    <h2 className="journal-card__title">{post.title}</h2>
                    <p className="body-muted">{post.excerpt}</p>
                    <span className="journal-card__more link-underline link-underline--static">Read it</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="We write when there is something worth saying"
        body="Which is not often. The list gets it first, along with new stones."
        primary={{ label: 'See the shop', href: '/collections/all' }}
        secondary={{ label: 'Our story', href: '/our-story' }}
        art={{ seed: 554, tone: 'lilac' }}
        photo={PHOTOS.benchWork}
      />
    </>
  );
}

/* ---------------------------------------------------------------
   Single post
---------------------------------------------------------------- */
export function JournalPost() {
  const { slug } = useParams();
  const post = journalPosts.find((item) => item.slug === slug);
  const index = journalPosts.findIndex((item) => item.slug === slug);
  const next = journalPosts[(index + 1) % journalPosts.length];

  usePageTitle(post ? post.title : 'Not found');

  if (!post) return <NotFound />;

  return (
    <>
      <article className="section scheme-light article">
        <div className="page-width">
          <Breadcrumb
            trail={[
              { label: 'Home', href: '/' },
              { label: 'Journal', href: '/journal' },
              { label: post.title },
            ]}
          />

          <header className="article__head">
            <Reveal as="p" className="eyebrow">
              {formatDate(post.date)} · {post.readingTime}
            </Reveal>
            <h1 className="article__title display">
              <RevealLine delay={120}>{post.title}</RevealLine>
            </h1>
            <Reveal as="p" className="article__excerpt" delay={280}>
              {post.excerpt}
            </Reveal>
          </header>

          <Reveal className="article__media" variant="reveal--scale">
            <Media
              photo={post.photo}
              art={{ ...post.art, variant: 'scene' }}
              ratio={0.4375}
              alt={post.title}
              priority
              sizes="100vw"
            />
          </Reveal>

          <div className="article__body">
            {post.body.map((paragraph, i) => (
              <Reveal as="p" key={paragraph.slice(0, 24)} delay={i * 70}>
                {paragraph}
              </Reveal>
            ))}
          </div>

          <Reveal className="article__next">
            <p className="eyebrow">Next</p>
            <Link className="article__next-link" to={`/journal/${next.slug}`}>
              {next.title}
            </Link>
          </Reveal>
        </div>
      </article>
    </>
  );
}
