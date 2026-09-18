import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { brand, navigation, products, socials } from '../data/site';
import { FREE_SHIPPING_THRESHOLD } from '../data/currencies';
import { useShop } from '../context/ShopContext';
import Media from './Media';
import { useEscape, useScrollLock } from '../hooks/useReveal';

/* ---------------------------------------------------------------
   Shared shell: backdrop fades and blurs, panel slides from an edge
---------------------------------------------------------------- */
function Drawer({ open, onClose, side = 'left', label, children, className = '' }) {
  useScrollLock(open);
  useEscape(open, onClose);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setTimeout(() => panelRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <div className={`drawer-root ${className}`} data-open={open} aria-hidden={!open}>
      <button className="drawer__backdrop" type="button" onClick={onClose} tabIndex={open ? 0 : -1} aria-label="Close">
        <span className="visually-hidden">Close</span>
      </button>

      <aside
        className="drawer"
        data-side={side}
        role="dialog"
        aria-modal={open}
        aria-label={label}
        tabIndex={-1}
        ref={panelRef}
      >
        <header className="drawer__head">
          <p className="drawer__title">{label}</p>
          <button className="drawer__close" type="button" onClick={onClose} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <div className="drawer__body">{children}</div>
      </aside>
    </div>
  );
}

/* ---------------------------------------------------------------
   Menu drawer: accordion sub-menus, links cascade in
---------------------------------------------------------------- */
export function MenuDrawer({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <Drawer open={open} onClose={onClose} side="left" label="Menu" className="drawer-root--menu">
      <nav className="menu-drawer">
        <ul>
          {navigation.map((item, i) => (
            <li key={item.label} className="menu-drawer__item" style={{ '--i': i }}>
              {item.columns ? (
                <>
                  <button
                    type="button"
                    className="menu-drawer__row"
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    data-expanded={expanded === item.label}
                  >
                    <span>{item.label}</span>
                    <span className="menu-drawer__plus" aria-hidden="true" />
                  </button>
                  <div className="menu-drawer__panel" data-expanded={expanded === item.label}>
                    <div className="menu-drawer__panel-inner">
                      {item.columns.map((column) => (
                        <div key={column.title}>
                          <p className="menu-drawer__group">{column.title}</p>
                          <ul>
                            {column.links.map((link) => (
                              <li key={link.label}>
                                <Link to={link.href} onClick={onClose}>
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link className="menu-drawer__row" to={item.href} onClick={onClose}>
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <footer className="menu-drawer__foot">
          <p className="eyebrow">Follow</p>
          <div className="menu-drawer__socials">
            {socials.map((social) => (
              <a key={social.label} href={social.href} className="link-underline" target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </footer>
      </nav>
    </Drawer>
  );
}

/* ---------------------------------------------------------------
   Cart drawer
---------------------------------------------------------------- */
export function CartDrawer() {
  const { items, subtotal, changeQuantity, removeItem, cartOpen, setCartOpen, format } = useShop();
  const navigate = useNavigate();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);

  const close = () => setCartOpen(false);

  const goTo = (path) => {
    close();
    navigate(path);
  };

  return (
    <Drawer open={cartOpen} onClose={close} side="right" label="Your bag" className="drawer-root--cart">
      {items.length === 0 ? (
        <div className="cart__empty">
          <p className="heading-md">Your bag is empty</p>
          <p className="body-muted">Pieces you add will be held here for a while.</p>
          <button className="button button--full" type="button" onClick={() => goTo('/collections/all')}>
            Browse new arrivals
          </button>
        </div>
      ) : (
        <>
          <div className="cart__shipping">
            <p>
              {remaining === 0
                ? 'Insured shipping is on us.'
                : `${format(remaining, { withCode: false })} away from complimentary insured shipping.`}
            </p>
            <span className="cart__shipping-bar">
              <span style={{ transform: `scaleX(${progress})` }} />
            </span>
          </div>

          <ul className="cart__items">
            {items.map((item, i) => (
              <li className="cart__item" key={item.id} style={{ '--i': i }}>
                <Link className="cart__item-media" to={`/products/${item.handle}`} onClick={close}>
                  <Media photo={item.photo} art={item.art} alt="" sizes="80px" />
                </Link>
                <div className="cart__item-body">
                  <h3>
                    <Link to={`/products/${item.handle}`} onClick={close}>
                      {item.name}
                    </Link>
                  </h3>
                  <p className="body-muted cart__item-stone">{item.stone}</p>
                  <div className="cart__item-row">
                    <div className="stepper">
                      <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Fewer ${item.name}`}>
                        &minus;
                      </button>
                      <span key={item.quantity}>{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`More ${item.name}`}>
                        +
                      </button>
                    </div>
                    <span className="cart__item-price">{format(item.price * item.quantity)}</span>
                  </div>
                  <button className="cart__remove link-underline" type="button" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <footer className="cart__foot">
            <div className="cart__total">
              <span>Subtotal</span>
              <span key={subtotal} className="cart__total-value">
                {format(subtotal)}
              </span>
            </div>
            <p className="cart__note body-muted">Taxes and duties are calculated at checkout.</p>
            <button className="button button--full" type="button" onClick={() => goTo('/cart')}>
              View bag and check out
            </button>
          </footer>
        </>
      )}
    </Drawer>
  );
}

/* ---------------------------------------------------------------
   Search overlay
---------------------------------------------------------------- */
export function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { format } = useShop();
  useScrollLock(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 240);
      return () => window.clearTimeout(timer);
    }
    setQuery('');
    return undefined;
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 4);
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.stone.toLowerCase().includes(q) ||
        product.collections.some((collection) => collection.includes(q))
    );
  }, [query]);

  return (
    <div className="search-overlay" data-open={open} aria-hidden={!open}>
      <button className="drawer__backdrop" type="button" onClick={onClose} tabIndex={open ? 0 : -1}>
        <span className="visually-hidden">Close search</span>
      </button>

      <div className="search-overlay__panel" role="dialog" aria-modal={open} aria-label="Search">
        <div className="page-width">
          <div className="search-overlay__field">
            <input
              ref={inputRef}
              type="search"
              value={query}
              placeholder={`Search ${brand.script}`}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search"
            />
            <button type="button" onClick={onClose} className="link-underline">
              Close
            </button>
          </div>

          <div className="search-overlay__results">
            <p className="eyebrow">{query ? `${results.length} results` : 'Popular right now'}</p>
            <ul>
              {results.map((product, i) => (
                <li key={product.id} style={{ '--i': i }}>
                  <Link to={`/products/${product.handle}`} onClick={onClose}>
                    <span className="search-overlay__thumb">
                      <Media photo={product.photo} art={product.art} alt="" sizes="60px" />
                    </span>
                    <span className="search-overlay__meta">
                      <span className="search-overlay__name">{product.name}</span>
                      <span className="body-muted">{product.stone}</span>
                    </span>
                    <span className="search-overlay__price">{format(product.price)}</span>
                  </Link>
                </li>
              ))}
              {results.length === 0 && <li className="search-overlay__none">Nothing matched that.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
