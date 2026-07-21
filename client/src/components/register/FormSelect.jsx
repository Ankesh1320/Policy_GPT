import { FiChevronDown } from "react-icons/fi";

function FormSelect({ id, label, value, onChange, placeholder, options, error }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#242322]">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`h-[42px] w-full appearance-none rounded-[20px] border-2 bg-[#fff8de] px-4 pr-10 text-[15px] font-medium outline-none transition-all duration-200 focus:border-[#ffcd73] focus:ring-2 focus:ring-[#ffcd73]/30 cursor-pointer ${
            value ? "text-[#242322]" : "text-[#938e8c]/76"
          } ${error ? "border-red-400" : "border-[#ffcd73]"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FiChevronDown
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#938e8c]"
          size={18}
          aria-hidden="true"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default FormSelect;
