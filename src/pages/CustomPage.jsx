import { customPage } from '../data/content';
import { useShop } from '../context/ShopContext';
import Reveal, { RevealLine } from '../components/Reveal';
import Marquee from '../components/Marquee';
import {
  Field,
  FormNote,
  PageHero,
  StepLadder,
  usePageTitle,
  useLocalForm,
} from '../components/PageKit';

export default function CustomPage() {
  usePageTitle('Commissions');
  const { format } = useShop();
  const form = useLocalForm({
    name: '',
    email: '',
    subject: '',
    budget: '',
    stone: '',
    message: '',
  });

  const onSubmit = (event) => {
    form.submit(event, (values) => {
      if (!values.name.trim()) return 'name';
      if (!values.email.includes('@') || !values.email.includes('.')) return 'email';
      if (!values.subject) return 'subject';
      if (!values.message.trim()) return 'message';
      return null;
    });
  };

  return (
    <>
      <PageHero
        eyebrow={customPage.eyebrow}
        title={customPage.title}
        lede={customPage.lede}
        art={customPage.art}
        photo={customPage.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Commissions' }]}
      >
        <a className="button" href="#commission-form">
          Send a brief
        </a>
      </PageHero>

      <section className="section scheme-light">
        <div className="page-width">
          <h2 className="heading-md section-head">
            <RevealLine>Four steps, no surprises</RevealLine>
          </h2>
          <StepLadder steps={customPage.steps} />
        </div>
      </section>

      <section className="section scheme-soft">
        <div className="page-width">
          <h2 className="heading-md section-head">
            <RevealLine>What it tends to cost</RevealLine>
          </h2>
          <div className="pricing-grid">
            {customPage.pricing.map((tier, i) => (
              <Reveal key={tier.tier} className="pricing-card" delay={i * 110}>
                <p className="pricing-card__tier">{tier.tier}</p>
                <p className="pricing-card__price">
                  <span className="pricing-card__from">from</span> {format(tier.from, { withCode: false })}
                </p>
                <p className="body-muted">{tier.note}</p>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="body-muted pricing-note" delay={360}>
            These are starting points, not quotes. The stone drives most of the cost, and we give you a fixed, itemised
            price before anything is made.
          </Reveal>
        </div>
      </section>

      <Marquee speed={32} scheme="scheme-light" />

      <section className="section scheme-light" id="commission-form">
        <div className="page-width form-section">
          <div className="form-section__intro">
            <h2 className="heading-lg">
              <RevealLine>Tell us what you are after</RevealLine>
            </h2>
            <Reveal as="p" className="body-muted" delay={160}>
              Nothing here is binding. The more you can say about colour, budget and how often you expect to wear it, the
              more useful our first reply will be.
            </Reveal>
            <Reveal as="p" className="body-muted" delay={260}>
              If you already own the stone, say so. Resets are the most common thing we take on.
            </Reveal>
          </div>

          <Reveal className="form-card" delay={120}>
            <form onSubmit={onSubmit} noValidate>
              <div className="form-grid">
                <Field label="Your name" name="name" required value={form.values.name} onChange={form.change} />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={form.values.email}
                  onChange={form.change}
                />
                <Field
                  label="What kind of project"
                  name="subject"
                  type="select"
                  options={customPage.subjects}
                  required
                  value={form.values.subject}
                  onChange={form.change}
                />
                <Field
                  label="Budget"
                  name="budget"
                  type="select"
                  options={customPage.budgets}
                  value={form.values.budget}
                  onChange={form.change}
                />
                <Field
                  label="Stone or colour in mind"
                  name="stone"
                  placeholder="Green tourmaline, or just 'something warm'"
                  value={form.values.stone}
                  onChange={form.change}
                />
              </div>

              <Field
                label="Tell us more"
                name="message"
                type="textarea"
                rows={5}
                required
                placeholder="Who it is for, when you need it, and anything you already know you do not want."
                value={form.values.message}
                onChange={form.change}
              />

              <button className="button button--full" type="submit" disabled={form.state === 'sending'}>
                {form.state === 'sending' ? 'Sending' : form.state === 'done' ? 'Sent' : 'Send the brief'}
              </button>

              <FormNote
                state={form.state}
                error="Please add your name, a valid email, a project type and a message."
                done="Thank you. We will come back to you within two working days."
              />
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
