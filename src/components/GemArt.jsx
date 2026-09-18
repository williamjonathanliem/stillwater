import { useMemo } from 'react';

/**
 * Original, procedurally drawn stand-in artwork.
 *
 * Every image on the site is generated here from a numeric seed, so the
 * build ships with no third-party photography. Replace <GemArt /> with an
 * <img> when real product shots exist; the wrappers own aspect ratio and
 * hover behaviour, so nothing else has to change.
 *
 * variants:
 *   stone  - a single set gemstone on draped fabric (product tiles)
 *   chain  - a strung piece laid in a curve (editorial panels)
 *   scene  - a wide, out-of-focus atmosphere (hero backdrops)
 */

// [wash, mid, deep, shadow] per tone
const TONES = {
  lilac: ['#ded3f0', '#a48ccd', '#4b3a7a', '#2c2049'],
  rose: ['#f0d6dd', '#d094a4', '#8a3f52', '#4d2130'],
  blush: ['#f2dccd', '#d6a184', '#8f5637', '#512d1a'],
  aqua: ['#cfe3e8', '#84aeba', '#2f6675', '#173d47'],
  moss: ['#d8e5d5', '#8fae8a', '#3f6b45', '#1f3a25'],
  indigo: ['#d3d7ec', '#8f97c9', '#232c66', '#1b2352'],
  pearl: ['#ece7e0', '#c0b6a8', '#6f6558', '#3a3229'],
};

