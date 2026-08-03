import { LuFileText } from "react-icons/lu";

export default function DocumentsSection({ scheme }) {
  if (!scheme) return null;
  const docList = scheme.documentsRequired || [];
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-slate-heading mb-4">Required Documents</h2>
        <div className="space-y-3">
          {docList.length > 0 ? (
            docList.map((doc) => (
              <div key={doc} className="flex items-center gap-3 rounded-3xl border border-border-light bg-page-warm p-4">
                <LuFileText className="h-5 w-5 text-brand-orange" />
                <span className="text-text-body">{doc}</span>
              </div>
            ))
          ) : (
            <p className="text-text-body">No specific documents required.</p>
          )}
        </div>
      </div>
    </div>
  );
}
