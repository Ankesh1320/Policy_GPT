import { useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";
import breadcrumbChevron from "../../assets/icons/policies/breadcrumb-chevron.svg";
import { sendFeedback } from "../../services/feedbackService";

const subjectOptions = [
  { value: "", label: "Select Subject" },
  { value: "app-experience", label: "App Experience" },
  { value: "feature-request", label: "Feature Request" },
  { value: "bug-report", label: "Bug Report" },
  { value: "general-feedback", label: "General Feedback" },
];

const FeedbackTab = ({ user }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!subject) {
      setStatus({ type: "error", message: "Please select a subject." });
      return;
    }

    if (!message.trim()) {
      setStatus({ type: "error", message: "Please enter your feedback." });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      await sendFeedback({
        fullName: user?.fullName || "Anonymous User",
        email: user?.email || "anonymous@policygpt.in",
        subject,
        message,
      });

      setStatus({ type: "success", message: "Feedback submitted successfully." });
      setSubmitted(true);
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Unable to submit feedback. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStatus(null);
    setSubject("");
    setMessage("");
  };

  return (
    <div className="space-y-6 w-full pb-6">

      <div className="rounded-2xl border border-border-light bg-white p-6 shadow-sm w-full">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEF1E3]">
            <MessageSquare className="h-6 w-6 text-[#FD7A08]" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-semibold text-slate-900">Feedback</h1>
            <p className="mt-1 text-sm text-slate-500">
              We value your feedback! Share your thoughts to help us improve.
            </p>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-border-light bg-white p-6 shadow-sm w-full min-h-[522px] flex flex-col items-center justify-center text-center animate-scale-up">
          <div className="flex flex-col items-center justify-center gap-6 max-w-md mx-auto my-auto">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981] shadow-inner animate-bounce-short">
              <CheckCircle2 className="h-10 w-10" strokeWidth={2} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-bold text-slate-900">Feedback submitted</h2>
              <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                Thank you! Your feedback has been received and will be reviewed shortly.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-2 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[#FD7A08] hover:text-[#FD7A08] hover:bg-orange-50/20 shadow-sm cursor-pointer"
            >
              <Send className="h-4 w-4" />
              Send another feedback
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border-light bg-white p-6 shadow-sm w-full min-h-[522px] flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-heading font-semibold text-slate-900 mb-6">Send Feedback</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">Subject</label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#FD7A08] focus:ring-2 focus:ring-[#FDE6CC]"
                  >
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value} disabled={!option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">Your Feedback</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  placeholder="Write your feedback here..."
                  className="min-h-[220px] w-full resize-none rounded-[20px] border border-gray-200 bg-white px-4 py-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-[#FD7A08] focus:ring-2 focus:ring-[#FDE6CC]"
                />
              </div>

              {status && (
                <p className={`text-sm ${status.type === "error" ? "text-red-600" : "text-emerald-600"}`}>
                  {status.message}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FD7A08] px-5 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 animate-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M22 12a10 10 0 0 1-10 10" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackTab;
