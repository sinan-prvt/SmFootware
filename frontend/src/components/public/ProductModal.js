import React, { useState, useEffect } from 'react';
import '../../styles/ProductModal.css';

function ProductModal({ product, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomMode, setIsZoomMode] = useState(false);

  useEffect(() => {
    // Lock background scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const images = product.images || [];
  const currentImage = images.length > 0 ? images[currentImageIndex] : null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleWhatsApp = () => {
    const phoneNumber = "919495381001";
    const message = `Hi, I'm interested in ${product.name} ${product.article ? `(Article: ${product.article})` : ''}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-gallery">
          {currentImage && (
            <img
              src={(currentImage.url || currentImage.image)?.startsWith('http') ? (currentImage.url || currentImage.image) : `${process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}${currentImage.url || currentImage.image}`}
              alt={currentImage.alt_text || product.name}
              className="gallery-image"
              onClick={() => setIsZoomMode(true)}
              style={{ cursor: 'zoom-in' }}
            />
          )}

          {images.length > 1 && (
            <>
              <button className="gallery-prev" onClick={handlePrevImage}>‹</button>
              <button className="gallery-next" onClick={handleNextImage}>›</button>
              <div className="image-counter">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        <div className="modal-info">
          {images.length > 1 && (
            <div className="thumbnail-gallery" style={{ marginBottom: '15px', display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
              {images.map((img, idx) => (
                <img
                  key={img.id || idx}
                  src={(img.url || img.image)?.startsWith('http') ? (img.url || img.image) : `${process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}${img.url || img.image}`}
                  alt={img.alt_text || `${product.name} ${idx + 1}`}
                  className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    objectFit: 'cover', 
                    cursor: 'pointer', 
                    borderRadius: '6px',
                    border: idx === currentImageIndex ? '2px solid #000' : '1px solid #eee',
                    flexShrink: 0
                  }}
                />
              ))}
            </div>
          )}

          <h2>{product.name}</h2>
          <p className="category">{product.gender} | {product.brand_name || product.category_name}</p>
          
          <div className="technical-specs-simple" style={{ marginTop: '12px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            {product.article && (
              <p style={{ fontSize: '14px', color: '#111', fontWeight: '900', letterSpacing: '1px', marginBottom: '15px' }}>
                ARTICLE: {product.article}
              </p>
            )}

            {product.colors && (
              <div className="colors-section" style={{ marginBottom: '15px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px' }}>Available Colors</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.colors.split(',').map(c => c.trim()).filter(Boolean).map(color => (
                    <span key={color} style={{ padding: '6px 12px', background: '#f5f5f5', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>{color}</span>
                  ))}
                </div>
              </div>
            )}

            {(() => {
              const sizeArray = Array.isArray(product.sizes)
                ? product.sizes
                : typeof product.sizes === 'string'
                  ? product.sizes.split(',').map(s => s.trim()).filter(Boolean)
                  : [];

              if (sizeArray.length === 0) return null;

              return (
                <div className="sizes-section">
                  <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px' }}>Available Sizes</h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {sizeArray.map((size) => (
                      <span key={size} style={{ padding: '6px 12px', background: '#f5f5f5', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>{size}</span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="modal-actions" style={{ marginTop: '25px' }}>
            {product.show_price && product.price && (
              <p className="price" style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '15px' }}>₹{parseFloat(product.price).toLocaleString('en-IN')}</p>
            )}
            <button className="whatsapp-btn" onClick={handleWhatsApp}>
              📱 Contact on WhatsApp
            </button>
          </div>
        </div>

        {isZoomMode && currentImage && (
          <div className="zoom-overlay" onClick={() => setIsZoomMode(false)}>
            <button className="zoom-close">×</button>
            <div className="zoomed-image-container">
              <img
                src={(currentImage.url || currentImage.image)?.startsWith('http') ? (currentImage.url || currentImage.image) : `${process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}${currentImage.url || currentImage.image}`}
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
