import React from 'react';
import '../../styles/SplashScreen.css';

function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="logo-container">
        <img src="/logo.png" alt="SM Footwear Logo" className="splash-logo" />
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
