import { useState } from 'react';
import dropdownIcon from '../../assets/icons/dropdown.svg';

export default function FAQItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = `faq-${question.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '')}`;

  return (
    <div className="overflow-hidden rounded-[20px] bg-cream shadow-soft transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span className="font-body text-base font-semibold text-text-primary">{question}</span>
        <img
          src={dropdownIcon}
          alt=""
          className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={id}
        className={`border-t border-border-warm/50 px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'py-4 max-h-96' : 'py-0 max-h-0'
        }`}
        aria-hidden={!isOpen}
      >
        <p className="font-body text-base leading-relaxed text-text-secondary">{answer}</p>
      </div>
    </div>
  );
}
