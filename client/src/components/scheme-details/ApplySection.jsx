import { LuExternalLink } from "react-icons/lu";

export default function ApplySection() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-slate-heading mb-4">How to Apply</h2>
        <p className="text-text-body leading-relaxed">
          Applicants can register through the official government portal using their Aadhaar-linked mobile number and bank account details. Keep documents handy to complete the form quickly.
        </p>
        <ul className="space-y-3 list-disc pl-5 text-text-body">
          <li>Visit the official scheme portal and choose the relevant application category.</li>
          <li>Complete the registration form with personal and landholding details.</li>
          <li>Upload the required documents and verify your Aadhaar via OTP.</li>
          <li>Submit the application and note the reference number for follow-up.</li>
        </ul>
        <br></br>
        <button className="w-auto bg-btn-yellow hover:bg-brand-orange transition-colors text-slate-heading hover:text-white font-semibold rounded-xl px-4 py-3 flex items-center justify-center gap-2 shadow-btn">
          <LuExternalLink className="h-4 w-4" />
          Open Official Portal
        </button>
      </div>
    </div>
  );
}
