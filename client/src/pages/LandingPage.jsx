import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import HeroSection from '../components/landing/HeroSection';
import CategorySection from '../components/landing/CategorySection';
import FeaturedSchemesSection from '../components/landing/FeaturedSchemesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import FindSchemesSection from '../components/landing/FindSchemesSection';
import LatestUpdatesSection from '../components/landing/LatestUpdatesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FAQSection from '../components/landing/FAQSection';
import NewsletterSection from '../components/landing/NewsletterSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedSchemesSection />
        <HowItWorksSection />
        <FindSchemesSection />
        <LatestUpdatesSection />
        <TestimonialsSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
