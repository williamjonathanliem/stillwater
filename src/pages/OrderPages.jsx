import { useState } from 'react';
import { Link } from 'react-router-dom';
import { contactPage, giftCardsPage, shippingPage, trackOrderPage } from '../data/content';
import { useShop } from '../context/ShopContext';
import { PHOTOS } from '../data/media';
import Reveal, { RevealLine } from '../components/Reveal';
import Media from '../components/Media';
import {
  CtaBand,
  DataTable,
  Field,
  FormNote,
  PageHero,
  Prose,
  ProseBlock,
  usePageTitle,
  useLocalForm,
} from '../components/PageKit';

/* ---------------------------------------------------------------
   Shipping and returns
---------------------------------------------------------------- */
export function Shipping() {
  usePageTitle('Shipping and returns');
  const { format } = useShop();

  return (
    <>
      <PageHero
        eyebrow={shippingPage.eyebrow}
        title={shippingPage.title}
        lede={shippingPage.lede}
        art={shippingPage.art}
        photo={shippingPage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Shipping and returns' }]}
      />

      <section className="section scheme-light">
        <div className="page-width">
          <h2 className="heading-md section-head">
            <RevealLine>Where we ship</RevealLine>
          </h2>
          <DataTable
            columns={['Destination', 'Time', 'Cost', 'Notes']}
            rows={shippingPage.zones.map((zone) => [
              zone.zone,
              zone.time,
              zone.cost === 0 ? 'Free' : format(zone.cost, { withCode: false }),
              zone.note,
            ])}
          />
          <Reveal as="p" className="body-muted table-note" delay={200}>
            {shippingPage.duties}
          </Reveal>
        </div>
      </section>

      <section className="section scheme-soft">
        <div className="page-width">
          <Prose>
            <ProseBlock heading="Returns" body={shippingPage.returns} />
          </Prose>
        </div>
      </section>

      <CtaBand
        heading="Something arrived wrong?"
        body="Tell us within fourteen days and return shipping is on us."
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'Track an order', href: '/track-order' }}
        art={{ seed: 612, tone: 'pearl' }}
        photo={PHOTOS.clarpBox}
      />
    </>
  );
}

