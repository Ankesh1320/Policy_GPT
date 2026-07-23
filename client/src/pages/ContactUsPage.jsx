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
        <section className="bg-brand-blue-dark py-16 text-center lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Contact &amp; Support
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-blue-100 md:text-xl">
              We're here to help. Reach out anytime.
            </p>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="bg-gray-50 py-16 lg:py-24">
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
