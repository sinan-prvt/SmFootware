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
          <p className="category">{product.brand_name || product.category_name}</p>
          {product.code && <p className="sku-code" style={{fontSize: '12px', color: '#888', marginBottom: '10px'}}>Code: {product.code}</p>}

          {product.show_price && product.price && (
            <p className="price">${parseFloat(product.price).toFixed(2)}</p>
          )}

          <p className="description">{product.description}</p>

          {(() => {
            const sizeArray = Array.isArray(product.sizes) 
              ? product.sizes 
              : typeof product.sizes === 'string' 
                ? product.sizes.split(',').map(s => s.trim()).filter(Boolean)
                : [];
            
            if (sizeArray.length === 0) return null;

            return (
              <div className="product-sizes" style={{marginTop: '15px'}}>
                <h4 style={{marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase'}}>Available Sizes:</h4>
                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                  {sizeArray.map((size) => (
                    <span key={size} style={{padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px'}}>{size}</span>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="modal-actions">
            <button className="whatsapp-btn" onClick={handleWhatsApp}>
              📱 Contact on WhatsApp
            </button>
          </div>

          {images.length > 1 && (
            <div className="thumbnail-gallery" style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
              {images.map((img, idx) => (
                <img
                  key={img.id || idx}
                  src={(img.url || img.image)?.startsWith('http') ? (img.url || img.image) : `http://localhost:8000${img.url || img.image}`}
                  alt={img.alt_text || `${product.name} ${idx + 1}`}
                  className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  style={{width: '60px', height: '60px', objectFit: 'cover', cursor: 'pointer', border: idx === currentImageIndex ? '2px solid #000' : '1px solid #eee'}}
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
