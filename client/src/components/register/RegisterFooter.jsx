import { Link } from "react-router-dom";

function RegisterFooter({ role }) {
  const isAdmin = role === "admin";
  return (
    <p className="mt-6 text-center text-sm font-medium text-[#797875]">
      Already have an account?{" "}
      <Link
        to={isAdmin ? "/admin/login" : "/citizen/login"}
        className="font-bold text-[#fd7a08] transition-colors duration-200 hover:text-[#e56d00]"
      >
        Sign in
      </Link>
    </p>
  );
}

export default RegisterFooter;
