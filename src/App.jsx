import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartDrawer, MenuDrawer, SearchOverlay } from './components/Drawers';

import Home from './pages/Home';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import OurStory from './pages/OurStory';
import AtelierPage from './pages/AtelierPage';
import CustomPage from './pages/CustomPage';
import { Appointments, Stockists } from './pages/VisitPages';
import { Journal, JournalPost } from './pages/Journal';
import { CustomFaq, Faq, JewelleryCare, Repairs, RingSizing } from './pages/HelpPages';
import { Contact, GiftCards, Shipping, TrackOrder } from './pages/OrderPages';
import NotFound from './pages/NotFound';

/** Routes whose first section is a full-bleed hero the header sits over. */
const TRANSPARENT_HEADER_ROUTES = ['/'];

/** Jumps to the top on navigation, except when the browser restores a position. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, hash]);

  return null;
}

/** Fades each route in, so navigation does not snap. */
function RouteFade({ children }) {
  const { pathname } = useLocation();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(false);
    const raf = window.requestAnimationFrame(() => setShown(true));
    return () => window.cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div className="route-fade" data-shown={shown}>
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 260);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="site" data-ready={ready}>
      <span className="page-curtain" aria-hidden="true" />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ScrollToTop />
      <AnnouncementBar />

      <Header
        transparentAtTop={TRANSPARENT_HEADER_ROUTES.includes(pathname)}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main id="main">
        <RouteFade>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:handle" element={<CollectionDetail />} />
            <Route path="/products/:handle" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/our-story" element={<OurStory />} />
            <Route path="/atelier" element={<AtelierPage />} />
            <Route path="/custom" element={<CustomPage />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/stockists" element={<Stockists />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<JournalPost />} />

            <Route path="/jewellery-care" element={<JewelleryCare />} />
            <Route path="/ring-sizing" element={<RingSizing />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/custom-faq" element={<CustomFaq />} />
            <Route path="/faq" element={<Faq />} />

            <Route path="/shipping-returns" element={<Shipping />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteFade>
      </main>

      <Footer />

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
