import React from 'react';
import Navbar from './components/Navbar';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';

const App = () => {
  return (
    <div className="app">
      <Navbar />

      {/* Hero Section - heading aligned below PolicyGPT logo */}
      <section className="hero-section" id="hero-section">
        <div className="hero-section-inner">
          <h1>Contact &amp; Support</h1>
          <p>We're here to help. Reach out anytime.</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <main className="contact-section" id="contact-section">
        <ContactInfo />
        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="footer" id="footer">
        <p>© 2025 PolicyGPT. All rights reserved. | Empowering citizens with AI-driven policy insights.</p>
      </footer>
    </div>
  );
};

export default App;