// deterministic pseudo-random so a seed always draws the same piece
function makeRandom(seed) {
  let value = (seed * 9301 + 49297) % 233280;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export default function GemArt({ seed = 1, tone = 'lilac', variant = 'stone', className = '' }) {
  const id = `g${seed}-${tone}-${variant}`;
  const [wash, mid, deep, shade] = TONES[tone] || TONES.lilac;

  if (variant === 'scene') {
    return <Scene id={id} seed={seed} wash={wash} mid={mid} deep={deep} shade={shade} className={className} />;
  }

  return (
    <Piece
      id={id}
      seed={seed}
      wash={wash}
      mid={mid}
      deep={deep}
      shade={shade}
      variant={variant}
      className={className}
    />
  );
}

/* ---------------------------------------------------------------
   A single piece of jewellery, shot from above on folded fabric
---------------------------------------------------------------- */
function Piece({ id, seed, wash, mid, deep, shade, variant, className }) {
  const { hull, facets, rotate, folds } = useMemo(() => {
    const random = makeRandom(seed);
    const count = 7 + Math.floor(random() * 3);
    const points = [];
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2 + (random() - 0.5) * 0.22;
      const radius = 22 + random() * 7;
      points.push([50 + Math.cos(angle) * radius, 52 + Math.sin(angle) * radius * 1.05]);
    }
    return {
      facets: points,
      hull: points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '),
      rotate: (random() - 0.5) * 26,
      folds: [0, 1, 2].map(() => 0.3 + random() * 0.5),
    };
  }, [seed]);

  const inner = facets.map((p) => [50 + (p[0] - 50) * 0.42, 52 + (p[1] - 52) * 0.42]);
  const innerPoints = inner.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

  return (
    <svg
      className={`gem-art ${className}`}
      viewBox="0 0 100 125"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-cloth`} x1="0.1" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="42%" stopColor={wash} />
          <stop offset="100%" stopColor={mid} stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id={`${id}-key`} cx="0.34" cy="0.26" r="0.72">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor={shade} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-table`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="38%" stopColor={mid} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbf0d6" />
          <stop offset="38%" stopColor="#dcbe85" />
          <stop offset="72%" stopColor="#b08c48" />
          <stop offset="100%" stopColor="#e6cd9b" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
        <filter id={`${id}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* fabric */}
      <rect width="100" height="125" fill={`url(#${id}-cloth)`} />
      {folds.map((f, i) => (
        <path
          key={i}
          d={`M-6 ${28 + i * 34 + f * 12} Q ${26 + i * 8} ${12 + i * 32 + f * 20}, ${54 + i * 6} ${32 + i * 33 + f * 10} T 106 ${24 + i * 34 + f * 16}`}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.55 - i * 0.12}
          strokeWidth={5 + f * 4}
          filter={`url(#${id}-blur)`}
        />
      ))}
      <path
        d="M-4 96 Q 30 82 62 99 T 104 92 V129 H-4 Z"
        fill={shade}
        opacity="0.12"
        filter={`url(#${id}-blur)`}
      />
      <ellipse cx="34" cy="40" rx="52" ry="46" fill={`url(#${id}-key)`} />

      <g transform={`rotate(${rotate.toFixed(1)} 50 58)`}>
        {variant === 'chain' ? (
          <g>
            <ellipse cx="50" cy="92" rx="30" ry="6" fill={shade} opacity="0.2" filter={`url(#${id}-blur)`} />
            <path
              d="M16 52 C 26 96, 74 96, 84 52"
              fill="none"
              stroke={`url(#${id}-metal)`}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M16 52 C 26 96, 74 96, 84 52"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.5"
              strokeWidth="0.4"
              strokeLinecap="round"
            />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const t = i / 6;
              const x = 16 + t * 68;
              const y = 52 + Math.sin(t * Math.PI) * 36;
              const big = i === 3;
              return (
                <g key={i}>
                  <polygon
                    points={
                      big
                        ? `${x},${y - 8} ${x + 6},${y} ${x},${y + 8} ${x - 6},${y}`
                        : `${x},${y - 3} ${x + 2.3},${y} ${x},${y + 3} ${x - 2.3},${y}`
                    }
                    fill={`url(#${id}-table)`}
                    stroke="#ffffff"
                    strokeOpacity="0.6"
                    strokeWidth="0.4"
                  />
                  {big && (
                    <polygon
                      points={`${x},${y - 3.4} ${x + 2.6},${y} ${x},${y + 3.4} ${x - 2.6},${y}`}
                      fill="#ffffff"
                      opacity="0.42"
                    />
                  )}
                </g>
              );
            })}
          </g>
        ) : (
          <g>
            {/* cast shadow */}
            <ellipse cx="53" cy="80" rx="23" ry="8" fill={shade} opacity="0.26" filter={`url(#${id}-blur)`} />

            {/* post and bail */}
            <path d="M50 22 L50 32" stroke={`url(#${id}-metal)`} strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="50" cy="19" rx="4.6" ry="4.2" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="1.5" />
            <ellipse cx="50" cy="19" rx="4.6" ry="4.2" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="0.4" />

            {/* pavilion showing through */}
            <polygon points={hull} fill={deep} opacity="0.55" transform="translate(1.4 2.2)" />

            {/* crown */}
            <polygon points={hull} fill={`url(#${id}-table)`} />

            {/* facets */}
            {facets.map((p, i) => {
              const next = facets[(i + 1) % facets.length];
              const ip = inner[i];
              const inext = inner[(i + 1) % inner.length];
              const lit = (i + seed) % 3;
              return (
                <g key={i}>
                  <polygon
                    points={`${p[0].toFixed(1)},${p[1].toFixed(1)} ${next[0].toFixed(1)},${next[1].toFixed(1)} ${inext[0].toFixed(1)},${inext[1].toFixed(1)} ${ip[0].toFixed(1)},${ip[1].toFixed(1)}`}
                    fill={lit === 0 ? '#ffffff' : lit === 1 ? deep : mid}
                    opacity={lit === 0 ? 0.46 : lit === 1 ? 0.34 : 0.22}
                  />
                  <line
                    x1={p[0]}
                    y1={p[1]}
                    x2={ip[0]}
                    y2={ip[1]}
                    stroke="#ffffff"
                    strokeOpacity="0.35"
                    strokeWidth="0.3"
                  />
                </g>
              );
            })}

            {/* table */}
            <polygon points={innerPoints} fill={`url(#${id}-table)`} opacity="0.9" />
            <polygon points={innerPoints} fill="#ffffff" opacity="0.28" />
            <polygon points={innerPoints} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.35" />

            {/* girdle */}
            <polygon points={hull} fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="0.55" />

            {/* prongs */}
            {[0, 2, 4, 6].map((i) => {
              const p = facets[i % facets.length];
              return (
                <g key={`prong-${i}`}>
                  <circle cx={p[0]} cy={p[1]} r="2" fill={`url(#${id}-metal)`} />
                  <circle cx={p[0] - 0.5} cy={p[1] - 0.6} r="0.7" fill="#fffaf0" opacity="0.85" />
                </g>
              );
            })}

            {/* speculars */}
            <ellipse
              cx="42"
              cy="42"
              rx="6.5"
              ry="3"
              fill="#ffffff"
              opacity="0.8"
              transform="rotate(-28 42 42)"
              filter={`url(#${id}-soft)`}
            />
            <circle cx="62" cy="64" r="1.8" fill="#ffffff" opacity="0.6" filter={`url(#${id}-soft)`} />
          </g>
        )}
      </g>

      {/* grade */}
      <rect width="100" height="125" fill={shade} opacity="0.045" />
      <rect width="100" height="125" fill={`url(#${id}-key)`} opacity="0.25" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   Wide atmospheric backdrop: folded silk, scattered light, a few
   out-of-focus stones. Built for full-bleed hero use.
