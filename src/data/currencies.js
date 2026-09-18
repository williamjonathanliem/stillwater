/**
 * Display currencies.
 *
 * Every price in the catalogue is stored in the base currency (MYR) and
 * converted at render time. The rates below are fixed sample values so the
 * build runs with no network call. Point `rate` at a live feed and nothing
 * else in the app has to change.
 */

export const DEFAULT_CURRENCY = 'MYR';

export const CURRENCIES = {
  MYR: { code: 'MYR', symbol: 'RM', label: 'Malaysian ringgit', rate: 1, decimals: 2, flag: '🇲🇾' },
  USD: { code: 'USD', symbol: '$', label: 'US dollar', rate: 0.212, decimals: 2, flag: '🇺🇸' },
  SGD: { code: 'SGD', symbol: 'S$', label: 'Singapore dollar', rate: 0.285, decimals: 2, flag: '🇸🇬' },
  GBP: { code: 'GBP', symbol: '£', label: 'Pound sterling', rate: 0.167, decimals: 2, flag: '🇬🇧' },
  EUR: { code: 'EUR', symbol: '€', label: 'Euro', rate: 0.196, decimals: 2, flag: '🇪🇺' },
  AUD: { code: 'AUD', symbol: 'A$', label: 'Australian dollar', rate: 0.323, decimals: 2, flag: '🇦🇺' },
  JPY: { code: 'JPY', symbol: '¥', label: 'Japanese yen', rate: 32.4, decimals: 0, flag: '🇯🇵' },
};

export const CURRENCY_LIST = Object.values(CURRENCIES);

/** Free-shipping threshold, in the base currency. */
export const FREE_SHIPPING_THRESHOLD = 500;
