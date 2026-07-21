import { Link } from "react-router-dom";
import logoFull from "../../assets/logos/logo-full.svg";

function AuthHeader({
  title = "Welcome back",
  description = "Sign in to your PolicyGPT account",
  icon: Icon,
}) {
  return (
    <div className="mb-6 flex flex-col items-center text-center">
      <Link to="/" className="mb-4 shrink-0 transition-transform duration-200 hover:scale-105">
        <img src={logoFull} alt="PolicyGPT" className="h-9 w-auto" />
      </Link>
      <h1 className="font-['Poppins'] text-2xl font-bold text-[#242322]">{title}</h1>
      <p className="mt-1 text-base font-medium text-[#4c3c35]/70">
        {description}
      </p>
    </div>
  );
}

export default AuthHeader;
