import { testimonials } from '../../data/landingData';
import TestimonialCard from '../ui/TestimonialCard';
import SectionHeader from '../ui/SectionHeader';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
        <SectionHeader
          eyebrow="REAL STORIES"
          eyebrowColor="text-brand-orange"
          title="Trusted by Citizens Across India"
          align="center"
          className="mb-10"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
