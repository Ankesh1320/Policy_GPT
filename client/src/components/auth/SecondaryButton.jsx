function SecondaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[54px] w-full items-center justify-center rounded-[15px] border border-[#938e8c] bg-white px-3 text-sm font-semibold text-[#242322] transition-all duration-200 hover:border-[#fd7a08] hover:bg-[#fff8de] cursor-pointer"
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
