import { useState } from 'react';
import { Link } from 'react-router-dom';
import Media from './Media';
import { useShop } from '../context/ShopContext';

/**
 * Product tile. Hovering lifts the card, crossfades to the second angle
 * with a slow zoom underneath, and slides a quick-add button up over the
 * bottom edge of the image.
 */
export default function ProductCard({ product, index = 0 }) {
  const { addItem, format } = useShop();
  const [adding, setAdding] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (product.soldOut) return;
    setAdding(true);
    addItem(product, 1);
    window.setTimeout(() => setAdding(false), 1100);
  };

  return (
    <article className="product-card" data-sold-out={!!product.soldOut} style={{ '--i': index }}>
      <Link className="product-card__link" to={`/products/${product.handle}`}>
        <div className="product-card__media">
          <div className="product-card__image product-card__image--primary">
            <Media
              photo={product.photo}
              art={product.art}
              alt={product.name}
              sizes="(max-width: 640px) 74vw, (max-width: 1100px) 45vw, 22vw"
            />
          </div>
          <div className="product-card__image product-card__image--secondary">
            <Media
              photo={product.photoAlt}
              art={product.artAlt}
              alt=""
              sizes="(max-width: 640px) 74vw, (max-width: 1100px) 45vw, 22vw"
            />
          </div>

          {product.badge && (
            <span
              className="product-card__badge"
              data-variant={product.soldOut ? 'sold' : product.badge === 'Sale' ? 'sale' : 'note'}
            >
              {product.badge}
            </span>
          )}

          <button
            className="product-card__quick-add"
            type="button"
            onClick={handleAdd}
            disabled={product.soldOut}
            data-state={adding ? 'added' : 'idle'}
          >
            <span className="product-card__quick-add-label">
              {product.soldOut ? 'Sold out' : adding ? 'Added to bag' : 'Quick add'}
            </span>
          </button>
        </div>

        <div className="product-card__body">
          <p className="product-card__stone">{product.stone}</p>
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__price">
            {product.compareAt && <span className="product-card__price-was">{format(product.compareAt)}</span>}
            <span>{format(product.price)}</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
