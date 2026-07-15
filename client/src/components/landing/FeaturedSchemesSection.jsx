import { featuredSchemes } from '../../data/landingData';
import SchemeCard from '../ui/SchemeCard';
import SectionHeader from '../ui/SectionHeader';

export default function FeaturedSchemesSection() {
  return (
    <section className="bg-cream py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-20">
        <SectionHeader
          eyebrow="HANDPICKED FOR YOU"
          title="Featured Schemes"
          className="mb-6 sm:mb-10"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredSchemes.map((scheme) => (
            <SchemeCard key={scheme.title} scheme={scheme} />
          ))}
        </div>
      </div>
    </section>
  );
}
