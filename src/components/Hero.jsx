import { useEffect, useRef, useState } from 'react';
import { hero } from '../data/site';
import { heroVideo, unsplashUrl } from '../data/media';

/**
 * Full-viewport hero with a looping video background and the heading
 * centred over it.
 *
 * The poster photograph is painted first and stays until the video has
 * actually started, so there is never an empty black frame. If the video
 * cannot play at all, which is the case when a browser blocks autoplay
 * or the network refuses the file, the poster simply remains and the
 * hero still reads correctly.
 */
export default function Hero() {
  const videoRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [videoState, setVideoState] = useState('idle');

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVideoState('reduced');
      return undefined;
    }

    // React sets `muted` as a property but does not reflect it to the
    // attribute, and some browsers read the attribute when deciding
    // whether autoplay is allowed. Set both.
    node.muted = true;
    node.setAttribute('muted', '');

    // Autoplay is refused outright while the document is hidden, so a page
    // opened in a background tab would otherwise sit on its poster forever.
    // Try now, and try again whenever the tab comes back to the front.
    const attempt = () => {
      if (document.hidden) return;
      const played = node.play();
      if (played && typeof played.catch === 'function') {
        played.catch(() => setVideoState('blocked'));
      }
    };

    attempt();
    document.addEventListener('visibilitychange', attempt);
    return () => document.removeEventListener('visibilitychange', attempt);
  }, []);

  const posterUrl = unsplashUrl(heroVideo.poster.base, { w: 1920, h: 1080 });

  return (
    <section className="hero scheme-inverse" id="top" data-mounted={mounted} data-video={videoState}>
      <div className="hero__media">
        <img className="hero__poster" src={posterUrl} alt="" aria-hidden="true" fetchpriority="high" />

        <video
          ref={videoRef}
          className="hero__video"
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setVideoState('playing')}
          onError={() => setVideoState('error')}
        >
          {heroVideo.sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>

        <div className="hero__overlay" />
        <div className="hero__vignette" />
      </div>

      <div className="hero__content page-width">
        <p className="hero__eyebrow" style={{ '--d': '160ms' }}>
          {hero.eyebrow}
        </p>

        <h1 className="hero__heading display">
          {hero.lines.map((line, i) => (
            <span className="hero__line" key={line} style={{ '--d': `${300 + i * 150}ms` }}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero__caption" style={{ '--d': '660ms' }}>
          {hero.caption}
        </p>
      </div>

      <a className="hero__scroll" href="#intro" aria-label="Scroll to content">
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}
