import React, { useRef } from 'react';
import '../../styles/FeaturedSections.css';

const FeaturedSections = () => {
  const reviewsRef = useRef(null);

  const scrollReviews = (direction) => {
    if (reviewsRef.current) {
      const scrollAmount = 430;
      reviewsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredCollections = [
    {
      title: "ELEVATE",
      subtitle: "Blow Sneaker",
      themeColor: "#b01a1a",
      bgColor: "#fff9c4",
      img: "/featured_dark.png",
      btnText: "MORE >",
      stars: 4
    },
    {
      title: "AUTHENTIC",
      subtitle: "White Sneaker",
      themeColor: "#5c85d6",
      bgColor: "#e3f2fd",
      img: "/featured_white.png",
      btnText: "MORE >",
      stars: 4
    },
    {
      title: "VELOCITY",
      subtitle: "Black Sneaker",
      themeColor: "#858c1a",
      bgColor: "#fce4ec",
      img: "/featured_black.png",
      btnText: "MORE >",
      stars: 4
    }
  ];

  const reviews = [
    { id: 1, stars: 5, text: "Great quality footwear with trendy designs. Customers love it." },
    { id: 2, stars: 5, text: "Reliable supplier with good pricing and on-time delivery." },
    { id: 3, stars: 4, text: "Wide variety—from budget to premium. Easy to sell." },
    { id: 4, stars: 5, text: "Imported collections are unique and in high demand." },
    { id: 5, stars: 5, text: "Good support and smooth bulk ordering experience." },
    { id: 6, stars: 5, text: "Consistent quality. Never had issues with stock." },
    { id: 7, stars: 4, text: "Perfect for retailers looking for fast-moving products." },
    { id: 8, stars: 5, text: "Excellent designs that sell quickly." },
    { id: 9, stars: 5, text: "Best place for trendy imported footwear." },
    { id: 10, stars: 4, text: "Affordable pricing with premium look." },
    { id: 11, stars: 5, text: "Always updated with latest styles." },
    { id: 12, stars: 4, text: "Good quality at wholesale rates." },
    { id: 13, stars: 5, text: "Fast delivery and easy communication." },
    { id: 14, stars: 5, text: "Perfect supplier for growing retailers." },
    { id: 15, stars: 4, text: "Customers keep coming back for these products." },
    { id: 16, stars: 5, text: "Strong margins and steady sales." },
    { id: 17, stars: 5, text: "Dependable service every time." },
    { id: 18, stars: 5, text: "Stylish collections that move fast." },
    { id: 19, stars: 4, text: "Great value for bulk purchases." },
    { id: 20, stars: 5, text: "Clean finishing and durable products." },
    { id: 21, stars: 5, text: "One-stop solution for all footwear needs." },
    { id: 22, stars: 5, text: "Professional dealing and quick response." }
  ];

  const StarIcon = ({ color, filled }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hollow-star">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  return (
    <div className="featured-sections-wrapper">
      <section className="featured-cards-section">
        <div className="featured-cards-container">
          {featuredCollections.map((col, idx) => (
            <div key={idx} className="featured-card" style={{ backgroundColor: col.bgColor }}>
              <div className="featured-card-content">
                <div className="card-top">
                  <img src={col.img} alt={col.subtitle} className="card-shoe-img" />
                </div>
                <div className="card-info">
                  <h3>{col.title}</h3>
                  <p className="subtitle" style={{ color: col.themeColor }}>{col.subtitle}</p>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} color={col.themeColor} filled={i < col.stars} />
                    ))}
                  </div>
                  <button
                    className="more-btn"
                    style={{ backgroundColor: col.themeColor }}
                    onClick={scrollToCollection}
                  >
                    {col.btnText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="customer-reviews-section">
        <div className="reviews-header">
          <p className="testimonial-label">Testimonial</p>
          <div className="header-flex">
            <h2>Transformative Client Experiences</h2>
          </div>
        </div>
        <div className="review-slider-outer">
          <button className="nav-arrow side-arrow left" onClick={() => scrollReviews('left')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div className="reviews-container" ref={reviewsRef}>
            {reviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="quote-icon">
                  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4 0C5.1 0 0 5.1 0 11.4V30H17.1V11.4H8.6C8.6 9.8 9.8 8.6 11.4 8.6V0ZM34.3 0C28.0 0 22.9 5.1 22.9 11.4V30H40V11.4H31.5C31.5 9.8 32.7 8.6 34.3 8.6V0Z" fill="#E0E0E0" />
                  </svg>
                </div>
                <p className="review-text">{rev.text}</p>
                <div className="review-stars-small">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} color={rev.stars > i ? "#ffb400" : "#eee"} filled={i < rev.stars} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="nav-arrow side-arrow right" onClick={() => scrollReviews('right')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default FeaturedSections;
