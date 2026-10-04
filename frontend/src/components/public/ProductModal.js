import React, { useState, useEffect } from 'react';
import '../../styles/ProductModal.css';
import { getImageUrl } from '../../utils/media';

const splitList = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return value.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
};

function ProductModal({ product, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomMode, setIsZoomMode] = useState(false);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (isZoomMode) setIsZoomMode(false);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isZoomMode, onClose]);

  const images = product.images || [];
  const currentImage = images.length > 0 ? images[currentImageIndex] : null;
  const colors = splitList(product.colors);
  const sizes = splitList(product.sizes);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleWhatsApp = () => {
    const phoneNumber = "919495381001";
    const message = `Hi Footonia, I'm interested in ${product.name} ${product.article ? `(Article: ${product.article})` : ''}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-label={product.name} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close">×</button>

        <div className="modal-gallery">
          <div className="gallery-glow" aria-hidden="true" />
          {currentImage && (
            <img
              key={currentImageIndex}
              src={getImageUrl(currentImage)}
              alt={currentImage.alt_text || product.name}
              className="gallery-image"
              onClick={() => setIsZoomMode(true)}
            />
          )}

          {images.length > 1 && (
            <>
              <button className="gallery-prev" onClick={handlePrevImage} aria-label="Previous image">‹</button>
              <button className="gallery-next" onClick={handleNextImage} aria-label="Next image">›</button>
              <div className="image-counter">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        <div className="modal-info">
          {images.length > 1 && (
            <div className="thumbnail-gallery">
              {images.map((img, idx) => (
                <img
                  key={img.id || idx}
                  src={getImageUrl(img)}
                  alt={img.alt_text || `${product.name} ${idx + 1}`}
                  className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}

          <div className="modal-meta modal-stagger" style={{ '--d': '0.1s' }}>
            <p className="category">{product.gender} | {product.brand_name || product.category_name}</p>
            {product.in_stock !== undefined && (
              <span className={`modal-stock ${product.in_stock ? 'in' : 'out'}`}>
                {product.in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
            )}
          </div>

          <h2 className="modal-stagger" style={{ '--d': '0.16s' }}>{product.name}</h2>

          <div className="technical-specs-simple modal-stagger" style={{ '--d': '0.22s' }}>
            {product.article && (
              <p className="article-code">ARTICLE: {product.article}</p>
            )}

            {colors.length > 0 && (
              <div className="spec-group">
                <h4>Available Colors</h4>
                <div className="chip-row">
                  {colors.map((color) => (
                    <span key={color} className="spec-chip">{color}</span>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="spec-group">
                <h4>Available Sizes</h4>
                <div className="chip-row">
                  {sizes.map((size) => (
                    <span key={size} className="spec-chip">{size}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="modal-actions modal-stagger" style={{ '--d': '0.28s' }}>
            {product.show_price && product.price ? (
              <p className="price">₹{parseFloat(product.price).toLocaleString('en-IN')}</p>
            ) : null}
            <button className="whatsapp-btn" onClick={handleWhatsApp}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.26 11.26 0 0 0 12.05.72C5.8.72.72 5.8.72 12.05c0 2 .52 3.95 1.52 5.66L.62 23.62l6.04-1.58a11.3 11.3 0 0 0 5.4 1.37h.01c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.32-8.01" />
              </svg>
              Enquire on WhatsApp
            </button>
          </div>
        </div>

        {isZoomMode && currentImage && (
          <div className="zoom-overlay" onClick={() => setIsZoomMode(false)}>
            <button className="zoom-close" aria-label="Close zoom">×</button>
            <div className="zoomed-image-container">
              <img
                src={getImageUrl(currentImage)}
                alt={currentImage.alt_text || product.name}
                className="zoomed-image"
              />
              <p className="zoom-hint">Tap anywhere to close</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductModal;
