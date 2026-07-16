function RoleToggle({ role, onChange }) {
  const isCitizen = role === "citizen";

  return (
    <div className="flex items-center justify-center gap-6">
      <button
        type="button"
        onClick={() => onChange("citizen")}
        className={`text-sm transition-colors duration-200 cursor-pointer ${
          isCitizen ? "font-bold text-[#fd7a08]" : "font-medium text-[#938e8c]"
        }`}
      >
        Citizen
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={!isCitizen}
        aria-label="Toggle between Citizen and Admin"
        onClick={() => onChange(isCitizen ? "admin" : "citizen")}
        className="relative h-[23px] w-[47px] rounded-full bg-[#fd7a08] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#fd7a08]/40"
      >
        <span
          className={`absolute top-[2px] left-[2px] h-[19px] w-[19px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
            isCitizen ? "translate-x-0" : "translate-x-[24px]"
          }`}
        />
      </button>

      <button
        type="button"
        onClick={() => onChange("admin")}
        className={`text-sm transition-colors duration-200 cursor-pointer ${
          !isCitizen ? "font-bold text-[#fd7a08]" : "font-medium text-[#938e8c]"
        }`}
      >
        Admin
      </button>
    </div>
  );
}

export default RoleToggle;
