import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsInCollection } from '../data/site';
import ProductCard from './ProductCard';
import Reveal, { RevealLine } from './Reveal';

const FILTERS = [
  { label: 'New arrivals', handle: 'all', limit: 4 },
  { label: 'Earrings', handle: 'earrings' },
  { label: 'Rings', handle: 'rings' },
  { label: 'One of one', handle: 'one-of-one' },
];

/**
 * The new-arrivals rail. On desktop it is a four-up grid whose cards
 * cascade in; on narrow screens it becomes a snapping, draggable scroller
 * with a progress bar.
 */
export default function ProductList() {
  const [filter, setFilter] = useState(FILTERS[0].label);
  const [progress, setProgress] = useState(0);
  const scrollerRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const [dragging, setDragging] = useState(false);

  const active = FILTERS.find((item) => item.label === filter) || FILTERS[0];
  const visible = useMemo(
    () => productsInCollection(active.handle).slice(0, active.limit || 8),
    [active]
  );

  const onScroll = () => {
    const node = scrollerRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setProgress(max > 0 ? node.scrollLeft / max : 0);
  };

  const onPointerDown = (event) => {
    const node = scrollerRef.current;
    if (!node) return;
    drag.current = { active: true, startX: event.clientX, startScroll: node.scrollLeft };
    setDragging(true);
  };

  const onPointerMove = (event) => {
    const node = scrollerRef.current;
    if (!node || !drag.current.active) return;
    node.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX);
  };

  const onPointerUp = () => {
    drag.current.active = false;
    setDragging(false);
  };

  return (
    <section className="section product-list scheme-light" id="shop">
      <div className="page-width">
        <div className="product-list__head">
          <h2 className="heading-lg">
            <RevealLine>New arrivals</RevealLine>
          </h2>

          <Reveal className="product-list__filters" delay={120}>
            {FILTERS.map((item) => (
              <button
                key={item.label}
                type="button"
                className="product-list__filter link-underline"
                data-active={filter === item.label}
                onClick={() => setFilter(item.label)}
              >
                {item.label}
              </button>
            ))}
          </Reveal>

          <Reveal delay={200}>
            <Link className="product-list__all link-underline link-underline--static" to="/collections/all">
              View everything
            </Link>
          </Reveal>
        </div>

        <div
          className="product-list__scroller"
          ref={scrollerRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
          data-dragging={dragging}
        >
          {visible.map((product, i) => (
            <Reveal key={product.id} delay={i * 90} className="product-list__cell">
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </div>

        <div className="product-list__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(0.12, progress || 0.12)})` }} />
        </div>
      </div>
    </section>
  );
}
