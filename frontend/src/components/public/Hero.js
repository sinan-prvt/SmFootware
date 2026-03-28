import React from 'react';
import '../../styles/Hero.css';

function Hero() {
  return (
    <div className="hero-container">
      {/* Top Navigation */}
      <nav className="hero-nav">
        <div className="nav-logo">
          <svg viewBox="0 0 100 100" width="40" height="40" fill="black">
            {/* simple nike swoosh approximation */}
            <path d="M24 60 C30 70, 45 70, 75 40 C60 55, 45 60, 24 60 Z" />
          </svg>
        </div>
        <div className="nav-menu">
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        <div className="nav-actions" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          <a href="/admin" className="nav-login" style={{textDecoration: 'none', color: '#000', fontWeight: '700', fontSize: '14px', letterSpacing: '1px'}}>LOGIN</a>
          <div className="nav-cart" style={{fontWeight: '700', fontSize: '14px', letterSpacing: '1px'}}>
            SM FOOTWARE
          </div>
        </div>
      </nav>

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
          <button className="bottom-link explore-btn">EXPLORE</button>
          <button className="bottom-link shop-btn">SHOP</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
