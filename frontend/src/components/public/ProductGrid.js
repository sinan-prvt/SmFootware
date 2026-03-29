import React from 'react';
import '../../styles/ProductGrid.css';
import ProductSkeleton from './ProductSkeleton';

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
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => onSelectProduct(product)}
        >
          {product.images && product.images.length > 0 && (
            <img
              src={
                (product.images[0].url || product.images[0].image)?.startsWith('http')
                  ? (product.images[0].url || product.images[0].image)
                  : `http://localhost:8000${product.images[0].url || product.images[0].image}`
              }
              alt={product.images[0].alt_text || product.name}
              className="product-image"
            />
          )}
          <div className="product-details">
            <h3>{product.name}</h3>
            <p className="category">{product.brand_name || product.category_name}</p>
            {product.code && <p className="product-code" style={{fontSize: '11px', color: '#666', margin: '4px 0'}}>SKU: {product.code}</p>}
            {product.show_price && product.price && (
              <p className="price">${parseFloat(product.price).toFixed(2)}</p>
            )}
          </div>
        </div>
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
