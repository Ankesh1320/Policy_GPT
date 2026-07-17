import React from 'react';

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="19" fill="#F97316" />
    <path
      d="M20 7C20 7 10 11.5 10 19.5C10 27.5 15.5 32.5 20 34.5C24.5 32.5 30 27.5 30 19.5C30 11.5 20 7 20 7Z"
      fill="white"
    />
    <polyline
      points="14.5,20 18,23.5 25.5,15.5"
      fill="none"
      stroke="#F97316"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar = () => {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-logo">
        <Logo />
        <span className="navbar-logo-text">
          Policy<span>GPT</span>
        </span>
      </div>

      <ul className="navbar-links">
        <li><a href="#explore">Explore Schemes</a></li>
        <li><a href="#policies">Policies</a></li>
        <li><a href="#eligibility">Eligibility Checker</a></li>
        <li><a href="#compare">Compare</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact" className="active">Contact</a></li>
      </ul>

      <div className="navbar-actions">
        <button className="btn-login" id="btn-login">Login</button>
        <button className="btn-register" id="btn-register">Register Free</button>
      </div>
    </nav>
  );
};

export default Navbar;
