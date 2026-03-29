import React, { useState } from 'react';
import '../../styles/ProductModal.css';

function ProductModal({ product, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.images || [];
  const currentImage = images.length > 0 ? images[currentImageIndex] : null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-gallery">
          {currentImage && (
            <img
              src={(currentImage.url || currentImage.image)?.startsWith('http') ? (currentImage.url || currentImage.image) : `http://localhost:8000${currentImage.url || currentImage.image}`}
              alt={currentImage.alt_text || product.name}
              className="gallery-image"
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
          <h2>{product.name}</h2>
          <p className="category">{product.gender} | {product.brand_name || product.category_name}</p>
          
          <div className="technical-specs-simple" style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            {product.article && (
              <p style={{ fontSize: '11px', color: '#bbb', fontWeight: '800', letterSpacing: '1px', marginBottom: '15px' }}>
                ARTICLE: {product.article}
              </p>
            )}

            {product.colors && (
              <div className="colors-section" style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px' }}>Available Colors</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.colors.split(',').map(c => c.trim()).filter(Boolean).map(color => (
                    <span key={color} style={{ padding: '6px 12px', background: '#f5f5f5', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{color}</span>
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
                      <span key={size} style={{ padding: '6px 12px', background: '#f5f5f5', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{size}</span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="modal-actions" style={{ marginTop: '30px' }}>
            {product.show_price && product.price && (
              <p className="price" style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '20px' }}>${parseFloat(product.price).toFixed(2)}</p>
            )}
            <button className="whatsapp-btn" onClick={handleWhatsApp}>
              📱 Contact on WhatsApp
            </button>
          </div>

          {images.length > 1 && (
            <div className="thumbnail-gallery" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              {images.map((img, idx) => (
                <img
                  key={img.id || idx}
                  src={(img.url || img.image)?.startsWith('http') ? (img.url || img.image) : `http://localhost:8000${img.url || img.image}`}
                  alt={img.alt_text || `${product.name} ${idx + 1}`}
                  className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', cursor: 'pointer', border: idx === currentImageIndex ? '2px solid #000' : '1px solid #eee' }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
