function AuthCard({ children }) {
  return (
    <div className="w-full max-w-[372px] rounded-[20px] bg-white px-8 py-10 shadow-[0px_14px_43px_-5px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0px_18px_48px_-5px_rgba(0,0,0,0.28)] sm:px-10">
      {children}
    </div>
  );
}

export default AuthCard;
