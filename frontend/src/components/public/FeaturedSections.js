import React from 'react';
import '../../styles/FeaturedSections.css';

const FeaturedSections = () => {
  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredCollections = [
    {
      title: "ELEVATE",
      subtitle: "Apex White",
      subtitleColor: "#b01a1a", // Red
      bgColor: "#fff9c4", // Light Yellow
      img: "/featured_dark.png",
      btnText: "MORE >",
      stars: 4
    },
    {
      title: "AUTHENTIC",
      subtitle: "Heritage Green",
      subtitleColor: "#5c85d6", // Blue
      bgColor: "#e3f2fd", // Light Blue
      img: "/featured_white.png",
      btnText: "MORE >",
      stars: 4
    },
    {
      title: "VELOCITY",
      subtitle: "Onyx Red",
      subtitleColor: "#858c1a", // Olive
      bgColor: "#fce4ec", // Light Pink
      img: "/featured_black.png",
      btnText: "MORE >",
      stars: 5
    }
  ];

  const reviews = [
    {
      id: 1,
      stars: 4,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      author: "MIKE SMITH"
    },
    {
      id: 2,
      stars: 4,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      author: "MIKE SMITH"
    },
    {
      id: 3,
      stars: 4,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      author: "MIKE SMITH"
    }
  ];

  return (
    <div className="featured-sections-wrapper">
      {/* Featured Collections Section */}
      <section className="featured-cards-section">
        <div className="featured-cards-container">
          {featuredCollections.map((col, idx) => (
            <div key={idx} className="featured-card">
              <div className="card-bg" style={{ backgroundColor: col.bgColor }}>
                <img src={col.img} alt={col.subtitle} className="card-shoe-img" />
              </div>
              <div className="card-info">
                <h3>{col.title}</h3>
                <p className="subtitle" style={{ color: col.subtitleColor }}>{col.subtitle}</p>
                <div className="stars">
                  {[...Array(col.stars)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                  {[...Array(5 - col.stars)].map((_, i) => (
                    <span key={i} className="star empty">★</span>
                  ))}
                </div>
                <button className="more-btn" onClick={scrollToCollection}>{col.btnText}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="customer-reviews-section">
        <div className="reviews-header">
          <h2>CUSTOMER REVIEWS</h2>
          <button className="write-review-btn">WRITE A REVIEW</button>
        </div>
        <div className="reviews-container">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-stars">
                {[...Array(rev.stars)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="review-text">{rev.text}</p>
              <p className="review-author">{rev.author}</p>
            </div>
          ))}
        </div>
        <div className="reviews-pagination">
          <div className="pagination-bar">
            <div className="pagination-active"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedSections;
