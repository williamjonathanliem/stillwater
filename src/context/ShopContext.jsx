import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CURRENCIES, DEFAULT_CURRENCY } from '../data/currencies';
import { products } from '../data/site';

/**
 * One store for the two pieces of state that outlive a page view: the bag
 * and the display currency. Both persist to localStorage so a reload, or a
 * jump between routes, keeps what the visitor had.
 */

const ShopContext = createContext(null);

const CART_KEY = 'stillwater.cart.v1';
const CURRENCY_KEY = 'stillwater.currency.v1';

function readCart() {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // rehydrate against the catalogue so prices and art are never stale
    return parsed
      .map((line) => {
        const product = products.find((p) => p.id === line.id);
        if (!product) return null;
        return { ...product, quantity: Math.max(1, Number(line.quantity) || 1) };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function readCurrency() {
  try {
    const code = window.localStorage.getItem(CURRENCY_KEY);
    return CURRENCIES[code] ? code : DEFAULT_CURRENCY;
  } catch {
    return DEFAULT_CURRENCY;
  }
}

export function ShopProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [currency, setCurrencyState] = useState(readCurrency);
  const [cartOpen, setCartOpen] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        CART_KEY,
        JSON.stringify(items.map(({ id, quantity }) => ({ id, quantity })))
      );
    } catch {
      /* storage unavailable, the bag just will not survive a reload */
    }
  }, [items]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CURRENCY_KEY, currency);
    } catch {
      /* ignore */
    }
  }, [currency]);

  const addItem = useCallback((product, quantity = 1, { open = true } = {}) => {
    if (product.soldOut) return;
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...current, { ...product, quantity }];
    });
    setPulse((n) => n + 1);
    setLastAdded(product.id);
    if (open) setCartOpen(true);
  }, []);

  const setQuantity = useCallback((id, quantity) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const changeQuantity = useCallback((id, delta) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const setCurrency = useCallback((code) => {
    if (CURRENCIES[code]) setCurrencyState(code);
  }, []);

  /** Converts a base (MYR) amount and formats it for the active currency. */
  const format = useCallback(
    (amount, { withCode = true } = {}) => {
      const config = CURRENCIES[currency] || CURRENCIES[DEFAULT_CURRENCY];
      const converted = amount * config.rate;
      const rounded = config.decimals === 0 ? Math.round(converted) : converted;
      const body = rounded.toLocaleString('en-US', {
        minimumFractionDigits: config.decimals,
        maximumFractionDigits: config.decimals,
      });
      return `${config.symbol}${body}${withCode ? ` ${config.code}` : ''}`;
    },
    [currency]
  );

  const convert = useCallback(
    (amount) => amount * (CURRENCIES[currency]?.rate ?? 1),
    [currency]
  );

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      addItem,
      setQuantity,
      changeQuantity,
      removeItem,
      clearCart,
      cartOpen,
      setCartOpen,
      pulse,
      lastAdded,
      currency,
      setCurrency,
      currencyConfig: CURRENCIES[currency] || CURRENCIES[DEFAULT_CURRENCY],
      format,
      convert,
    }),
    [
      items,
      count,
      subtotal,
      addItem,
      setQuantity,
      changeQuantity,
      removeItem,
      clearCart,
      cartOpen,
      pulse,
      lastAdded,
      currency,
      setCurrency,
      format,
      convert,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside <ShopProvider>');
  return context;
}
