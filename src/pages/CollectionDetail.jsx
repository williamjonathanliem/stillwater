import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCollection, productsInCollection } from '../data/site';
import { PHOTOS } from '../data/media';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { CtaBand, PageHero, usePageTitle } from '../components/PageKit';
import NotFound from './NotFound';

const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price, low to high' },
  { key: 'price-desc', label: 'Price, high to low' },
  { key: 'name', label: 'Alphabetical' },
];

export default function CollectionDetail() {
  const { handle } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const collection = getCollection(handle);
  const stoneFilter = searchParams.get('stone');

  usePageTitle(collection ? collection.title : 'Collection');

  const items = useMemo(() => {
    if (!collection) return [];
    let list = productsInCollection(collection.handle);

    if (stoneFilter) {
      list = list.filter((product) => product.stoneKey === stoneFilter);
    }
    if (inStockOnly) {
      list = list.filter((product) => !product.soldOut);
    }

    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [collection, stoneFilter, inStockOnly, sort]);

  if (!collection) return <NotFound />;

  const clearStone = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('stone');
    setSearchParams(next);
  };

  return (
    <>
      <PageHero
        eyebrow="Collection"
        title={collection.title}
        lede={collection.blurb}
        art={collection.art}
        photo={collection.photo}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Collections', href: '/collections' },
          { label: collection.title },
        ]}
      />

      <section className="section scheme-light">
        <div className="page-width">
          <div className="filter-bar">
            <Reveal className="filter-bar__left">
              <span className="filter-bar__count">
                {items.length} {items.length === 1 ? 'piece' : 'pieces'}
              </span>

              {stoneFilter && (
                <button type="button" className="filter-chip" onClick={clearStone}>
                  {stoneFilter}
                  <span aria-hidden="true">&times;</span>
                </button>
              )}

              <button
                type="button"
                className="filter-toggle"
                onClick={() => setInStockOnly((value) => !value)}
                data-active={inStockOnly}
                aria-pressed={inStockOnly}
              >
                <span className="filter-toggle__box" aria-hidden="true" />
                In stock only
              </button>
            </Reveal>

            <Reveal className="filter-bar__right" delay={120}>
              <label className="sort" htmlFor="sort">
                <span className="visually-hidden">Sort by</span>
                <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                  {SORTS.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </Reveal>
          </div>

          {items.length === 0 ? (
            <Reveal className="empty-state">
              <p className="heading-md">Nothing here right now</p>
              <p className="body-muted">
                This happens often, because most runs are small. Tell us what you were after and we will look for it.
              </p>
              <Link className="button" to="/custom">
                Ask us to source it
              </Link>
            </Reveal>
          ) : (
            <div className="product-grid">
              {items.map((product, i) => (
                <Reveal key={product.id} delay={(i % 4) * 90}>
                  <ProductCard product={product} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        heading="Every piece here can be made again in another stone"
        body="If the run has sold out, a commission is usually the faster route than waiting."
        primary={{ label: 'Start a commission', href: '/custom' }}
        secondary={{ label: 'Read the commission FAQ', href: '/custom-faq' }}
        art={{ seed: 710, tone: 'aqua' }}
        photo={PHOTOS.solderTorch}
      />
    </>
  );
}
