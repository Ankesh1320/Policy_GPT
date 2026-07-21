import FormSelect from "./FormSelect";
import { INDIAN_STATES, OCCUPATIONS, INCOME_RANGES } from "../../data/registerData";

function YourProfileStep({ formData, errors, onChange, role }) {
  const isAdmin = role === "admin";
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-['Poppins'] text-base font-semibold text-[#242322]">
        {isAdmin ? "Official Profile" : "Your Profile"}
      </h2>

      <FormSelect
        id="state"
        label="State/UT"
        value={formData.state}
        onChange={(e) => onChange("state", e.target.value)}
        placeholder="Select Your state"
        options={INDIAN_STATES}
        error={errors.state}
      />

      {!isAdmin && (
        <>
          <FormSelect
            id="occupation"
            label="Occupation"
            value={formData.occupation}
            onChange={(e) => onChange("occupation", e.target.value)}
            placeholder="Select Occupation"
            options={OCCUPATIONS}
            error={errors.occupation}
          />

          <FormSelect
            id="incomeRange"
            label="Annual Income Range"
            value={formData.incomeRange}
            onChange={(e) => onChange("incomeRange", e.target.value)}
            placeholder="Select Income Range"
            options={INCOME_RANGES}
            error={errors.incomeRange}
          />
        </>
      )}
    </div>
  );
}

export default YourProfileStep;
