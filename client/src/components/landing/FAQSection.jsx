import { faqItems } from '../../data/landingData';
import FAQItem from '../ui/FAQItem';
import SectionHeader from '../ui/SectionHeader';

export default function FAQSection() {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-20">
        <SectionHeader
          eyebrow="GOT QUESTIONS ?"
          eyebrowColor="text-brand-green"
          title="Frequently Asked Questions"
          align="center"
          className="mb-6 sm:mb-10"
        />

        <div className="mx-auto max-w-[625px] space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
