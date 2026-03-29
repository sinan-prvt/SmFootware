import React from 'react';
import '../../styles/ProductSkeleton.css';

const ProductSkeleton = () => {
  return (
    <div className="product-skeleton-card">
      <div className="skeleton-image-wrapper">
        <div className="skeleton-shimmer"></div>
      </div>
      <div className="skeleton-info">
        <div className="skeleton-line skeleton-title">
          <div className="skeleton-shimmer"></div>
        </div>
        <div className="skeleton-line skeleton-brand">
          <div className="skeleton-shimmer"></div>
        </div>
        <div className="skeleton-line skeleton-code">
          <div className="skeleton-shimmer"></div>
        </div>
        <div className="skeleton-line skeleton-price">
          <div className="skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
