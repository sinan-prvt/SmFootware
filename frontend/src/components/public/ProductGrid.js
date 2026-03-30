import React from 'react';
import '../../styles/ProductGrid.css';
import ProductSkeleton from './ProductSkeleton';
import ScrollReveal from './ScrollReveal';

function ProductGrid({ products, loading, onSelectProduct, onLoadMore, hasMore }) {
  // Show 8 skeletons for initial load when no products exist yet for a better visual
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
    return <div className="no-products">No products found</div>;
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
