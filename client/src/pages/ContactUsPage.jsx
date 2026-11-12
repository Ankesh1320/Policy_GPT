import { Link } from 'react-router-dom';
import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import breadcrumbChevron from "../assets/icons/policies/breadcrumb-chevron.svg";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="border-b border-border-header bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-20 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-3" aria-label="Breadcrumb">
          <Link
            to="/"
            className="font-body text-sm leading-5 text-text-body transition-colors hover:text-brand-orange"
          >
            Home
          </Link>
          <img src={breadcrumbChevron} alt="" className="h-3 w-2" aria-hidden="true" />
          <span className="font-body text-sm font-semibold leading-5 text-slate-heading">
            Contact
          </span>
        </nav>

        {/* Title & Subtitle */}
        <h1 className="font-heading text-[30px] font-bold leading-9 tracking-[-0.0367em] text-[#0F172A]">
          Contact &amp; Support
        </h1>
        <p className="mt-2 max-w-xl font-body text-base font-medium leading-6 text-text-body">
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
