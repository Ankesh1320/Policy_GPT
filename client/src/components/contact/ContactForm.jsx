import React, { useState } from 'react';
import Button from '../ui/Button';

const isValidEmail = (email) => {
  if (!email || email.trim().length === 0) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ fullName: '', email: '', subject: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  const inputClasses = "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px] text-gray-800 transition-all focus:border-brand-orange focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-50";
  const errorInputClasses = "border-red-300 focus:border-red-500 focus:ring-red-50";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-lg border border-gray-100 md:w-2/3">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mb-3 text-2xl font-bold text-gray-800">Message Sent Successfully!</h3>
        <p className="mb-8 text-gray-500 leading-relaxed">
          Thank you for reaching out to us. You will receive a reply within{' '}
          <strong className="text-gray-700">2 working days</strong>. We appreciate your patience!
        </p>
        <Button variant="outline" onClick={handleReset}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100 md:w-2/3">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Send us a Message</h2>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={`${inputClasses} ${errors.fullName ? errorInputClasses : ''}`}
            />
            {errors.fullName && (
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                {errors.fullName}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`${inputClasses} ${errors.email ? errorInputClasses : ''}`}
            />
            {errors.email && (
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                {errors.email}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-sm font-semibold text-gray-700">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="General Enquiry"
            value={formData.subject}
            onChange={handleChange}
            className={`${inputClasses} ${errors.subject ? errorInputClasses : ''}`}
          />
          {errors.subject && (
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {errors.subject}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Describe your query..."
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`${inputClasses} resize-y ${errors.message ? errorInputClasses : ''}`}
          />
          {errors.message && (
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {errors.message}
            </span>
          )}
        </div>

        <div className="mt-2">
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full md:w-auto"
            disabled={isSubmitting}
            icon={!isSubmitting && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            )}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
