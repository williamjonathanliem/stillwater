import { useState } from 'react';
import { appointmentsPage, stockistsPage } from '../data/content';
import { PHOTOS } from '../data/media';
import Reveal, { RevealLine } from '../components/Reveal';
import {
  CtaBand,
  Field,
  FormNote,
  PageHero,
  usePageTitle,
  useLocalForm,
} from '../components/PageKit';

/* ---------------------------------------------------------------
   Appointments
---------------------------------------------------------------- */
export function Appointments() {
  usePageTitle('Appointments');
  const [kind, setKind] = useState(appointmentsPage.kinds[0].title);
  const [slot, setSlot] = useState('');
  const form = useLocalForm({ name: '', email: '', date: '', notes: '' });

  const onSubmit = (event) => {
    form.submit(event, (values) => {
      if (!values.name.trim()) return 'name';
      if (!values.email.includes('@')) return 'email';
      if (!values.date) return 'date';
      if (!slot) return 'slot';
      return null;
    });
  };

  return (
    <>
      <PageHero
        eyebrow={appointmentsPage.eyebrow}
        title={appointmentsPage.title}
        lede={appointmentsPage.lede}
        art={appointmentsPage.art}
        photo={appointmentsPage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Appointments' }]}
      />

      <section className="section scheme-light">
        <div className="page-width">
          <h2 className="heading-md section-head">
            <RevealLine>Three ways to see them</RevealLine>
          </h2>
          <div className="capability-grid capability-grid--three">
            {appointmentsPage.kinds.map((item, i) => (
              <Reveal
                key={item.title}
                className="capability capability--selectable"
                delay={i * 110}
                data-selected={kind === item.title}
              >
                <button type="button" onClick={() => setKind(item.title)}>
                  <span className="capability__rule" aria-hidden="true" />
                  <span className="capability__duration eyebrow">{item.duration}</span>
                  <h3 className="capability__title">{item.title}</h3>
                  <p className="body-muted">{item.body}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section scheme-soft">
        <div className="page-width form-section">
          <div className="form-section__intro">
            <h2 className="heading-lg">
              <RevealLine>Book a time</RevealLine>
            </h2>
            <Reveal as="p" className="body-muted" delay={160}>
              Appointments are free and there is no expectation that you buy anything. Bring a piece you already own if
              you want an opinion on it.
            </Reveal>
            <Reveal className="booking-summary" delay={260}>
              <p className="eyebrow">Selected</p>
              <p className="booking-summary__value">{kind}</p>
              <p className="eyebrow">Time</p>
              <p className="booking-summary__value">{slot || 'Not chosen yet'}</p>
            </Reveal>
          </div>

          <Reveal className="form-card" delay={120}>
            <form onSubmit={onSubmit} noValidate>
              <div className="form-grid">
                <Field label="Your name" name="name" required value={form.values.name} onChange={form.change} />
                <Field label="Email" name="email" type="email" required value={form.values.email} onChange={form.change} />
                <Field label="Preferred date" name="date" type="date" required value={form.values.date} onChange={form.change} />
              </div>

              <fieldset className="slots">
                <legend className="field__label">Time</legend>
                <div className="slots__row">
                  {appointmentsPage.times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className="size-chip"
                      data-selected={slot === time}
                      onClick={() => setSlot(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </fieldset>

              <Field
                label="Anything we should prepare"
                name="notes"
                type="textarea"
                rows={4}
                placeholder="A colour you are chasing, a piece you want to bring in, a budget."
                value={form.values.notes}
                onChange={form.change}
              />

              <button className="button button--full" type="submit" disabled={form.state === 'sending'}>
                {form.state === 'sending' ? 'Requesting' : form.state === 'done' ? 'Requested' : 'Request this time'}
              </button>

              <FormNote
                state={form.state}
                error="Please add your name, a valid email, a date and a time."
                done="Requested. We will confirm by email within one working day."
              />
            </form>
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Not near any of our doors?"
        body="A video appointment puts the parcel under a lamp and a camera, which beats photographs for judging colour."
        primary={{ label: 'See where we are', href: '/stockists' }}
        secondary={{ label: 'Write to us', href: '/contact' }}
        art={{ seed: 532, tone: 'aqua' }}
        photo={PHOTOS.boxedRing}
      />
    </>
  );
}

/* ---------------------------------------------------------------
   Stockists
---------------------------------------------------------------- */
export function Stockists() {
  usePageTitle('Stockists');

  return (
    <>
      <PageHero
        eyebrow={stockistsPage.eyebrow}
        title={stockistsPage.title}
        lede={stockistsPage.lede}
        art={stockistsPage.art}
        photo={stockistsPage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Stockists' }]}
      />

      <section className="section scheme-light">
        <div className="page-width">
          <ul className="stockist-list">
            {stockistsPage.stockists.map((stockist, i) => (
              <Reveal as="li" key={stockist.name} className="stockist" delay={i * 90}>
                <span className="stockist__city">{stockist.city}</span>
                <div className="stockist__body">
                  <h2 className="stockist__name">{stockist.name}</h2>
                  <p className="body-muted">{stockist.address}</p>
                </div>
                <p className="stockist__note body-muted">{stockist.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="Want to stock Stillwater?"
        body="We work with a small number of shops and we are slow about adding more. Write to us anyway."
        primary={{ label: 'Get in touch', href: '/contact' }}
        secondary={{ label: 'Book an appointment', href: '/appointments' }}
        art={{ seed: 542, tone: 'moss' }}
        photo={PHOTOS.clarpBox}
      />
    </>
  );
}
