import React from 'react';
import '../../styles/Marquee.css';

const DEFAULT_ITEMS = ['Footonia', 'Step into style', 'Premium footwear', 'New season', 'Wholesale & retail', 'Imported collections'];

function Marquee({ items = DEFAULT_ITEMS, reverse = false, variant = 'dark' }) {
  const row = (hidden) => (
    <div className="marquee-group" aria-hidden={hidden}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="marquee-item">
          {item}
          <svg className="marquee-star" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee marquee-${variant} ${reverse ? 'marquee-reverse' : ''}`}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export default Marquee;
