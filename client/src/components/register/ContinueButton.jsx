import { FiArrowRight } from "react-icons/fi";

function ContinueButton({ children = "Continue", onClick, type = "button", isLoading, disabled, fullWidth = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex h-[42px] items-center justify-center gap-2 rounded-[16px] bg-[#ffcd73] text-sm font-medium text-[#242322] transition-all duration-200 hover:bg-[#f5c066] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer ${
        fullWidth ? "w-full" : "flex-1"
      }`}
    >
      {isLoading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#242322]/30 border-t-[#242322]" />
          Please wait...
        </>
      ) : (
        <>
          {children}
          {children === "Continue" && <FiArrowRight size={16} aria-hidden="true" />}
        </>
      )}
    </button>
  );
}

export default ContinueButton;
