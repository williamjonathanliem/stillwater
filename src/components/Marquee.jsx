import { marqueeItems } from '../data/site';

/**
 * Seamless ticker.
 *
 * The track holds two identical runs and translates by exactly -50%, which
 * is the width of one run. For that to be exact the runs cannot sit in a
 * flex `gap`, or the gap between them would be counted once and the loop
 * would jump. Instead every item carries its own trailing gap, so the two
 * runs butt together perfectly and the seam is invisible.
 *
 * Each run repeats the phrase list enough times to overflow the widest
 * viewport, so the strip is never left half empty.
 */
const REPEATS = 3;

export default function Marquee({ speed = 26, direction = 'normal', scheme = 'scheme-soft' }) {
  const phrases = Array.from({ length: REPEATS }, () => marqueeItems).flat();

  const run = (key) => (
    <div className="marquee__run" key={key} aria-hidden={key !== 'a'}>
      {phrases.map((item, i) => (
        <span className="marquee__item" key={`${key}-${i}`}>
          <span className="marquee__label">{item}</span>
          <Diamond />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee ${scheme}`}
      style={{ '--marquee-speed': `${speed}s`, '--marquee-direction': direction }}
    >
      <div className="marquee__track">
        {run('a')}
        {run('b')}
      </div>
    </div>
  );
}

function Diamond() {
  return (
    <svg className="marquee__dot" width="7" height="7" viewBox="0 0 7 7" aria-hidden="true">
      <path d="M3.5 0 7 3.5 3.5 7 0 3.5Z" fill="currentColor" />
    </svg>
  );
}
