function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  endAdornment,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#242322]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`h-[42px] w-full rounded-[20px] border-2 bg-[#fff8de] px-4 text-[15px] font-medium text-[#242322] placeholder:text-[#938e8c]/76 outline-none transition-all duration-200 focus:border-[#ffcd73] focus:ring-2 focus:ring-[#ffcd73]/30 ${
            endAdornment ? "pr-11" : ""
          } ${error ? "border-red-400" : "border-[#ffcd73]"}`}
        />
        {endAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{endAdornment}</div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default FormInput;
