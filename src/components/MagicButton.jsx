import { CheckCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobal } from "./GlobalStore";

export default function MagicButton() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isRegistered } = useGlobal();
  const registered = isRegistered(id);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur p-4">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => {
            if (!registered) navigate(`/event/${id}/register`);
          }}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold transition shadow ${
            registered
              ? "bg-slate-100 text-slate-700 cursor-default"
              : "text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg active:scale-[0.99]"
          }`}
        >
          {registered ? (
            <>
              Registered <CheckCheck className="h-5 w-5" />
            </>
          ) : (
            <>Register for Free</>
          )}
        </button>
      </div>
    </div>
  );
}
