import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll. Mirrors the "cascade" behaviour of the source
 * theme: an element crosses the threshold once, then stays revealed.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, revealed];
}

/** Current scroll offset plus the direction of the last movement. */
export function useScrollState(threshold = 12) {
  const [state, setState] = useState({ y: 0, direction: 'none', past: false });

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - last;
      let direction = 'none';
      if (Math.abs(delta) > threshold) {
        direction = delta > 0 ? 'down' : 'up';
        last = y;
      }
      setState((prev) => ({
        y,
        direction: direction === 'none' ? prev.direction : direction,
        past: y > 40,
      }));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
}

/** Locks body scroll while a drawer or modal is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const previous = document.body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.dataset.scrollLocked = 'true';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      delete document.body.dataset.scrollLocked;
      document.body.style.paddingRight = previous;
    };
  }, [locked]);
}

/** Closes something on Escape. */
export function useEscape(active, onEscape) {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onEscape();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, onEscape]);
}

/** Normalised pointer position over an element, for parallax. */
export function usePointerParallax(strength = 8) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined;

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: x * strength, y: y * strength });
    };
    const onLeave = () => setOffset({ x: 0, y: 0 });

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);

  return [ref, offset];
}
