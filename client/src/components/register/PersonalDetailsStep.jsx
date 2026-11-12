import FormInput from "../auth/FormInput";

function PersonalDetailsStep({ formData, errors, onChange }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-['Poppins'] text-base font-semibold text-[#242322]">Personal Details</h2>

      <FormInput
        id="fullName"
        label="Full Name"
        value={formData.fullName}
        onChange={(e) => onChange("fullName", e.target.value)}
        placeholder="Enter your name"
        autoComplete="name"
        error={errors.fullName}
      />

      <FormInput
        id="mobile"
        label="Mobile Number"
        type="tel"
        value={formData.mobile}
        onChange={(e) => onChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
        placeholder="Enter your mobile no."
        autoComplete="tel"
        error={errors.mobile}
      />

      <FormInput
        id="email"
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => onChange("email", e.target.value)}
        placeholder="abc@gmail.com"
        autoComplete="email"
        error={errors.email}
      />
    </div>
  );
}

export default PersonalDetailsStep;
