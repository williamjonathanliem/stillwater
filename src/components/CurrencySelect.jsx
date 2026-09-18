import { useEffect, useRef, useState } from 'react';
import { CURRENCY_LIST } from '../data/currencies';
import { useShop } from '../context/ShopContext';
import { useEscape } from '../hooks/useReveal';

/**
 * Currency switcher. Changing it re-prices the whole site, because every
 * price on every page renders through the shop context's `format`.
 */
export default function CurrencySelect({ variant = 'header' }) {
  const { currency, setCurrency, currencyConfig } = useShop();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEscape(open, () => setOpen(false));

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <div className={`currency currency--${variant}`} ref={rootRef} data-open={open}>
      <button
        type="button"
        className="currency__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Currency: ${currencyConfig.label}. Change currency`}
      >
        <span className="currency__code">{currencyConfig.code}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true" className="currency__chevron">
          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul className="currency__menu" role="listbox" aria-label="Currency" data-open={open}>
        {CURRENCY_LIST.map((item, i) => (
          <li key={item.code} style={{ '--i': i }}>
            <button
              type="button"
              role="option"
              aria-selected={item.code === currency}
              data-selected={item.code === currency}
              onClick={() => {
                setCurrency(item.code);
                setOpen(false);
              }}
            >
              <span className="currency__flag" aria-hidden="true">
                {item.flag}
              </span>
              <span className="currency__label">{item.label}</span>
              <span className="currency__code">{item.code}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
