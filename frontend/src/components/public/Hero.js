import React, { useState, useEffect } from 'react';
import '../../styles/Hero.css';

function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`hero-container ${isLoaded ? 'loaded' : ''}`}>
      <nav className="hero-nav">
        <div className="nav-logo">
          <img src="/logo.png" alt="SM Footwear Logo" style={{ width: 'auto', height: '40px', objectFit: 'contain' }} />
        </div>
        <div 
          className={`nav-menu ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          style={{ cursor: 'pointer', zIndex: 1001 }}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        
        <div className="nav-actions" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          <div className="nav-cart" style={{fontWeight: '700', fontSize: '14px', letterSpacing: '1px'}}>
            SM FOOTWEAR
          </div>
        </div>
      </nav>

      <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="dropdown-content">
          <a href="/" onClick={() => setIsMenuOpen(false)}>HOME</a>
          <a href="#collection" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); scrollToCollection(); }}>SHOP</a>
          <a href="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
          <a href="/admin" className="dropdown-login" onClick={() => setIsMenuOpen(false)}>LOGIN</a>
          <div className="dropdown-footer">
            <p>SM FOOTWEAR</p>
          </div>
        </div>
      </div>

      <div className="hero-content">

        <div className="bg-text">09:36.5</div>

        <div className="bg-lines">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
        </div>

        <div className="sphere sphere-xl pos-1"></div>
        <div className="sphere sphere-l pos-2"></div>
        <div className="sphere sphere-m pos-3"></div>
        <div className="sphere sphere-s pos-4"></div>
        <div className="sphere sphere-xs pos-5"></div>
        <div className="sphere sphere-small pos-6"></div>

        <div className="shoe-wrapper">
          <img
            src="/shoe.png"
            alt="Nike Premium Shoe"
            className="shoe-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop";
            }}
          />
        </div>


        <div className="side-text left-side">SERIES 08</div>
        <div className="side-text right-side">092 / 365</div>

        <div className="bottom-links">
          <button className="bottom-link explore-btn" onClick={scrollToCollection}>EXPLORE</button>
          <button className="bottom-link shop-btn" onClick={scrollToCollection}>SHOP</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
