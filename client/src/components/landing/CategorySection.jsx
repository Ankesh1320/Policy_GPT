import { categories } from '../../data/landingData';
import CategoryCard from '../ui/CategoryCard';
import SectionHeader from '../ui/SectionHeader';

export default function CategorySection() {
  return (
    <section id="categories" className="bg-white py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-20">
        <SectionHeader
          eyebrow="BROWSE BY CATEGORY"
          title="Popular Categories"
          action={
            <a
              href="#"
              className="hidden font-heading text-base font-medium text-brand-blue transition-colors hover:text-brand-blue-dark sm:inline-flex"
            >
              View All &gt;
            </a>
          }
          className="mb-6 sm:mb-10"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[27px]">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <a
            href="#"
            className="font-heading text-base font-medium text-brand-blue transition-colors hover:text-brand-blue-dark"
          >
            View All &gt;
          </a>
        </div>
      </div>
    </section>
  );
}
