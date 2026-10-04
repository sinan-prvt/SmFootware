import React from 'react';
import '../../styles/FeaturedSections.css';
import ScrollReveal from './ScrollReveal';
import { useTilt } from '../../hooks/useMotion';

const featuredCollections = [
  {
    title: 'ELEVATE',
    subtitle: 'Blow Sneaker',
    themeColor: '#b01a1a',
    bgColor: '#ffe9a8',
    img: '/featured_dark.png',
    stars: 4
  },
  {
    title: 'AUTHENTIC',
    subtitle: 'White Sneaker',
    themeColor: '#2f5fc4',
    bgColor: '#d7e9ff',
    img: '/featured_white.png',
    stars: 4
  },
  {
    title: 'VELOCITY',
    subtitle: 'Black Sneaker',
    themeColor: '#5d6612',
    bgColor: '#ffd9e4',
    img: '/featured_black.png',
    stars: 4
  }
];

const reviews = [
  { id: 1, stars: 5, text: 'Great quality footwear with trendy designs. Customers love it.' },
  { id: 2, stars: 5, text: 'Reliable supplier with good pricing and on-time delivery.' },
  { id: 3, stars: 4, text: 'Wide variety—from budget to premium. Easy to sell.' },
  { id: 4, stars: 5, text: 'Imported collections are unique and in high demand.' },
  { id: 5, stars: 5, text: 'Good support and smooth bulk ordering experience.' },
  { id: 6, stars: 5, text: 'Consistent quality. Never had issues with stock.' },
  { id: 7, stars: 4, text: 'Perfect for retailers looking for fast-moving products.' },
  { id: 8, stars: 5, text: 'Excellent designs that sell quickly.' },
  { id: 9, stars: 5, text: 'Best place for trendy imported footwear.' },
  { id: 10, stars: 4, text: 'Affordable pricing with premium look.' },
  { id: 11, stars: 5, text: 'Always updated with latest styles.' },
  { id: 12, stars: 4, text: 'Good quality at wholesale rates.' },
  { id: 13, stars: 5, text: 'Fast delivery and easy communication.' },
  { id: 14, stars: 5, text: 'Perfect supplier for growing retailers.' },
  { id: 15, stars: 4, text: 'Customers keep coming back for these products.' },
  { id: 16, stars: 5, text: 'Strong margins and steady sales.' },
  { id: 17, stars: 5, text: 'Dependable service every time.' },
  { id: 18, stars: 5, text: 'Stylish collections that move fast.' },
  { id: 19, stars: 4, text: 'Great value for bulk purchases.' },
  { id: 20, stars: 5, text: 'Clean finishing and durable products.' },
  { id: 21, stars: 5, text: 'One-stop solution for all footwear needs.' },
  { id: 22, stars: 5, text: 'Professional dealing and quick response.' }
];

const StarIcon = ({ color, filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const scrollToCollection = () => {
  const element = document.getElementById('collection');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

function FeaturedCard({ col, index }) {
  const tiltRef = useTilt(10);

  return (
    <div
      ref={tiltRef}
      className="featured-card"
      style={{ '--card-bg': col.bgColor, '--card-theme': col.themeColor }}
      data-cursor="hover"
      onClick={scrollToCollection}
    >
      <div className="featured-card-inner">
        <span className="card-index">0{index + 1}</span>
        <div className="card-glow" />
        <div className="card-img-wrap">
          <img src={col.img} alt={col.subtitle} className="card-shoe-img" />
        </div>
        <div className="card-info">
          <div>
            <h3>{col.title}</h3>
            <p className="subtitle">{col.subtitle}</p>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} color={col.themeColor} filled={i < col.stars} />
              ))}
            </div>
          </div>
          <span className="card-cta" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ rev }) {
  return (
    <figure className="review-card">
      <svg className="quote-icon" width="34" height="26" viewBox="0 0 40 30" aria-hidden="true">
        <path d="M11.4 0C5.1 0 0 5.1 0 11.4V30H17.1V11.4H8.6C8.6 9.8 9.8 8.6 11.4 8.6V0ZM34.3 0C28.0 0 22.9 5.1 22.9 11.4V30H40V11.4H31.5C31.5 9.8 32.7 8.6 34.3 8.6V0Z" />
      </svg>
      <blockquote className="review-text">{rev.text}</blockquote>
      <div className="review-stars-small" aria-label={`${rev.stars} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} color={i < rev.stars ? '#ff9f1c' : '#d9d6cf'} filled={i < rev.stars} />
        ))}
      </div>
    </figure>
  );
}

function ReviewRow({ items, reverse }) {
  return (
    <div className={`reviews-marquee ${reverse ? 'reverse' : ''}`}>
      <div className="reviews-track">
        {[false, true].map((hidden) => (
          <div className="reviews-group" aria-hidden={hidden} key={String(hidden)}>
            {items.map((rev) => <ReviewCard key={rev.id} rev={rev} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

const FeaturedSections = () => {
  const half = Math.ceil(reviews.length / 2);

  return (
    <div className="featured-sections-wrapper">
      <section className="featured-cards-section">
        <div className="section-head">
          <ScrollReveal variant="blur">
            <span className="eyebrow">Signature drops</span>
            <h2 className="section-title">Made to be <span className="outline">noticed</span></h2>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={0.15}>
            <p className="section-lede">
              Three silhouettes that define the Footonia season. Hover to feel them move — tap to shop the full range.
            </p>
          </ScrollReveal>
        </div>

        <div className="featured-cards-container">
          {featuredCollections.map((col, idx) => (
            <ScrollReveal key={col.title} variant="flip" delay={idx * 0.15} threshold={0.15}>
              <FeaturedCard col={col} index={idx} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="customer-reviews-section">
        <ScrollReveal variant="blur">
          <div className="reviews-header">
            <span className="eyebrow">Testimonials</span>
            <h2 className="section-title light">Loved by retailers<br />across the region</h2>
          </div>
        </ScrollReveal>
        <ReviewRow items={reviews.slice(0, half)} />
        <ReviewRow items={reviews.slice(half)} reverse />
      </section>
    </div>
  );
};

export default FeaturedSections;
