function PrimaryButton({ children, isLoading, disabled, type = "button", loadingText = "Signing in..." }) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className="flex h-[42px] w-full items-center justify-center rounded-[15px] bg-[#ffcd73] text-sm font-medium text-[#242322] transition-all duration-200 hover:bg-[#f5c066] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#242322]/30 border-t-[#242322]" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default PrimaryButton;
