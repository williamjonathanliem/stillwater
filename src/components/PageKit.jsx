import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GemArt from './GemArt';
import Media from './Media';
import Reveal, { RevealLine } from './Reveal';
import { useReveal } from '../hooks/useReveal';

/* ---------------------------------------------------------------
   Page header. Sits under the sticky header with its own artwork
   panel that eases in behind the title.
---------------------------------------------------------------- */
export function PageHero({ eyebrow, title, lede, art, photo, breadcrumb, children, compact = false }) {
  const [ref, revealed] = useReveal({ threshold: 0.05 });

  return (
    <header className={`page-hero scheme-soft ${compact ? 'page-hero--compact' : ''}`} ref={ref} data-revealed={revealed}>
      <div className="page-hero__art" aria-hidden="true">
        <Media
          photo={photo}
          art={art ? { ...art, variant: 'scene' } : null}
          ratio={0.5}
          alt=""
          priority
          sizes="100vw"
        />
        <span className="page-hero__scrim" />
      </div>

      <div className="page-width page-hero__inner">
        {breadcrumb && <Breadcrumb trail={breadcrumb} />}
        {eyebrow && (
          <Reveal as="p" className="eyebrow page-hero__eyebrow">
            {eyebrow}
          </Reveal>
        )}
        <h1 className="page-hero__title display">
          <RevealLine delay={120}>{title}</RevealLine>
        </h1>
        {lede && (
          <Reveal as="p" className="page-hero__lede" delay={300}>
            {lede}
          </Reveal>
        )}
        {children && (
          <Reveal className="page-hero__actions" delay={420}>
            {children}
          </Reveal>
        )}
      </div>
    </header>
  );
}

export function Breadcrumb({ trail }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {trail.map((crumb, i) => (
        <span key={crumb.label}>
          {crumb.href ? (
            <Link to={crumb.href} className="link-underline">
              {crumb.label}
            </Link>
          ) : (
            <span aria-current="page">{crumb.label}</span>
          )}
          {i < trail.length - 1 && <span className="breadcrumb__sep">/</span>}
        </span>
      ))}
    </nav>
  );
}

/* ---------------------------------------------------------------
   Alternating text and image bands
---------------------------------------------------------------- */
export function SplitSection({ heading, body, art, photo, flip = false, children }) {
  return (
    <section className={`split ${flip ? 'split--flip' : ''}`}>
      <div className="page-width split__grid">
        <Reveal className="split__media" variant="reveal--scale">
          <Media photo={photo} art={art} alt={heading || ''} sizes="(max-width: 900px) 100vw, 45vw" />
        </Reveal>
        <div className="split__body">
          {heading && (
            <h2 className="heading-lg">
              <RevealLine>{heading}</RevealLine>
            </h2>
          )}
          {body?.map((paragraph, i) => (
            <Reveal as="p" key={paragraph.slice(0, 24)} className="body-muted" delay={160 + i * 110}>
              {paragraph}
            </Reveal>
          ))}
          {children}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Prose column for policy and help pages
---------------------------------------------------------------- */
export function Prose({ children, className = '' }) {
  return <div className={`prose ${className}`}>{children}</div>;
}

export function ProseBlock({ heading, body, delay = 0 }) {
  return (
    <Reveal className="prose__block" delay={delay}>
      {heading && <h2 className="prose__heading">{heading}</h2>}
      {body?.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="body-muted">
          {paragraph}
        </p>
      ))}
    </Reveal>
  );
}

