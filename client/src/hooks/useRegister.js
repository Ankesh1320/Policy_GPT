import { useState } from "react";
import { registerUser } from "../services/authService";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isMobile = (value) => /^[6-9]\d{9}$/.test(value);

const initialFormData = {
  fullName: "",
  mobile: "",
  email: "",
  state: "",
  occupation: "",
  incomeRange: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: false,
};

const validateStep1 = ({ fullName, mobile, email }) => {
  const errors = {};

  if (!fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (fullName.trim().length < 2) {
    errors.fullName = "Enter a valid full name";
  }

  if (!mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!isMobile(mobile.trim())) {
    errors.mobile = "Enter a valid 10-digit mobile number";
  }

  if (!email.trim()) {
    errors.email = "Email address is required";
  } else if (!isEmail(email.trim())) {
    errors.email = "Enter a valid email address";
  }

  return errors;
};

const validateStep2 = ({ state, occupation, incomeRange }, role) => {
  const errors = {};

  if (!state) errors.state = "Please select your state";
  
  if (role !== "admin") {
    if (!occupation) errors.occupation = "Please select your occupation";
    if (!incomeRange) errors.incomeRange = "Please select your income range";
  }

  return errors;
};

const validateStep3 = ({ password, confirmPassword, agreedToTerms }) => {
  const errors = {};

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!agreedToTerms) {
    errors.agreedToTerms = "You must agree to the terms to continue";
  }

  return errors;
};

export const useRegister = (role = "citizen") => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const goToNextStep = () => {
    let stepErrors = {};

    if (step === 1) stepErrors = validateStep1(formData);
    else if (step === 2) stepErrors = validateStep2(formData, role);

    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return false;

    setStep((prev) => Math.min(prev + 1, 3));
    return true;
  };

  const goToPreviousStep = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stepErrors = validateStep3(formData);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    setIsLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        state: formData.state,
        password: formData.password,
      };

      if (role !== "admin") {
        payload.occupation = formData.occupation;
        payload.incomeRange = formData.incomeRange;
      }

      await registerUser(payload, role);
      setIsComplete(true);
    } catch (err) {
      setErrors({ apiError: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    formData,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    isComplete,
    updateField,
    goToNextStep,
    goToPreviousStep,
    handleSubmit,
  };
};
