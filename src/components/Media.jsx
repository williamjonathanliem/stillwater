import { useState } from 'react';
import GemArt from './GemArt';
import { unsplashSrcSet, unsplashUrl } from '../data/media';

const WIDTHS = [400, 600, 900, 1200, 1600];

/**
 * Renders a reference photograph, falling back to the generated artwork.
 *
 * The generated art stays underneath as a placeholder, so the frame is
 * never empty while the photo loads and never breaks if it fails. Every
 * wrapper in the site owns its own aspect ratio, so this only has to
 * fill it.
 */
export default function Media({
  photo,
  art,
  ratio = 1.25,
  sizes = '(max-width: 900px) 100vw, 40vw',
  priority = false,
  className = '',
  alt,
}) {
  const [state, setState] = useState('loading');

  const showArt = !photo || state === 'error';

  return (
    <span className={`media ${className}`} data-state={state}>
      {art && (
        <span className="media__art" aria-hidden="true" data-hidden={!showArt && state === 'loaded'}>
          <GemArt seed={art.seed} tone={art.tone} variant={art.variant || 'stone'} />
        </span>
      )}

      {photo && state !== 'error' && (
        <img
          className="media__img"
          src={unsplashUrl(photo.base, { w: 900, h: Math.round(900 * ratio) })}
          srcSet={unsplashSrcSet(photo.base, WIDTHS, ratio)}
          sizes={sizes}
          alt={alt ?? photo.alt ?? ''}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : undefined}
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      )}
    </span>
  );
}
