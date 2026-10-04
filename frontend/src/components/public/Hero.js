import React, { useEffect, useRef } from 'react';
import '../../styles/Hero.css';
import { useMagnetic } from '../../hooks/useMotion';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function Hero() {
  const heroRef = useRef(null);
  const magnetRef = useMagnetic(0.3);

  // Drive --mx / --my (pointer, -1..1, eased) and --sp (scroll, 0..1) on the hero.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let tx = 0, ty = 0, cx = 0, cy = 0, frame = null;

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty('--mx', cx.toFixed(4));
      el.style.setProperty('--my', cy.toFixed(4));
      const sp = Math.min(1, window.scrollY / Math.max(1, el.offsetHeight));
      el.style.setProperty('--sp', sp.toFixed(4));
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-blob blob-a" />
        <div className="hero-blob blob-b" />
        <div className="hero-blob blob-c" />
        <div className="hero-grid-lines" />
      </div>

      <div className="hero-giant-word" aria-hidden="true">FOOTONIA</div>

      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow hero-fade" style={{ '--d': '0.5s' }}>New Season Collection</span>

          <h1 className="hero-title">
            <span className="line"><span>Step into</span></span>
            <span className="line"><span>the <em>future</em></span></span>
            <span className="line"><span>of style.</span></span>
          </h1>

          <p className="hero-sub hero-fade" style={{ '--d': '1.1s' }}>
            Premium sneakers, formals and everyday footwear — curated by Footonia
            for retailers and shoe lovers who refuse to blend in.
          </p>

          <div className="hero-ctas hero-fade" style={{ '--d': '1.3s' }}>
            <span ref={magnetRef} className="magnet">
              <button type="button" className="btn-pill btn-dark" onClick={scrollToCollection}>
                Shop Collection
                <span className="btn-arrow"><ArrowIcon /></span>
              </button>
            </span>
            <a href="/contact" className="btn-pill btn-ghost">Get in touch</a>
          </div>

          <ul className="hero-features hero-fade" style={{ '--d': '1.5s' }}>
            <li><strong>Premium</strong><span>Quality craft</span></li>
            <li><strong>Trending</strong><span>Latest styles</span></li>
            <li><strong>Wholesale</strong><span>Retail ready</span></li>
          </ul>
        </div>

        <div className="hero-stage">
          <div className="orbit orbit-1" aria-hidden="true" />
          <div className="orbit orbit-2" aria-hidden="true" />
          <div className="orbit orbit-3" aria-hidden="true"><i /></div>
          <div className="stage-disc" aria-hidden="true" />

          <div className="shoe-float">
            <div className="shoe-bob">
              <img
                src="/shoe.png"
                alt="Featured Footonia sneaker"
                className="hero-shoe"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop';
                }}
              />
            </div>
          </div>
          <div className="shoe-shadow" aria-hidden="true" />

          <div className="float-chip chip-1">
            <span className="chip-dot" /> Air cushioned
          </div>
          <div className="float-chip chip-2">
            ✦ Limited drop
          </div>

          <button type="button" className="spin-badge" onClick={scrollToCollection} aria-label="Explore the collection">
            <svg viewBox="0 0 200 200" className="spin-text">
              <defs>
                <path id="badgeCircle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#badgeCircle" textLength="486" lengthAdjust="spacing">FOOTONIA • PREMIUM FOOTWEAR • EXPLORE • </textPath>
              </text>
            </svg>
            <span className="spin-core"><ArrowIcon /></span>
          </button>
        </div>
      </div>

      <button type="button" className="scroll-cue" onClick={scrollToCollection}>
        <span className="mouse"><i /></span>
        Scroll
      </button>
    </section>
  );
}

export default Hero;
