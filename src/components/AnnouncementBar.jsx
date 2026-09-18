import { useEffect, useState } from 'react';
import { announcements } from '../data/site';

/**
 * The thin indigo strip above the header. Messages rotate on a timer,
 * each one sliding up as the previous one leaves.
 */
export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || announcements.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % announcements.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (step) => {
    setIndex((current) => (current + step + announcements.length) % announcements.length);
  };

  return (
    <div
      className="announcement scheme-indigo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="announcement__inner page-width">
        <button className="announcement__arrow" type="button" onClick={() => go(-1)} aria-label="Previous announcement">
          <Chevron direction="left" />
        </button>

        <div className="announcement__viewport">
          {announcements.map((message, i) => (
            <p
              key={message}
              className="announcement__item"
              data-state={i === index ? 'current' : i === (index - 1 + announcements.length) % announcements.length ? 'previous' : 'next'}
              aria-hidden={i !== index}
            >
              {message}
            </p>
          ))}
        </div>

        <button className="announcement__arrow" type="button" onClick={() => go(1)} aria-label="Next announcement">
          <Chevron direction="right" />
        </button>
      </div>
    </div>
  );
}

function Chevron({ direction }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M6.5 1.5 3 5l3.5 3.5' : 'M3.5 1.5 7 5l-3.5 3.5'}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
