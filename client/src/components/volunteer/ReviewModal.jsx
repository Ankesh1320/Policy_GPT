import React, { useState } from 'react';
import { X, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';

export default function ReviewModal({ item, type, onClose, onSubmit }) {
  const [comment, setComment] = useState('');
  const [selected, setSelected] = useState(null); // 'approve' | 'request_changes'
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!selected) {
      setError('Please select an action before submitting.');
      return;
    }
    if (selected === 'request_changes' && !comment.trim()) {
      setError('Please provide a comment explaining the required changes.');
      return;
    }
    onSubmit(selected, comment.trim());
  };

  const typeLabel = type === 'policy' ? 'Policy' : 'Scheme';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto bg-white rounded-2xl shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-heading text-[17px] font-bold text-gray-900">Review {typeLabel}</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">Submit your review decision</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Item info */}
        <div className="px-6 py-4 bg-card-orange border-b border-orange-100">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{typeLabel}</p>
          <p className="font-semibold text-[15px] text-gray-800">{item?.name}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-[12px] text-gray-500">{item?.department}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-[12px] text-gray-400">{item?.submittedAgo}</span>
          </div>
          <p className="text-[12px] text-gray-500 mt-2">
            {typeLabel === 'Scheme' ? 'Launch date' : 'Effective date'}:{' '}
            <span className="font-semibold text-gray-700">{item?.date || 'N/A'}</span>
          </p>
        </div>

        {/* Item description */}
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Description</p>
          <p className="text-[13px] text-gray-600 leading-relaxed">
            {item?.description || 'No description provided.'}
          </p>
        </div>

        {item?.benefits?.length > 0 && (
          <div className="px-6 py-4 border-b border-gray-100">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Key Benefits</p>
            <ul className="list-disc pl-5 space-y-1 text-[13px] text-gray-600">
              {item.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

        {item?.documentsRequired?.length > 0 && (
          <div className="px-6 py-4 border-b border-gray-100">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Required Documents</p>
            <div className="flex flex-wrap gap-2">
              {item.documentsRequired.map((document, index) => (
                <span key={index} className="text-[12px] bg-orange-50 text-[#F2762E] font-semibold border border-orange-100 px-3 py-1 rounded-full">
                  {document}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Action buttons */}
          <div>
            <p className="text-[13px] font-semibold text-gray-700 mb-3">Select your decision</p>
            <div className="grid grid-cols-2 gap-3">
              {/* Approve */}
              <button
                type="button"
                onClick={() => { setSelected('approve'); setError(''); }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selected === 'approve'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                <CheckCircle
                  size={26}
                  className={selected === 'approve' ? 'text-emerald-500' : 'text-gray-300'}
                  strokeWidth={2}
                />
                <span className={`text-[13px] font-semibold ${selected === 'approve' ? 'text-emerald-700' : 'text-gray-500'}`}>
                  Approve
                </span>
                <span className="text-[11px] text-gray-400 text-center leading-tight">
                  Mark as approved — enables admin to publish
                </span>
              </button>

              {/* Request Changes */}
              <button
                type="button"
                onClick={() => { setSelected('request_changes'); setError(''); }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selected === 'request_changes'
                    ? 'border-[#F2762E] bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                }`}
              >
                <MessageSquare
                  size={26}
                  className={selected === 'request_changes' ? 'text-[#F2762E]' : 'text-gray-300'}
                  strokeWidth={2}
                />
                <span className={`text-[13px] font-semibold ${selected === 'request_changes' ? 'text-[#F2762E]' : 'text-gray-500'}`}>
                  Request Changes
                </span>
                <span className="text-[11px] text-gray-400 text-center leading-tight">
                  Requires updates before publishing
                </span>
              </button>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="text-[13px] font-semibold text-gray-700 block mb-2">
              Comment {selected === 'request_changes' && <span className="text-rose-500">*</span>}
              {selected === 'approve' && <span className="text-gray-400 font-normal"> (optional)</span>}
            </label>
            <textarea
              value={comment}
              onChange={(e) => { setComment(e.target.value); setError(''); }}
              rows={3}
              placeholder={
                selected === 'request_changes'
                  ? 'Describe the changes required...'
                  : 'Add any notes or feedback...'
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F2762E]/30 focus:border-[#F2762E] resize-none transition"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-rose-500 text-[12px] font-medium">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-[13px] font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-xl text-[13px] font-semibold text-white bg-[#F2762E] hover:bg-orange-600 transition-colors cursor-pointer shadow-sm"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
