import React, { useEffect } from 'react';
import '../styles/Contact.css';
import ScrollReveal from '../components/public/ScrollReveal';
import Navbar from '../components/public/Navbar';
import MotionLayer from '../components/public/MotionLayer';
import Marquee from '../components/public/Marquee';
import SiteFooter from '../components/public/SiteFooter';
import { useTilt } from '../hooks/useMotion';

const contactNumbers = [
  { label: "WhatsApp & primary", number: "919495381001" },
  { label: "Office & Direct", number: "918078083500" },
  { label: "Direct", number: "919744481001" }
];

const handleWhatsApp = (number) => {
  const message = "Hi Footonia, I'd like to get in touch!";
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
};

function NumberCard({ item, index }) {
  const tiltRef = useTilt(6);

  return (
    <button
      type="button"
      ref={tiltRef}
      className="number-item"
      onClick={() => handleWhatsApp(item.number)}
    >
      <span className="number-index">0{index + 1}</span>
      <span className="number-content">
        <span className="number-label">{item.label}</span>
        <span className="number-value">+{item.number}</span>
      </span>
      <span className="chat-btn-small">
        Chat
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </span>
    </button>
  );
}

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <MotionLayer />
      <Navbar />

      <header className="contact-hero-premium">
        <div className="contact-hero-orb" aria-hidden="true" />
        <ScrollReveal variant="blur" delay={0.2}>
          <span className="eyebrow">Premium footwear outlet</span>
        </ScrollReveal>
        <h1 className="contact-title">
          <ScrollReveal variant="clip" delay={0.3}><span>Let&apos;s</span></ScrollReveal>
          <ScrollReveal variant="clip" delay={0.42}><span className="accent">talk shoes.</span></ScrollReveal>
        </h1>
        <ScrollReveal variant="up" delay={0.6}>
          <p>Footonia · Moonniyur, Kerala</p>
        </ScrollReveal>
      </header>

      <Marquee items={['Get in touch', 'Wholesale enquiries', 'Retail partners', 'Visit our store']} />

      <div className="contact-main-grid">
        <ScrollReveal variant="left" delay={0.1} threshold={0.1}>
          <section className="contact-section-card">
            <h2 className="contact-card-title">Get in touch</h2>
            <div className="numbers-stack">
              {contactNumbers.map((item, idx) => (
                <NumberCard key={item.number} item={item} index={idx} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal variant="right" delay={0.2} threshold={0.1}>
          <section className="contact-section-card dark-theme">
            <h2 className="contact-card-title">Office &amp; store</h2>
            <div className="store-info-premium">
              <div className="info-row">
                <span className="info-label">Email</span>
                <a className="info-value" href="mailto:sales@smfootwear.com">sales@smfootwear.com</a>
              </div>
              <div className="info-row">
                <span className="info-label">Address</span>
                <span className="info-value">Chemmad-Thalappara Rd, Alinchuvadu,<br />Moonniyur, Kerala 676311</span>
              </div>
              <div className="info-row">
                <span className="info-label">Hours</span>
                <span className="info-value">Open Mon – Sun · 10AM – 9PM</span>
              </div>
            </div>
            <div className="contact-actions">
              <a
                href="https://whatsapp.com/channel/0029Vavk0rx4IBhMJV2wBd17"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-btn-premium"
              >
                Follow our WhatsApp channel
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=11.059583,75.90586"
                target="_blank"
                rel="noopener noreferrer"
                className="directions-btn"
              >
                Navigate in Google Maps ↗
              </a>
            </div>
          </section>
        </ScrollReveal>
      </div>

      <div className="contact-map-full">
        <ScrollReveal variant="scale" threshold={0.1}>
          <div className="map-frame-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3915.759419133877!2d75.90328507587627!3d11.059582989106883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDAzJzM0LjUiTiA3NcKwNTQnMjEuMSJF!5e0!3m2!1sen!2sin!4v1711987500000!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Footonia store location"
            ></iframe>
          </div>
        </ScrollReveal>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Contact;
