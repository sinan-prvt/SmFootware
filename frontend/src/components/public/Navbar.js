import React, { useEffect, useRef, useState } from 'react';
import '../../styles/Navbar.css';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Collection', href: '/#collection' },
  { label: 'Contact', href: '/contact' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      setIsHidden(y > 320 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLink = (e, href) => {
    setIsMenuOpen(false);
    if (href === '/#collection' && window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navClass = [
    'site-nav',
    isScrolled ? 'is-scrolled' : '',
    isHidden && !isMenuOpen ? 'is-hidden' : '',
    isMenuOpen ? 'menu-open' : '',
  ].join(' ');

  return (
    <>
      <header className={navClass}>
        <a href="/" className="brand" aria-label="Footonia home">
          <img src="/favicon.svg" alt="" className="brand-mark" />
          <span className="brand-word">FOOTONIA</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={(e) => handleLink(e, link.href)}>
              <span className="roll"><span data-text={link.label}>{link.label}</span></span>
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <a href="/admin" className="nav-login">Vendor Login</a>
          <button
            type="button"
            className="menu-toggle"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="menu-overlay-inner">
          <ul className="menu-list">
            {[...LINKS, { label: 'Vendor Login', href: '/admin' }].map((link, i) => (
              <li key={link.label} style={{ '--i': i }}>
                <a href={link.href} onClick={(e) => handleLink(e, link.href)} tabIndex={isMenuOpen ? 0 : -1}>
                  <span className="menu-index">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-footer">
            <span>FOOTONIA</span>
            <span>Premium footwear for every step</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
