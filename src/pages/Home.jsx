import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import ProductList from '../components/ProductList';
import { Atelier, ClosingHero, CollectionList, Intro, Pillars } from '../components/Sections';
import { usePageTitle } from '../components/PageKit';

export default function Home() {
  usePageTitle('');

  return (
    <>
      <Hero />
      <Marquee speed={26} />
      <Intro />
      <ProductList />
      <CollectionList />
      <Pillars />
      <Atelier />
      <Marquee speed={34} direction="reverse" scheme="scheme-light" />
      <ClosingHero />
    </>
  );
}
