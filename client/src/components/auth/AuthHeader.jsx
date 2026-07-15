import { HiOutlineShieldCheck } from "react-icons/hi2";

function AuthHeader({
  title = "Welcome back",
  description = "Sign in to your PolicyGPT account",
  icon: Icon = HiOutlineShieldCheck,
}) {
  return (
    <div className="mb-6 flex flex-col items-center text-center">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#fd7a08] transition-transform duration-200 hover:scale-105">
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
      <h1 className="font-['Poppins'] text-2xl font-bold text-[#242322]">{title}</h1>
      <p className="mt-1 text-base font-medium text-[#4c3c35]/70">
        {description}
      </p>
    </div>
  );
}

export default AuthHeader;
