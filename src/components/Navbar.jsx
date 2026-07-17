import React, { useState } from 'react';

function MenuIcon({ open }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

const navLinks = [
  { label: 'Explore Schemes', href: '#categories' },
  { label: 'Policies', href: '#updates' },
  { label: 'Eligibility Checker', href: '#find-schemes' },
  { label: 'Compare', href: '#how-it-works' },
  { label: 'About', href: '#testimonials' },
  { label: 'Contact', href: '#contact', active: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar-header" id="navbar-header">
      <nav className="navbar" id="navbar" aria-label="Main navigation">
        <a href="/" className="navbar-logo">
          <img src="/logo-full.svg" alt="PolicyGPT" className="navbar-logo-img" />
        </a>

        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`navbar-link${link.active ? ' navbar-link--active' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <a href="#login" className="btn-login">Login</a>
          <a href="#register" className="btn-register" id="btn-register">
            Register Free
            <img src="/arrow-right.svg" alt="" className="btn-register-icon" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="navbar-mobile-menu">
          <ul className="navbar-mobile-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`navbar-mobile-link${link.active ? ' navbar-link--active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="navbar-mobile-actions">
              <a href="#login" className="btn-login">Login</a>
              <a href="#register" className="btn-register">
                Register Free
                <img src="/arrow-right.svg" alt="" className="btn-register-icon" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
