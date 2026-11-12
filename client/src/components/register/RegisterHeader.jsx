import { Link } from "react-router-dom";
import logoFull from "../../assets/logos/logo-full.svg";

function RegisterHeader({ role }) {
  const isAdmin = role === "admin";
  return (
    <div className="mb-5 flex flex-col items-center text-center">
      <Link to="/" className="mb-4 shrink-0 transition-transform duration-200 hover:scale-105">
        <img src={logoFull} alt="PolicyGPT" className="h-9 w-auto" />
      </Link>
      <h1 className="font-['Poppins'] text-2xl font-bold text-[#242322]">
        {isAdmin ? "Create Admin Account" : "Create your account"}
      </h1>
      <p className="mt-1 text-base font-medium text-[#4c3c35]/50">
        {isAdmin ? "Join as official / admin on policyGPT" : "Join 48+ lakh citizens on policyGPT"}
      </p>
    </div>
  );
}

export default RegisterHeader;
