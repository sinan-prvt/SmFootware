import React from 'react';
import '../../styles/SplashScreen.css';

function SplashScreen() {
  return (
    <div className="splash-screen" role="status" aria-label="Loading Footonia">
      <div className="splash-inner">
        <img src="/favicon.svg" alt="" className="splash-mark" />
        <div className="splash-word" aria-hidden="true">
          {'FOOTONIA'.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i }}>{ch}</span>
          ))}
        </div>
        <p className="splash-tag">Premium footwear for every step</p>
        <div className="loading-bar-container">
          <div className="loading-bar" />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
