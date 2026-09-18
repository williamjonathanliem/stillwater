import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { atelier, collectionCount, collections, intro, pillars, quote } from '../data/site';
import GemArt from './GemArt';
import Media from './Media';
import Reveal, { RevealLine } from './Reveal';
import { useReveal } from '../hooks/useReveal';

/* ---------------------------------------------------------------
   Intro: centred statement with a rule that draws itself open
---------------------------------------------------------------- */
export function Intro() {
  const [ref, revealed] = useReveal({ threshold: 0.25 });

  return (
    <section className="section section--tight intro scheme-light" id="intro" ref={ref} data-revealed={revealed}>
      <div className="page-width intro__inner">
        <Reveal as="p" className="eyebrow" delay={0}>
          {intro.eyebrow}
        </Reveal>

        <h2 className="intro__heading heading-lg">
          {intro.heading.split(', ').map((chunk, i, all) => (
            <RevealLine key={chunk} delay={140 + i * 120}>
              {chunk}
              {i < all.length - 1 ? ',' : ''}
            </RevealLine>
          ))}
        </h2>

        <span className="intro__rule" data-revealed={revealed} />

        <div className="intro__body">
          {intro.body.map((paragraph, i) => (
            <Reveal as="p" key={paragraph.slice(0, 20)} className="body-muted" delay={360 + i * 120}>
              {paragraph}
            </Reveal>
          ))}
        </div>

        <Reveal delay={620}>
          <Link className="button button--outline" to={intro.cta.href}>
            {intro.cta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Collections: a draggable rail of tall cards
---------------------------------------------------------------- */
export function CollectionList({ items = collections.filter((c) => c.handle !== 'all') }) {
  const railRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const nudge = (step) => {
    const node = railRef.current;
    if (!node) return;
    node.scrollBy({ left: step * node.clientWidth * 0.6, behavior: 'smooth' });
  };

  return (
    <section className="section collection-list scheme-soft" id="collections">
      <div className="page-width">
        <div className="collection-list__head">
          <h2 className="heading-md">
            <RevealLine>Shop by collection</RevealLine>
          </h2>
          <Reveal className="collection-list__nav" delay={120}>
            <button type="button" onClick={() => nudge(-1)} aria-label="Scroll collections left">
              <Arrow direction="left" />
            </button>
            <button type="button" onClick={() => nudge(1)} aria-label="Scroll collections right">
              <Arrow direction="right" />
            </button>
          </Reveal>
        </div>
      </div>

      <div className="collection-list__rail" ref={railRef} onMouseLeave={() => setHovered(null)}>
        {items.map((collection, i) => (
          <Reveal
            key={collection.id}
            delay={i * 80}
            className="collection-card"
            data-dimmed={hovered !== null && hovered !== collection.id}
            onMouseEnter={() => setHovered(collection.id)}
          >
            <Link to={`/collections/${collection.handle}`}>
              <div className="collection-card__media">
                <Media
                  photo={collection.photo}
                  art={collection.art}
                  ratio={1.333}
                  alt={collection.title}
                  sizes="(max-width: 640px) 70vw, 20vw"
                />
                <span className="collection-card__count">
                  {collectionCount(collection.handle)}{' '}
                  {collectionCount(collection.handle) === 1 ? 'piece' : 'pieces'}
                </span>
              </div>
              <div className="collection-card__footer">
                <h3>{collection.title}</h3>
                <Arrow direction="right" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Pillars
---------------------------------------------------------------- */
export function Pillars() {
  return (
    <section className="section pillars scheme-light" id="story">
      <div className="page-width pillars__grid">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 150} className="pillar">
            <span className="pillar__icon">
              <PillarIcon name={pillar.icon} />
            </span>
            <h3 className="pillar__title">{pillar.title}</h3>
            <p className="pillar__body body-muted">{pillar.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Atelier teaser
---------------------------------------------------------------- */
export function Atelier() {
  return (
    <section className="section atelier scheme-soft" id="atelier">
      <div className="page-width atelier__grid">
        <Reveal className="atelier__media" variant="reveal--scale">
          <GemArt seed={atelier.art.seed} tone={atelier.art.tone} variant="chain" />
        </Reveal>

        <div className="atelier__body">
          <Reveal as="p" className="eyebrow">
            {atelier.eyebrow}
          </Reveal>
          <h2 className="heading-lg atelier__heading">
            <RevealLine delay={120}>{atelier.heading}</RevealLine>
          </h2>
          <Reveal as="p" className="body-muted" delay={260}>
            {atelier.body}
          </Reveal>
          <ul className="atelier__points">
            {atelier.points.map((point, i) => (
              <Reveal as="li" key={point} delay={380 + i * 110}>
                <span className="atelier__marker" />
                {point}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={720}>
            <Link className="button" to={atelier.cta.href}>
              {atelier.cta.label}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Closing quote over a full-bleed backdrop
---------------------------------------------------------------- */
export function ClosingHero() {
  const [ref, revealed] = useReveal({ threshold: 0.3 });

  return (
    <section className="closing scheme-inverse" ref={ref} data-revealed={revealed}>
      <div className="closing__media">
        <GemArt seed={301} tone="indigo" variant="scene" className="closing__art" />
        <div className="closing__overlay" />
      </div>

      <div className="closing__content page-width">
        <h2 className="display closing__quote">
          {quote.text.split(', ').map((line, i, all) => (
            <RevealLine key={line} delay={i * 160}>
              {line}
              {i < all.length - 1 ? ',' : ''}
            </RevealLine>
          ))}
        </h2>
        <Reveal delay={520}>
          <Link className="button" to={quote.cta.href}>
            {quote.cta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   icons
---------------------------------------------------------------- */
function PillarIcon({ name }) {
  if (name === 'compass') {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="0.9" />
        <path d="m20.5 11.5-2.6 7-7 2.6 2.6-7 7-2.6Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'hand') {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M11 17V9.5a1.6 1.6 0 0 1 3.2 0V16m0-1v-6.6a1.6 1.6 0 0 1 3.2 0V16m0-1.4v-4a1.6 1.6 0 0 1 3.2 0V19c0 4-2.6 6.4-6.2 6.4S8 23 8 19.4v-2.9a1.5 1.5 0 0 1 3 0Z"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M10 8h12l4 6-10 12L6 14l4-6Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M6 14h20M10 8l6 18M22 8l-6 18" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

export function Arrow({ direction }) {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      aria-hidden="true"
      className="arrow"
      data-direction={direction}
    >
      <path d="M1 5h16m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