---------------------------------------------------------------- */
function Scene({ id, seed, wash, mid, deep, shade, className }) {
  const bokeh = useMemo(() => {
    const random = makeRandom(seed + 17);
    return Array.from({ length: 14 }, () => ({
      x: random() * 160,
      y: random() * 100,
      r: 1.5 + random() * 7,
      o: 0.08 + random() * 0.4,
    }));
  }, [seed]);

  const stones = useMemo(() => {
    const random = makeRandom(seed + 91);
    return Array.from({ length: 5 }, (_, i) => ({
      x: 18 + i * 30 + random() * 10,
      y: 52 + Math.sin(i * 1.3) * 16 + random() * 8,
      s: 0.55 + random() * 0.9,
      rot: (random() - 0.5) * 70,
      blur: i === 2 ? 0 : 0.7 + random() * 1.6,
    }));
  }, [seed]);

  return (
    <svg
      className={`gem-art ${className}`}
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0.1" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={mid} />
          <stop offset="45%" stopColor={wash} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <radialGradient id={`${id}-lamp`} cx="0.3" cy="0.18" r="0.7">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-silk`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={`${id}-gemgrad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="55%" stopColor={wash} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <filter id={`${id}-dof`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id={`${id}-dof-far`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>

      <rect width="160" height="100" fill={`url(#${id}-sky)`} />

      {/* silk folds sweeping across the frame */}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M-10 ${18 + i * 22} Q ${34 + i * 12} ${2 + i * 24}, ${80 + i * 5} ${24 + i * 20} T 170 ${14 + i * 23}`}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.4 - i * 0.07}
          strokeWidth={9 + i * 3}
          filter={`url(#${id}-dof-far)`}
        />
      ))}
      <rect width="160" height="100" fill={`url(#${id}-silk)`} opacity="0.5" />

      {/* out-of-focus highlights */}
      {bokeh.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="#ffffff" opacity={b.o} filter={`url(#${id}-dof)`} />
      ))}

      {/* scattered stones, only the middle one in focus */}
      {stones.map((s, i) => (
        <g
          key={i}
          transform={`translate(${s.x} ${s.y}) rotate(${s.rot}) scale(${s.s})`}
          filter={s.blur > 0 ? `url(#${id}-dof${s.blur > 1.4 ? '-far' : ''})` : undefined}
          opacity={s.blur > 0 ? 0.8 : 1}
        >
          <ellipse cx="0.6" cy="7" rx="7" ry="2.4" fill={shade} opacity="0.3" />
          <polygon points="0,-8 7,-2 5,6 -5,6 -7,-2" fill={`url(#${id}-gemgrad)`} />
          <polygon points="0,-8 7,-2 0,0" fill="#ffffff" opacity="0.4" />
          <polygon points="0,0 5,6 -5,6" fill={deep} opacity="0.32" />
          <polygon points="0,-8 7,-2 5,6 -5,6 -7,-2" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="0.4" />
          <circle cx="-2.4" cy="-3.2" r="1.3" fill="#ffffff" opacity="0.75" />
        </g>
      ))}

      <ellipse cx="46" cy="18" rx="80" ry="52" fill={`url(#${id}-lamp)`} />
      <rect width="160" height="100" fill={shade} opacity="0.08" />
    </svg>
  );
}
