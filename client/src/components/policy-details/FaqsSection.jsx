import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function FaqsSection({ policy }) {
  const [openIndex, setOpenIndex] = useState(null);

  const fallbackFaqs = [
    { q: "What is NEP 2020?", a: "The National Education Policy 2020 is a comprehensive framework designed to modernise the education system in India, aiming to transform learning from pre-primary through higher education." },
    { q: "Who does this policy apply to?", a: "It applies to all educational institutions, including schools, colleges, and universities across India, affecting students, teachers, and administrators." },
    { q: "Is this mandatory for all schools?", a: "While it provides a national framework, education is a concurrent subject in India. State boards and educational bodies are progressively adopting and adapting these guidelines." },
    { q: "When was NEP 2020 approved?", a: "It was approved by the Union Cabinet of India on 29 July 2020, replacing the previous National Policy on Education of 1986." },
    { q: "What are the major structural reforms?", a: "The traditional 10+2 structure is replaced with a 5+3+3+4 structure (Foundational, Preparatory, Middle, and Secondary stages) covering ages 3 to 18." },
    { q: "How does NEP 2020 affect higher education?", a: "It introduces a multidisciplinary approach, flexible 4-year undergraduate programs with multiple entry/exit options, and establishes the Academic Bank of Credits." }
  ];

  const list = policy?.faqs && policy.faqs.length > 0 ? policy.faqs : fallbackFaqs;

  return (
    <div className="flex flex-col gap-4">
      {list.map((faq, idx) => {
        const isOpen = openIndex === idx;
        
        return (
          <div 
            key={idx} 
            onClick={() => setOpenIndex(isOpen ? null : idx)}
            className={`bg-white rounded-xl border p-5 transition-colors cursor-pointer group ${
              isOpen ? "border-brand-orange shadow-sm" : "border-border-light hover:border-gray-300"
            }`}
          >
            <div className="flex justify-between items-center gap-4">
              <h3 className={`font-bold transition-colors ${
                isOpen ? "text-brand-orange" : "text-slate-heading group-hover:text-brand-orange"
              }`}>
                {faq.q}
              </h3>
              <LuChevronDown 
                className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-brand-orange" : "text-text-body"
                }`} 
              />
            </div>
            
            {isOpen && (
              <div className="mt-4 pt-4 border-t border-border-light">
                <p className="text-text-body leading-relaxed">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
