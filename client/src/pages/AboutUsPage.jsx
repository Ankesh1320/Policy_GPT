import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import AboutHero from '../components/about/AboutHero';
import WhyPolicyGPT from '../components/about/WhyPolicyGPT';
import AboutStats from '../components/about/AboutStats';
import UserTypesSection from '../components/about/users/UserTypesSection';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Navigation */}
      <Navbar activeLabel="About" />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Banner with image background and warm gradient */}
        <AboutHero />

        {/* Warm Cream Colored Section */}
        <div className="bg-cream">
          {/* Why PolicyGPT section */}
          <WhyPolicyGPT />

          {/* Bottom stats component */}
          <AboutStats />
        </div>

        {/* Target Audience Section */}
        <div className="bg-white">
          <UserTypesSection />
        </div>

      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
