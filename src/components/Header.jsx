import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brand, navigation } from '../data/site';
import { useScrollState } from '../hooks/useReveal';
import { useShop } from '../context/ShopContext';
import CurrencySelect from './CurrencySelect';
import GemArt from './GemArt';

/**
 * Sticky header. It starts transparent over a page that opens with a
 * full-bleed hero, turns solid once the page scrolls, and retracts on the
 * way down while returning on the way up.
 */
export default function Header({ onOpenMenu, onOpenSearch, transparentAtTop = false }) {
  const { past, direction } = useScrollState();
  const [openIndex, setOpenIndex] = useState(null);
  const { count, pulse, setCartOpen } = useShop();
  const location = useLocation();

  useEffect(() => {
    setOpenIndex(null);
  }, [location.pathname]);

  const transparent = transparentAtTop && !past;
  const hidden = past && direction === 'down' && openIndex === null;

  return (
    <header
      className={`header ${transparent ? 'header--transparent' : 'header--solid'}`}
      data-hidden={hidden}
      data-floating={transparentAtTop}
      onMouseLeave={() => setOpenIndex(null)}
    >
      <div className="header__inner page-width">
        <nav className="header__nav header__nav--left" aria-label="Primary">
          <button className="header__icon header__burger" type="button" onClick={onOpenMenu} aria-label="Open menu">
            <span />
            <span />
          </button>

          <ul className="header__menu">
            {navigation.map((item, i) => (
              <li
                key={item.label}
                className="header__menu-item"
                onMouseEnter={() => setOpenIndex(item.columns ? i : null)}
              >
                <Link
                  className="header__link link-underline"
                  to={item.href}
                  data-active={openIndex === i || location.pathname === item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="header__logo" to="/" aria-label={`${brand.name} home`}>
          <span className="header__logo-top">{brand.logoTop}</span>
          <span className="header__logo-script">{brand.script}</span>
        </Link>

        <div className="header__nav header__nav--right">
          <CurrencySelect />
          <button className="header__icon" type="button" onClick={onOpenSearch} aria-label="Search">
            <SearchIcon />
          </button>
          <Link className="header__icon header__account" to="/contact" aria-label="Account">
            <AccountIcon />
          </Link>
          <button
            className="header__icon header__cart"
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open bag, ${count} item${count === 1 ? '' : 's'}`}
          >
            <BagIcon />
            {count > 0 && (
              <span key={pulse} className="header__cart-bubble">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* mega menu, one panel per nav item that declares columns */}
      {navigation.map((item, i) =>
        item.columns ? (
          <div
            key={item.label}
            className="mega"
            data-open={openIndex === i}
            onMouseEnter={() => setOpenIndex(i)}
            aria-hidden={openIndex !== i}
          >
            <div className="mega__inner page-width">
              {item.columns.map((column, ci) => (
                <div className="mega__column" key={column.title} style={{ '--i': ci }}>
                  <p className="mega__title">{column.title}</p>
                  <ul>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link className="mega__link" to={link.href}>
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {item.featured && (
                <Link className="mega__featured" to={item.featured.href} style={{ '--i': item.columns.length }}>
                  <div className="mega__featured-media">
                    <GemArt seed={item.featured.art.seed} tone={item.featured.art.tone} />
                  </div>
                  <div>
                    <p className="mega__title">{item.featured.title}</p>
                    <p className="mega__caption">{item.featured.caption}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        ) : null
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1" />
      <path d="M10.6 10.6 14 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="5.5" r="2.8" stroke="currentColor" strokeWidth="1" />
      <path d="M2.6 14c.6-3 2.8-4.6 5.4-4.6S12.8 11 13.4 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 5h10l-.9 9.2H3.9L3 5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M5.8 6.6V4.4a2.2 2.2 0 0 1 4.4 0v2.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
