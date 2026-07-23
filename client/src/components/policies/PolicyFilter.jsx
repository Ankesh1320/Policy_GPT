import {
  filterCategories as defaultCategories,
  filterEligibility as defaultEligibility,
  stateOptions as defaultStates,
} from "../../data/policiesData";
import checkboxChecked from "../../assets/icons/policies/checkbox-checked.svg";
import checkboxUnchecked from "../../assets/icons/policies/checkbox-unchecked.svg";
import dropdownArrow from "../../assets/icons/policies/dropdown-arrow.svg";

export default function PolicyFilter({
  categories = defaultCategories,
  eligibilityOptions = defaultEligibility,
  states = defaultStates,
  selectedCategory,
  onCategoryChange,
  selectedEligibility,
  onEligibilityChange,
  selectedState,
  onStateChange,
  onReset,
}) {
  const toggleEligibility = (option) => {
    if (selectedEligibility.includes(option)) {
      onEligibilityChange(selectedEligibility.filter((item) => item !== option));
      return;
    }
    onEligibilityChange([...selectedEligibility, option]);
  };

  return (
    <aside className="w-full shrink-0 rounded-xl border border-border-warm bg-white p-6 lg:w-[280px]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold leading-7 text-slate-heading">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="cursor-pointer font-body text-sm font-semibold text-brand-orange transition-opacity hover:opacity-80"
        >
          Reset all
        </button>
      </div>

      <div className="mb-8">
        <p className="mb-3 font-heading text-xs font-semibold uppercase leading-4 tracking-normal text-text-body">
          Category
        </p>
        <div className="flex flex-col">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`cursor-pointer rounded-full px-2 py-2 text-left font-body text-[13px] font-medium leading-5 text-text-body transition-colors ${
                selectedCategory === category ? "bg-card-orange/60 text-brand-orange" : "hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-3 font-heading text-xs font-semibold uppercase leading-4 text-text-body">
          Eligibility
        </p>
        <div className="flex flex-col gap-3">
          {eligibilityOptions.map((option) => {
            const isChecked = selectedEligibility.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleEligibility(option)}
                aria-pressed={isChecked}
                className="flex w-full cursor-pointer items-center gap-3 text-left font-body text-sm font-medium text-text-body"
              >
                <img
                  src={isChecked ? checkboxChecked : checkboxUnchecked}
                  alt=""
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 font-heading text-xs font-semibold uppercase leading-4 text-text-body">
          State / UT
        </p>
        <div className="relative">
          <select
            value={selectedState}
            onChange={(event) => onStateChange(event.target.value)}
            className="h-[34px] w-full appearance-none rounded-full border border-border-warm bg-page-warm py-1 pl-3 pr-10 font-body text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <img
            src={dropdownArrow}
            alt=""
            className="pointer-events-none absolute right-3 top-1/2 h-[6px] w-3 -translate-y-1/2"
            aria-hidden="true"
          />
        </div>
      </div>
    </aside>
  );
}
