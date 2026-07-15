import { HiOutlineShieldCheck } from "react-icons/hi2";

function RegisterHeader({ role }) {
  const isAdmin = role === "admin";
  return (
    <div className="mb-5 flex flex-col items-center text-center">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#fd7a08] transition-transform duration-200 hover:scale-105">
        <HiOutlineShieldCheck className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
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
