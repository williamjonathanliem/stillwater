import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { FREE_SHIPPING_THRESHOLD } from '../data/currencies';
import Media from '../components/Media';
import Reveal, { RevealLine } from '../components/Reveal';
import { Breadcrumb, usePageTitle } from '../components/PageKit';

/** A single sample code, so the field can be shown to actually work. */
const PROMOS = { STILLWATER10: 0.1 };

export default function Cart() {
  const { items, subtotal, setQuantity, changeQuantity, removeItem, clearCart, format, count } = useShop();
  const [promo, setPromo] = useState('');
  const [applied, setApplied] = useState(null);
  const [promoState, setPromoState] = useState('idle');
  const [note, setNote] = useState('');
  const [placed, setPlaced] = useState(false);

  usePageTitle('Your bag');

  const discount = applied ? subtotal * PROMOS[applied] : 0;
  const shipping = subtotal - discount >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 45;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyPromo = (event) => {
    event.preventDefault();
    const code = promo.trim().toUpperCase();
    if (PROMOS[code]) {
      setApplied(code);
      setPromoState('done');
    } else {
      setApplied(null);
      setPromoState('error');
    }
  };

  if (placed) {
    return (
      <section className="section scheme-light cart-page">
        <div className="page-width cart-page__placed">
          <Reveal>
            <p className="eyebrow">Order received</p>
            <h1 className="heading-lg">Thank you. We have it.</h1>
            <p className="body-muted">
              A confirmation is on its way. Your pieces go to the bench for a final inspection before they ship, which
              usually takes a day or two.
            </p>
            <div className="cart-page__placed-actions">
              <Link className="button" to="/collections/all">
                Keep looking
              </Link>
              <Link className="button button--outline" to="/track-order">
                Track this order
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="section scheme-light cart-page">
      <div className="page-width">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Your bag' }]} />

        <h1 className="heading-lg cart-page__title">
          <RevealLine>Your bag</RevealLine>
        </h1>

        {items.length === 0 ? (
          <Reveal className="empty-state">
            <p className="heading-md">Nothing in it yet</p>
            <p className="body-muted">Whatever you add stays here, even if you close the tab.</p>
            <Link className="button" to="/collections/all">
              Browse the shop
            </Link>
          </Reveal>
        ) : (
          <div className="cart-page__grid">
            <div className="cart-page__lines">
              <div className="cart-page__lines-head">
                <span className="eyebrow">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
                <button type="button" className="link-underline cart-page__clear" onClick={clearCart}>
                  Empty the bag
                </button>
              </div>

              <ul>
                {items.map((item, i) => (
                  <Reveal as="li" key={item.id} className="cart-line" delay={i * 70}>
                    <Link className="cart-line__media" to={`/products/${item.handle}`}>
                      <Media photo={item.photo} art={item.art} alt="" sizes="112px" />
                    </Link>

                    <div className="cart-line__body">
                      <div className="cart-line__top">
                        <div>
                          <h2 className="cart-line__title">
                            <Link to={`/products/${item.handle}`}>{item.name}</Link>
                          </h2>
                          <p className="body-muted cart-line__meta">
                            {item.stone} · {item.metal}
                          </p>
                        </div>
                        <p className="cart-line__price">{format(item.price * item.quantity)}</p>
                      </div>

                      <div className="cart-line__controls">
                        <div className="stepper">
                          <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Fewer ${item.name}`}>
                            &minus;
                          </button>
                          <label className="visually-hidden" htmlFor={`qty-${item.id}`}>
                            Quantity for {item.name}
                          </label>
                          <input
                            id={`qty-${item.id}`}
                            className="stepper__input"
                            type="number"
                            min="1"
                            max="9"
                            value={item.quantity}
                            onChange={(event) => {
                              const next = Number(event.target.value);
                              if (Number.isFinite(next)) setQuantity(item.id, Math.min(9, Math.max(1, next)));
                            }}
                          />
                          <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`More ${item.name}`}>
                            +
                          </button>
                        </div>

                        <button type="button" className="link-underline cart-line__remove" onClick={() => removeItem(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal className="cart-page__note">
                <label className="field" htmlFor="order-note">
                  <span className="field__label">Add a note for the bench</span>
                  <textarea
                    id="order-note"
                    rows={3}
                    value={note}
                    placeholder="Gift wrapping, a delivery date to avoid, anything we should know."
                    onChange={(event) => setNote(event.target.value)}
                  />
                  <span className="field__line" />
                </label>
              </Reveal>
            </div>

            <Reveal className="cart-page__summary" delay={160}>
              <h2 className="heading-md">Summary</h2>

              <form className="promo" onSubmit={applyPromo} data-state={promoState}>
                <label className="visually-hidden" htmlFor="promo">
                  Discount code
                </label>
                <input
                  id="promo"
                  value={promo}
                  placeholder="Discount code"
                  onChange={(event) => {
                    setPromo(event.target.value);
                    if (promoState !== 'idle') setPromoState('idle');
                  }}
                />
                <button type="submit" className="button button--secondary">
                  Apply
                </button>
              </form>
              <p className="promo__message" data-state={promoState}>
                {promoState === 'error'
                  ? 'That code is not recognised.'
                  : promoState === 'done'
                    ? `${applied} applied, 10% off.`
                    : 'Try STILLWATER10.'}
              </p>

              <dl className="summary-rows">
                <div>
                  <dt>Subtotal</dt>
                  <dd>{format(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="summary-rows__discount">
                    <dt>Discount</dt>
                    <dd>&minus;{format(discount)}</dd>
                  </div>
                )}
                <div>
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? 'Free' : format(shipping)}</dd>
                </div>
                <div className="summary-rows__total">
                  <dt>Total</dt>
                  <dd key={total}>{format(total)}</dd>
                </div>
              </dl>

              <button className="button button--full" type="button" onClick={() => setPlaced(true)}>
                Check out
              </button>

              <p className="body-muted cart-page__fineprint">
                Taxes are calculated at the next step. Orders outside Malaysia may attract import duty, which is charged
                by the destination country.
              </p>

              <Link className="link-underline cart-page__continue" to="/collections/all">
                Continue shopping
              </Link>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
