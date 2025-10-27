import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { useGlobal } from "./GlobalStore";

const branches = ["CSE", "ECE", "ME", "CE", "EEE", "IT"];
const years = ["1st", "2nd", "3rd", "4th"];

export default function RegistrationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser, registerForEvent, getEventById } = useGlobal();
  const event = getEventById(id);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [branch, setBranch] = useState(branches[0]);
  const [year, setYear] = useState(years[0]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-xl font-semibold">Event not found</h2>
        <p className="text-slate-600 mt-2">The event you are looking for doesn't exist.</p>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Persist user in global store if missing
    if (!user) {
      setUser({ name, email, avatar_url: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(
        name || email
      )}` });
    }

    // Simulate API registration
    setTimeout(() => {
      registerForEvent(Number(id));
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate(`/event/${id}`);
      }, 2000);
    }, 900);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 pb-24">
      <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Register for {event.title}</h1>
        <p className="text-slate-600 mt-1">You're almost in — confirm your details and join the event.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-1">
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your name"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@college.edu"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm font-medium text-slate-700">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm font-medium text-slate-700">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow hover:shadow-lg active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register for Free"}
            </button>
          </div>
        </form>

        {success && (
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-fuchsia-50 via-purple-50 to-cyan-50 border border-slate-200 p-6 text-center animate-in fade-in slide-in-from-top-2">
            <div className="mx-auto h-12 w-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="mt-3 text-lg font-semibold">You’re in! 🎉</h3>
            <p className="text-slate-600">Instant confirmation — redirecting back to the event...</p>
          </div>
        )}
      </div>
    </div>
  );
}
