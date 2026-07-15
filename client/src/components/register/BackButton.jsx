import { FiArrowLeft } from "react-icons/fi";

function BackButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-[42px] flex-1 items-center justify-center gap-2 rounded-[15px] border border-[#938e8c] bg-white text-xs font-medium text-[#938e8c] transition-all duration-200 hover:border-[#fd7a08] hover:bg-[#fff8de] hover:text-[#242322] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
    >
      <FiArrowLeft size={16} aria-hidden="true" />
      Back
    </button>
  );
}

export default BackButton;