/* ---------------------------------------------------------------
   Numbered process ladder
---------------------------------------------------------------- */
export function StepLadder({ steps }) {
  return (
    <ol className="ladder">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.step || step.title} className="ladder__item" delay={i * 110}>
          <span className="ladder__step">{step.step || String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3 className="ladder__title">{step.title}</h3>
            <p className="body-muted">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------
   Accordion, used by both FAQ pages and product details
---------------------------------------------------------------- */
export function Accordion({ items, singleOpen = true, defaultOpen = null }) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = (key) => {
    if (singleOpen) {
      setOpen((current) => (current === key ? null : key));
    } else {
      setOpen((current) => {
        const set = new Set(Array.isArray(current) ? current : []);
        if (set.has(key)) set.delete(key);
        else set.add(key);
        return [...set];
      });
    }
  };

  const isOpen = (key) => (singleOpen ? open === key : Array.isArray(open) && open.includes(key));

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const key = item.q || item.title || String(i);
        return (
          <Reveal className="accordion__item" key={key} delay={i * 70} data-open={isOpen(key)}>
            <button
              type="button"
              className="accordion__trigger"
              onClick={() => toggle(key)}
              aria-expanded={isOpen(key)}
            >
              <span>{item.q || item.title}</span>
              <span className="accordion__plus" aria-hidden="true" />
            </button>
            <div className="accordion__panel" data-open={isOpen(key)}>
              <div className="accordion__panel-inner">
                <p className="body-muted">{item.a || item.body}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------
   Simple data table that collapses to stacked rows on mobile
---------------------------------------------------------------- */
export function DataTable({ columns, rows, caption }) {
  return (
    <Reveal className="data-table-wrap">
      {caption && <p className="data-table__caption eyebrow">{caption}</p>}
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, ci) => (
                <td key={ci} data-label={columns[ci]}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

/* ---------------------------------------------------------------
   Form pieces. Every form in the site posts nowhere and reports
   success locally, which is the honest behaviour for a front end
   with no back end behind it.
---------------------------------------------------------------- */
export function Field({ label, name, type = 'text', options, required, placeholder, rows, value, onChange }) {
  const id = `field-${name}`;
  const common = {
    id,
    name,
    required,
    value,
    placeholder,
    onChange: (event) => onChange(name, event.target.value),
  };

  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      {type === 'textarea' ? (
        <textarea {...common} rows={rows || 4} />
      ) : type === 'select' ? (
        <select {...common}>
          <option value="">Choose one</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input {...common} type={type} />
      )}
      <span className="field__line" />
    </label>
  );
}

export function useLocalForm(initial) {
  const [values, setValues] = useState(initial);
  const [state, setState] = useState('idle');

  const change = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (state === 'error') setState('idle');
  };

  const submit = (event, validate) => {
    event.preventDefault();
    const problem = validate ? validate(values) : null;
    if (problem) {
      setState('error');
      return problem;
    }
    setState('sending');
    window.setTimeout(() => setState('done'), 650);
    return null;
  };

  const reset = () => {
    setValues(initial);
    setState('idle');
  };

  return { values, change, submit, state, setState, reset };
}

export function FormNote({ state, error, done }) {
  return (
    <p className="form-note" data-state={state}>
      {state === 'error' ? error : state === 'done' ? done : ''}
    </p>
  );
}

/* ---------------------------------------------------------------
   Closing call to action shared by the editorial pages
---------------------------------------------------------------- */
export function CtaBand({ heading, body, primary, secondary, art, photo }) {
  const [ref, revealed] = useReveal({ threshold: 0.25 });

  return (
    <section className="cta-band scheme-inverse" ref={ref} data-revealed={revealed}>
      <div className="cta-band__art" aria-hidden="true">
        <Media
          photo={photo}
          art={art ? { ...art, variant: 'scene' } : null}
          ratio={0.45}
          alt=""
          sizes="100vw"
        />
        <span className="cta-band__scrim" />
      </div>
      <div className="page-width cta-band__inner">
        <h2 className="heading-lg">
          <RevealLine>{heading}</RevealLine>
        </h2>
        {body && (
          <Reveal as="p" delay={180} className="cta-band__body">
            {body}
          </Reveal>
        )}
        <Reveal className="cta-band__actions" delay={320}>
          {primary && (
            <Link className="button" to={primary.href}>
              {primary.label}
            </Link>
          )}
          {secondary && (
            <Link className="button button--outline" to={secondary.href}>
              {secondary.label}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Sets the document title per route
---------------------------------------------------------------- */
export function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | Stillwater Atelier` : 'Stillwater Atelier';
    return () => {
      document.title = previous;
    };
  }, [title]);
}
