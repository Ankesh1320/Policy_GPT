import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const faqs = [
  {
    q: "What is the PM Kisan Samman Nidhi Scheme?",
    a: "PM-KISAN is a Central Government scheme that provides eligible farmer families with an annual financial assistance of ₹6,000 in three equal installments of ₹2,000 each directly into their bank accounts."
  },
  {
    q: "Who is eligible for the PM-KISAN scheme?",
    a: "All landholding farmer families who own cultivable land are eligible, subject to the scheme's exclusion criteria. Beneficiaries must have valid Aadhaar and bank account details linked for Direct Benefit Transfer (DBT)."
  },
  {
    q: "Who is not eligible for PM-KISAN benefits?",
    a: "Institutional landholders, present or former constitutional post holders, government employees (except certain Group D/Multi-Tasking Staff), income tax payers, and certain professionals such as doctors, engineers, and lawyers are not eligible."
  },
  {
    q: "How is the financial assistance provided?",
    a: "Eligible beneficiaries receive ₹6,000 per year in three equal installments of ₹2,000, which are transferred directly to their bank accounts through the Direct Benefit Transfer (DBT) system."
  },
  {
    q: "What documents are required to apply?",
    a: "Applicants generally need their Aadhaar card, proof of land ownership, bank account details, and a registered mobile number. State governments may request additional documents for verification."
  },
  {
    q: "How can I check my PM-KISAN beneficiary status?",
    a: "You can check your beneficiary status by visiting the official PM-KISAN portal and using your Aadhaar number, registered mobile number, or registration number under the 'Beneficiary Status' section."
  }
];

export default function FaqsSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, idx) => {
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
                <p className="text-text-body leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
