import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function AuthBlocker({ pageName = "this page" }) {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/15 backdrop-blur-[6px] px-4 min-h-[500px]">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-[28px] border border-white/20 p-8 shadow-2xl text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-[#F2762E] shadow-sm">
          <Lock className="w-8 h-8" strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-2xl font-bold text-gray-900 tracking-tight">
            Unlock {pageName}
          </h3>
          <p className="font-body text-[15px] leading-relaxed text-gray-600">
            Create a free account or log in to search, filter, check your eligibility, and compare detailed government schemes.
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate("/citizen/login")}
            className="w-full h-12 inline-flex items-center justify-center rounded-xl bg-[#F2762E] font-body text-base font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-[#e06520] active:scale-[0.98] transition-all cursor-pointer"
          >
            Login to Account
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/citizen/register")}
            className="w-full h-12 inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white font-body text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 active:scale-[0.98] transition-all cursor-pointer"
          >
            Register Free
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-sm font-body font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          Go Back to Homepage
        </button>
      </div>
    </div>
  );
}
