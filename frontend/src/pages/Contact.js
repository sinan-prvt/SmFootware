import React, { useEffect } from 'react';
import '../styles/Contact.css';
import ScrollReveal from '../components/public/ScrollReveal';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsApp = (number) => {
    const message = "Hi SM Footware, I'd like to get in touch!";
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const contactNumbers = [
    { label: "WhatsApp & primary", number: "919495381001" },
    { label: "Office & Direct", number: "918078083500" },
    { label: "Direct", number: "919744481001" }
  ];

  return (
    <div className="contact-page">
      <header className="contact-hero-premium">
        <ScrollReveal delay={0.2}>
          <span className="superior-tag">PREMIUM FOOTWEAR OUTLET</span>
          <h1>S M FOOTWEAR</h1>
          <p>Moonniyur, Kerala</p>
        </ScrollReveal>
      </header>

      <div className="contact-main-grid">
        {/* Left Side: Contact Numbers */}
        <ScrollReveal delay={0.4} threshold={0.1}>
          <section className="contact-section-card">
            <h2 className="section-title">GET IN TOUCH</h2>
            <div className="numbers-stack">
              {contactNumbers.map((item, idx) => (
                <div key={idx} className="number-item" onClick={() => handleWhatsApp(item.number)}>
                  <div className="number-icon">💬</div>
                  <div className="number-content">
                    <span className="number-label">{item.label}</span>
                    <span className="number-value">+{item.number}</span>
                  </div>
                  <button className="chat-btn-small">CHAT</button>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Right Side: Store Info */}
        <ScrollReveal delay={0.6} threshold={0.1}>
          <section className="contact-section-card dark-theme">
            <h2 className="section-title white">OFFICE & STORE</h2>
            <div className="store-info-premium">
              <div className="info-row">
                <span className="info-label">EMAIL</span>
                <span className="info-value">sales@smfootware.com</span>
              </div>
              <div className="info-row">
                <span className="info-label">ADDRESS</span>
                <span className="info-value">Chemmad-Thalappara Rd, Alinchuvadu,<br />Moonniyur, Kerala 676311</span>
              </div>
              <div className="info-row">
                <span className="info-label">HOURS</span>
                <span className="info-value">OPENED: Mon - Sun (10AM - 9PM)</span>
              </div>
              <div className="whatsapp-channel-section" style={{ marginTop: '20px' }}>
                <a 
                  href="https://whatsapp.com/channel/0029Vavk0rx4IBhMJV2wBd17" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="channel-btn-premium"
                >
                  FOLLOW OUR WHATSAPP CHANNEL
                </a>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=11.059583,75.90586"
              target="_blank"
              rel="noopener noreferrer"
              className="directions-btn"
            >
              NAVIGATE IN GOOGLE MAPS
            </a>
          </section>
        </ScrollReveal>
      </div>

      <div className="contact-map-full">
        <ScrollReveal threshold={0.1}>
          <div className="map-frame-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3915.759419133877!2d75.90328507587627!3d11.059582989106883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDAzJzM0LjUiTiA3NcKwNTQnMjEuMSJF!5e0!3m2!1sen!2sin!4v1711987500000!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="S M Footwear Location"
            ></iframe>
          </div>
        </ScrollReveal>
      </div>

      <footer className="footer-copyright-simple">
        <p>&copy; {new Date().getFullYear()} S M FOOTWEAR. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
