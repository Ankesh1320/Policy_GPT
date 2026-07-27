import { Link } from 'react-router-dom';
import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-white pt-8 pb-4 lg:pt-12 lg:pb-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-3">
              <Link to="/" className="hover:text-brand-orange transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="text-gray-900">Contact Us</span>
            </div>
            <h1 className="mb-3 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Contact &amp; Support
            </h1>
            <p className="max-w-2xl text-lg text-gray-600 mb-4">
              We're here to help. Reach out anytime.
            </p>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="bg-[#f9f3da] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-start lg:gap-12">
              <ContactInfo />
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
