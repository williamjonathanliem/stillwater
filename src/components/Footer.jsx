import { useState } from 'react';
import { Link } from 'react-router-dom';
import { brand, footerColumns, socials } from '../data/site';
import Reveal, { RevealLine } from './Reveal';
import CurrencySelect from './CurrencySelect';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');

  const submit = (event) => {
    event.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setState('error');
      return;
    }
    setState('sending');
    window.setTimeout(() => setState('done'), 700);
  };

  return (
    <footer className="footer scheme-light" id="footer">
      <div className="page-width footer__inner">
        <Reveal className="footer__signup">
          <h2 className="heading-md">
            <RevealLine>Join the Stillwater list</RevealLine>
          </h2>
          <p className="body-muted">
            First sight of new stones, private appointment dates, and the occasional piece that never reaches the shop.
          </p>

          <form className="signup" onSubmit={submit} data-state={state}>
            <label className="visually-hidden" htmlFor="signup-email">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              placeholder="Email address"
              onChange={(event) => {
                setEmail(event.target.value);
                if (state === 'error') setState('idle');
              }}
            />
            <button type="submit" aria-label="Subscribe">
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
                <path
                  d="M1 5h16m0 0-4-4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="signup__line" />
          </form>

          <p className="signup__message" data-state={state}>
            {state === 'error' ? 'That email does not look right.' : state === 'done' ? 'You are on the list.' : ''}
          </p>

          <div className="footer__currency">
            <span className="eyebrow">Showing prices in</span>
            <CurrencySelect variant="footer" />
          </div>
        </Reveal>

        <div className="footer__columns">
          {footerColumns.map((column, i) => (
            <Reveal key={column.title} delay={i * 110} className="footer__column">
              <p className="footer__column-title">{column.title}</p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link className="link-underline" to={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="page-width footer__bottom">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} {brand.name}. {brand.tagline}.
        </p>
        <div className="footer__socials">
          {socials.map((social) => (
            <a key={social.label} className="link-underline" href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
        <div className="footer__pay" aria-label="Accepted payment methods">
          {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'].map((method) => (
            <span key={method} className="footer__pay-chip">
              {method}
            </span>
          ))}
        </div>
      </div>

      <p className="footer__wordmark" aria-hidden="true">
        {brand.script}
      </p>
    </footer>
  );
}
