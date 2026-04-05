import React from 'react';
import '../../styles/ProductGrid.css';
import ProductSkeleton from './ProductSkeleton';
import ScrollReveal from './ScrollReveal';

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
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#eee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 10H12" stroke="#eee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>No Products Found</h3>
        <p>We couldn't find any products matching your selection. Try clearing your filters or exploring our other collections.</p>
        <button 
          className="empty-state-btn"
          onClick={() => window.location.href = '/'}
        >
          VIEW ALL PRODUCTS
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ScrollReveal key={product.id} delay={(index % 8) * 0.1} threshold={0.1}>
          <div
            className="product-card"
            onClick={() => onSelectProduct(product)}
          >
            <div className="product-image-outer">
              {product.images && product.images.length > 0 && (
                <img
                  src={
                    (product.images[0].url || product.images[0].image)?.startsWith('http')
                      ? (product.images[0].url || product.images[0].image)
                      : `${(process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '').replace('/api', '')}${product.images[0].url || product.images[0].image}`
                  }
                  alt={product.images[0].alt_text || product.name}
                  className="product-image"
                />
              )}
              {product.in_stock !== undefined && (
                <span className={`stock-status-badge ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              )}
              <div className="product-card-overlay">
                <span>VIEW DETAILS</span>
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
        </ScrollReveal>
      ))}

      {hasMore && !loading && (
        <button 
          className="load-more-btn" 
          onClick={onLoadMore}
        >
          Load More Products
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
