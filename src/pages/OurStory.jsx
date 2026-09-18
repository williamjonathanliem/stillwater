import { ourStory } from '../data/content';
import { PHOTOS } from '../data/media';
import Reveal, { RevealLine } from '../components/Reveal';
import Marquee from '../components/Marquee';
import { CtaBand, PageHero, SplitSection, usePageTitle } from '../components/PageKit';
import { Pillars } from '../components/Sections';

export default function OurStory() {
  usePageTitle('Our story');

  return (
    <>
      <PageHero
        eyebrow={ourStory.eyebrow}
        title={ourStory.title}
        lede={ourStory.lede}
        art={ourStory.art}
        photo={ourStory.photo}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Our story' }]}
      />

      <div className="section scheme-light story-sections">
        {ourStory.sections.map((section, i) => (
          <SplitSection
            key={section.heading}
            heading={section.heading}
            body={section.body}
            art={section.art}
            photo={section.photo}
            flip={i % 2 === 1}
          />
        ))}
      </div>

      <section className="section scheme-soft timeline-section">
        <div className="page-width">
          <h2 className="heading-md timeline__head">
            <RevealLine>How it went</RevealLine>
          </h2>
          <ol className="timeline">
            {ourStory.milestones.map((milestone, i) => (
              <Reveal as="li" key={milestone.year} className="timeline__item" delay={i * 120}>
                <span className="timeline__year">{milestone.year}</span>
                <span className="timeline__dot" aria-hidden="true" />
                <p className="body-muted">{milestone.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Pillars />

      <Marquee speed={30} scheme="scheme-soft" />

      <CtaBand
        heading="Come and see what we have bought lately"
        body="Appointments are free, and there is no expectation that you buy anything."
        primary={{ label: 'Book an appointment', href: '/appointments' }}
        secondary={{ label: 'See the atelier', href: '/atelier' }}
        art={{ seed: 505, tone: 'indigo' }}
        photo={PHOTOS.workbench}
      />
    </>
  );
}
