import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, relatedProducts } from '../data/site';
import { useShop } from '../context/ShopContext';
import Media from '../components/Media';
import ProductCard from '../components/ProductCard';
import Reveal, { RevealLine } from '../components/Reveal';
import { Accordion, Breadcrumb, usePageTitle } from '../components/PageKit';
import NotFound from './NotFound';

const RING_SIZES = ['H', 'J', 'L', 'N', 'P', 'R', 'S'];

export default function ProductDetail() {
  const { handle } = useParams();
  const product = getProduct(handle);
  const { addItem, format } = useShop();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  usePageTitle(product ? product.name : 'Not found');

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setSize('');
    setSizeError(false);
    setAdded(false);
  }, [handle]);

  if (!product) return <NotFound />;

  const needsSize = product.collections.includes('rings');

  const handleAdd = () => {
    if (product.soldOut) return;
    if (needsSize && !size) {
      setSizeError(true);
      return;
    }
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  // pair each generated frame with its reference photograph, where one exists
  const arts = product.gallery || [product.art, product.artAlt];
  const gallery = arts.map((art, i) => ({ art, photo: (product.photos || [])[i] || null }));
  const related = relatedProducts(product, 4);

  return (
    <>
      <div className="product-page section scheme-light">
        <div className="page-width">
          <Breadcrumb
            trail={[
              { label: 'Home', href: '/' },
              { label: 'Collections', href: '/collections' },
              { label: product.name },
            ]}
          />

          <div className="product-page__grid">
            <div className="product-page__media">
              <Reveal className="product-page__stage" variant="reveal--scale">
                {gallery.map((frame, i) => (
                  <div key={i} className="product-page__frame" data-current={i === activeImage}>
                    <Media
                      photo={frame.photo}
                      art={frame.art}
                      alt={i === 0 ? product.name : ''}
                      priority={i === 0}
                      sizes="(max-width: 900px) 100vw, 45vw"
                    />
                  </div>
                ))}
                {product.badge && (
                  <span
                    className="product-card__badge"
                    data-variant={product.soldOut ? 'sold' : product.badge === 'Sale' ? 'sale' : 'note'}
                  >
                    {product.badge}
                  </span>
                )}
              </Reveal>

              <div className="product-page__thumbs">
                {gallery.map((frame, i) => (
                  <button
                    key={i}
                    type="button"
                    className="product-page__thumb"
                    data-current={i === activeImage}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Media photo={frame.photo} art={frame.art} alt="" sizes="80px" />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-page__info">
              <Reveal as="p" className="eyebrow">
                {product.stone}
              </Reveal>

              <h1 className="product-page__title heading-lg">
                <RevealLine delay={100}>{product.name}</RevealLine>
              </h1>

              <Reveal className="product-page__price" delay={220}>
                {product.compareAt && <span className="product-page__price-was">{format(product.compareAt)}</span>}
                <span>{format(product.price)}</span>
              </Reveal>

              <Reveal as="p" className="body-muted product-page__description" delay={300}>
                {product.description}
              </Reveal>

              {needsSize && (
                <Reveal className="product-page__sizes" delay={360} data-error={sizeError}>
                  <div className="product-page__sizes-head">
                    <span className="eyebrow">Size</span>
                    <Link className="link-underline" to="/ring-sizing">
                      Sizing guide
                    </Link>
                  </div>
                  <div className="size-row">
                    {RING_SIZES.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="size-chip"
                        data-selected={size === option}
                        onClick={() => {
                          setSize(option);
                          setSizeError(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {sizeError && <p className="field__error">Choose a size first.</p>}
                </Reveal>
              )}

              <Reveal className="product-page__buy" delay={420}>
                <div className="stepper stepper--lg">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    disabled={product.soldOut}
                  >
                    &minus;
                  </button>
                  <span key={quantity}>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                    aria-label="Increase quantity"
                    disabled={product.soldOut}
                  >
                    +
                  </button>
                </div>

                <button
                  className="button button--full"
                  type="button"
                  onClick={handleAdd}
                  disabled={product.soldOut}
                  data-state={added ? 'added' : 'idle'}
                >
                  {product.soldOut ? 'Sold out' : added ? 'Added to bag' : `Add to bag — ${format(product.price * quantity)}`}
                </button>
              </Reveal>

              {product.soldOut && (
                <Reveal as="p" className="product-page__soldout body-muted" delay={480}>
                  This run has sold out. We can often source similar material.{' '}
                  <Link className="link-underline link-underline--static" to="/custom">
                    Ask about a commission
                  </Link>
                  .
                </Reveal>
              )}

              <Reveal className="product-page__assurances" delay={520}>
                <span>Insured shipping</span>
                <span>14-day returns</span>
                <span>2-year warranty</span>
              </Reveal>

              <div className="product-page__accordion">
                <Accordion
                  items={[
                    { title: 'Details', body: product.details.join(' · ') },
                    {
                      title: 'Shipping and returns',
                      body: 'Insured and signed for. Free above RM500. Fourteen days to return anything unworn, commissions excepted.',
                    },
                    {
                      title: 'Care',
                      body: 'Warm water, unscented soap and a soft brush. Keep it away from chlorine and saltwater, and store it flat and separately.',
                    },
                  ]}
                  defaultOpen="Details"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section scheme-soft">
        <div className="page-width">
          <h2 className="heading-md related__head">
            <RevealLine>You may also like</RevealLine>
          </h2>
          <div className="product-grid">
            {related.map((item, i) => (
              <Reveal key={item.id} delay={i * 90}>
                <ProductCard product={item} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
