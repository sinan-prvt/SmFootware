import React from 'react';
import '../../styles/ProductGrid.css';
import ProductSkeleton from './ProductSkeleton';
import ScrollReveal from './ScrollReveal';
import { useTilt } from '../../hooks/useMotion';
import { getImageUrl } from '../../utils/media';

function ProductCard({ product, onSelect }) {
  const tiltRef = useTilt(8);
  const image = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <div
      ref={tiltRef}
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
    >
      <div className="product-image-outer">
        {image && (
          <img
            src={getImageUrl(image)}
            alt={image.alt_text || product.name}
            className="product-image"
            loading="lazy"
          />
        )}
        {product.in_stock !== undefined && (
          <span className={`stock-status-badge ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
        )}
        <div className="product-card-overlay">
          <span>View details</span>
        </div>
      </div>
      <div className="product-info-premium">
        <p className="product-brand-eyebrow">
          {product.gender} | {product.brand_name || product.category_name}
        </p>
        <h3 className="product-title-premium">{product.name}</h3>
        <div className="product-bottom-meta">
          {product.show_price && product.price && (
            <p className="price-premium">₹{parseFloat(product.price).toLocaleString('en-IN')}</p>
          )}
          {product.article && <span className="sku-tag">#{product.article}</span>}
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products, loading, onSelectProduct, onLoadMore, hasMore }) {
  if (loading && products.length === 0) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="no-products-premium">
        <div className="empty-state-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 10H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>No Products Found</h3>
        <p>We couldn't find any products matching your selection. Try clearing your filters or exploring our other collections.</p>
        <button
          className="empty-state-btn btn-pill btn-dark"
          onClick={() => window.location.href = '/'}
        >
          View all products
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ScrollReveal key={product.id} variant="flip" delay={(index % 4) * 0.08} threshold={0.1}>
          <ProductCard product={product} onSelect={onSelectProduct} />
        </ScrollReveal>
      ))}

      {hasMore && !loading && (
        <button
          className="load-more-btn btn-pill btn-ghost"
          onClick={onLoadMore}
        >
          Load more products
        </button>
      )}

      {loading && products.length > 0 && (
        <>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </>
      )}
    </div>
  );
}

export default ProductGrid;
