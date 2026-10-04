import React from 'react';
import '../../styles/SiteFooter.css';
import ScrollReveal from './ScrollReveal';

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <ScrollReveal variant="blur">
          <h3 className="footer-cta">
            Ready to step up?<br />
            <a href="/contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
          </h3>
        </ScrollReveal>

        <div className="footer-cols">
          <div>
            <h4>Explore</h4>
            <a href="/">Home</a>
            <a href="/#collection">Collection</a>
            <a href="/contact">Contact Us</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="/admin">Vendor Portal</a>
            <a href="/#collection">Privacy Policy</a>
            <a href="/#collection">Terms of Service</a>
          </div>
        </div>
      </div>

      <ScrollReveal variant="none" threshold={0.3}>
        <div className="footer-giant" aria-hidden="true">
          {'FOOTONIA'.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i }}>{ch}</span>
          ))}
        </div>
      </ScrollReveal>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Footonia. All rights reserved.</p>
        <button
          type="button"
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

export default SiteFooter;
