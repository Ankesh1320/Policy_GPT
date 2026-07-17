import React from 'react';
import Navbar from './components/Navbar';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';

const App = () => {
  return (
    <div className="app">
      <Navbar />

      {/* Hero Section - heading moved up with tighter padding */}
      <section className="hero-section" id="hero-section">
        <h1>Contact &amp; Support</h1>
        <p>We're here to help. Reach out anytime.</p>
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