/* ---------------------------------------------------------------
   Track an order
---------------------------------------------------------------- */
export function TrackOrder() {
  usePageTitle('Track an order');
  const [found, setFound] = useState(false);
  const form = useLocalForm({ number: '', email: '' });

  const onSubmit = (event) => {
    const problem = form.submit(event, (values) => {
      if (!values.number.trim()) return 'number';
      if (!values.email.includes('@')) return 'email';
      return null;
    });
    if (!problem) window.setTimeout(() => setFound(true), 650);
  };

  const { sample, stages } = trackOrderPage;

  return (
    <>
      <PageHero
        eyebrow={trackOrderPage.eyebrow}
        title={trackOrderPage.title}
        lede={trackOrderPage.lede}
        art={trackOrderPage.art}
        photo={trackOrderPage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Track an order' }]}
      />

      <section className="section scheme-light">
        <div className="page-width form-section">
          <div className="form-section__intro">
            <h2 className="heading-lg">
              <RevealLine>Look it up</RevealLine>
            </h2>
            <Reveal as="p" className="body-muted" delay={160}>
              The order number is in the subject line of your confirmation email. It begins with SW.
            </Reveal>
            <Reveal as="p" className="body-muted" delay={240}>
              Try <strong>{sample.number}</strong> with any email address to see how a live order reads.
            </Reveal>
          </div>

          <Reveal className="form-card" delay={120}>
            <form onSubmit={onSubmit} noValidate>
              <Field
                label="Order number"
                name="number"
                required
                placeholder={sample.number}
                value={form.values.number}
                onChange={form.change}
              />
              <Field label="Email" name="email" type="email" required value={form.values.email} onChange={form.change} />

              <button className="button button--full" type="submit" disabled={form.state === 'sending'}>
                {form.state === 'sending' ? 'Looking' : 'Find my order'}
              </button>

              <FormNote state={form.state === 'done' ? 'idle' : form.state} error="Add an order number and an email." done="" />
            </form>
          </Reveal>
        </div>
      </section>

      {found && (
        <section className="section scheme-soft">
          <div className="page-width">
            <Reveal className="track-card">
              <div className="track-card__head">
                <div>
                  <p className="eyebrow">{sample.number}</p>
                  <h2 className="heading-md">{sample.piece}</h2>
                  <p className="body-muted">{sample.updated}</p>
                </div>
                <span className="track-card__stage">{stages[sample.stage]}</span>
              </div>

              <ol className="track-steps">
                {stages.map((stage, i) => (
                  <li key={stage} data-state={i < sample.stage ? 'done' : i === sample.stage ? 'current' : 'todo'}>
                    <span className="track-steps__dot" aria-hidden="true" />
                    <span className="track-steps__label">{stage}</span>
                  </li>
                ))}
              </ol>

              <p className="body-muted track-card__note">{sample.note}</p>
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand
        heading="Cannot find the email?"
        body="Tell us roughly when you ordered and what it was. We will find it."
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'Shipping and returns', href: '/shipping-returns' }}
        art={{ seed: 622, tone: 'lilac' }}
        photo={PHOTOS.boxedNecklace}
      />
    </>
  );
}

/* ---------------------------------------------------------------
   Gift cards
---------------------------------------------------------------- */
export function GiftCards() {
  usePageTitle('Gift cards');
  const { format } = useShop();
  const [amount, setAmount] = useState(giftCardsPage.amounts[1]);
  const [delivery, setDelivery] = useState('email');
  const form = useLocalForm({ to: '', toEmail: '', from: '', message: '' });

  const onSubmit = (event) => {
    form.submit(event, (values) => {
      if (!values.to.trim()) return 'to';
      if (delivery === 'email' && !values.toEmail.includes('@')) return 'email';
      return null;
    });
  };

  return (
    <>
      <PageHero
        eyebrow={giftCardsPage.eyebrow}
        title={giftCardsPage.title}
        lede={giftCardsPage.lede}
        art={giftCardsPage.art}
        photo={giftCardsPage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Gift cards' }]}
      />

      <section className="section scheme-light">
        <div className="page-width gift-layout">
          <Reveal className="gift-preview" variant="reveal--scale">
            <div className="gift-card-art">
              <Media photo={PHOTOS.ribbonBox} art={{ seed: 632, tone: 'blush' }} ratio={0.625} alt="" sizes="(max-width: 900px) 100vw, 38vw" />
              <div className="gift-card-art__overlay">
                <span className="gift-card-art__brand">Stillwater</span>
                <span className="gift-card-art__amount">{format(amount, { withCode: false })}</span>
                <span className="gift-card-art__note">Gift card</span>
              </div>
            </div>
          </Reveal>

          <div className="gift-form">
            <Reveal>
              <p className="eyebrow">Amount</p>
              <div className="size-row gift-amounts">
                {giftCardsPage.amounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="size-chip size-chip--wide"
                    data-selected={amount === value}
                    onClick={() => setAmount(value)}
                  >
                    {format(value, { withCode: false })}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="eyebrow">Delivery</p>
              <div className="size-row">
                {[
                  { key: 'email', label: 'By email' },
                  { key: 'post', label: 'Printed and posted' },
                ].map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    className="size-chip size-chip--wide"
                    data-selected={delivery === option.key}
                    onClick={() => setDelivery(option.key)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal className="form-card" delay={200}>
              <form onSubmit={onSubmit} noValidate>
                <div className="form-grid">
                  <Field label="Their name" name="to" required value={form.values.to} onChange={form.change} />
                  {delivery === 'email' && (
                    <Field
                      label="Their email"
                      name="toEmail"
                      type="email"
                      required
                      value={form.values.toEmail}
                      onChange={form.change}
                    />
                  )}
                  <Field label="Your name" name="from" value={form.values.from} onChange={form.change} />
                </div>

                <Field
                  label="Message"
                  name="message"
                  type="textarea"
                  rows={3}
                  value={form.values.message}
                  onChange={form.change}
                />

                <button className="button button--full" type="submit" disabled={form.state === 'sending'}>
                  {form.state === 'sending'
                    ? 'Adding'
                    : form.state === 'done'
                      ? 'Added to bag'
                      : `Add ${format(amount, { withCode: false })} gift card`}
                </button>

                <FormNote
                  state={form.state}
                  error="Add their name, and an email if you are sending it that way."
                  done="Added. You can pay for it in the bag."
                />
              </form>
            </Reveal>

            <Reveal className="gift-points" delay={280}>
              <ul>
                {giftCardsPage.points.map((point) => (
                  <li key={point}>
                    <span className="atelier__marker" aria-hidden="true" />
                    <span className="body-muted">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Would rather choose for them?"
        body="Bring us a budget and a hint about who they are, and we will suggest three things."
        primary={{ label: 'Ask us', href: '/contact' }}
        secondary={{ label: 'Browse the shop', href: '/collections/all' }}
        art={{ seed: 633, tone: 'blush' }}
        photo={PHOTOS.boxedRing}
      />
    </>
  );
}

/* ---------------------------------------------------------------
   Contact
---------------------------------------------------------------- */
export function Contact() {
  usePageTitle('Contact us');
  const form = useLocalForm({ name: '', email: '', subject: '', message: '' });

  const onSubmit = (event) => {
    form.submit(event, (values) => {
      if (!values.name.trim()) return 'name';
      if (!values.email.includes('@') || !values.email.includes('.')) return 'email';
      if (!values.message.trim()) return 'message';
      return null;
    });
  };

  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        lede={contactPage.lede}
        art={contactPage.art}
        photo={contactPage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact us' }]}
      />

      <section className="section scheme-light">
        <div className="page-width form-section">
          <div className="form-section__intro">
            <h2 className="heading-lg">
              <RevealLine>Write to us</RevealLine>
            </h2>

            <Reveal className="contact-channels" delay={140}>
              <ul>
                {contactPage.channels.map((channel) => (
                  <li key={channel.label}>
                    <span className="eyebrow">{channel.label}</span>
                    <a className="link-underline link-underline--static" href={`mailto:${channel.value}`}>
                      {channel.value}
                    </a>
                    <span className="body-muted contact-channels__note">{channel.note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="contact-hours" delay={260}>
              <p className="eyebrow">Opening hours</p>
              <ul>
                {contactPage.hours.map((row) => (
                  <li key={row.day}>
                    <span>{row.day}</span>
                    <span className="body-muted">{row.time}</span>
                  </li>
                ))}
              </ul>
              <Link className="link-underline link-underline--static" to="/appointments">
                Book an appointment
              </Link>
            </Reveal>
          </div>

          <Reveal className="form-card" delay={120}>
            <form onSubmit={onSubmit} noValidate>
              <div className="form-grid">
                <Field label="Your name" name="name" required value={form.values.name} onChange={form.change} />
                <Field label="Email" name="email" type="email" required value={form.values.email} onChange={form.change} />
                <Field
                  label="What is it about"
                  name="subject"
                  type="select"
                  options={contactPage.subjects}
                  value={form.values.subject}
                  onChange={form.change}
                />
              </div>

              <Field
                label="Message"
                name="message"
                type="textarea"
                rows={5}
                required
                value={form.values.message}
                onChange={form.change}
              />

              <button className="button button--full" type="submit" disabled={form.state === 'sending'}>
                {form.state === 'sending' ? 'Sending' : form.state === 'done' ? 'Sent' : 'Send it'}
              </button>

              <FormNote
                state={form.state}
                error="Please add your name, a valid email and a message."
                done="Thank you. We answer within one working day."
              />
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
