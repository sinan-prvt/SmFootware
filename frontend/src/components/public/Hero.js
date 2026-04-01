import React, { useState, useEffect } from 'react';
import '../../styles/Hero.css';

function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Short delay to ensure splash screen has fully faded out
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
      {/* Top Navigation */}
      <nav className="hero-nav">
        <div className="nav-logo">
          <img src="/logo.png" alt="SM Footware Logo" style={{ width: 'auto', height: '40px', objectFit: 'contain' }} />
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
            SM FOOTWARE
          </div>
        </div>
      </nav>

      {/* Dropdown Menu - Moved outside nav to prevent flex interference */}
      <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="dropdown-content">
          <a href="/" onClick={() => setIsMenuOpen(false)}>HOME</a>
          <a href="#collection" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); scrollToCollection(); }}>SHOP</a>
          <a href="/admin" className="dropdown-login" onClick={() => setIsMenuOpen(false)}>LOGIN</a>
          <div className="dropdown-footer">
            <p>SM FOOTWARE</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="hero-content">

        {/* Background Large Text */}
        <div className="bg-text">09:36.5</div>

        {/* Diagonal Background Lines */}
        <div className="bg-lines">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
        </div>

        {/* Orbiting Spheres */}
        <div className="sphere sphere-xl pos-1"></div>
        <div className="sphere sphere-l pos-2"></div>
        <div className="sphere sphere-m pos-3"></div>
        <div className="sphere sphere-s pos-4"></div>
        <div className="sphere sphere-xs pos-5"></div>
        <div className="sphere sphere-small pos-6"></div>

        {/* Shoe Image */}
        <div className="shoe-wrapper">
          <img
            src="/shoe.png"
            alt="Nike Premium Shoe"
            className="shoe-img"
            onError={(e) => {
              e.target.onerror = null;
              // Fallback inline styling or image if not found
              e.target.src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop";
            }}
          />
        </div>


        {/* Side Text / Annotations */}
        <div className="side-text left-side">SERIES 08</div>
        <div className="side-text right-side">092 / 365</div>

        {/* Bottom Navigation Links */}
        <div className="bottom-links">
          <button className="bottom-link explore-btn" onClick={scrollToCollection}>EXPLORE</button>
          <button className="bottom-link shop-btn" onClick={scrollToCollection}>SHOP</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
