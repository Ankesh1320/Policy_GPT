import { LuFileText } from "react-icons/lu";

const documents = [
  "Aadhaar card copy",
  "Land ownership or cultivation proof",
  "Bank account details for direct benefit transfer",
  "Mobile number linked to Aadhaar for OTP verification",
];

export default function DocumentsSection() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-slate-heading mb-4">Required Documents</h2>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc} className="flex items-center gap-3 rounded-3xl border border-border-light bg-page-warm p-4">
              <LuFileText className="h-5 w-5 text-brand-orange" />
              <span className="text-text-body">{doc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
