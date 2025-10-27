import { useMemo } from "react";
import { useGlobal } from "./GlobalStore";
import { Calendar, MapPin, Ticket, User } from "lucide-react";
import { Link } from "react-router-dom";

function ProfileHeader() {
  const { user } = useGlobal();
  const name = user?.name || "Flyx User";
  const avatar = user?.avatar_url || `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(name)}`;

  return (
    <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-6 flex items-center gap-4">
      <img src={avatar} alt="avatar" className="h-16 w-16 rounded-2xl object-cover" />
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{name}</h1>
        <p className="text-slate-600">Building memories across campus. #flyx</p>
        <div className="mt-2 flex items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1"><Ticket className="h-4 w-4" /> My Tickets</span>
          <span className="inline-flex items-center gap-1"><User className="h-4 w-4" /> Profile</span>
        </div>
      </div>
    </div>
  );
}

function MyTickets() {
  const { myRegistrations } = useGlobal();
  const upcoming = useMemo(() => myRegistrations(), [myRegistrations]);

  return (
    <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Tickets</h2>
        <div className="text-sm text-slate-500">Upcoming</div>
      </div>

      {upcoming.length === 0 ? (
        <p className="mt-4 text-slate-600">No tickets yet. Explore the <Link to="/" className="text-purple-600 underline">home feed</Link>.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {upcoming.map((e) => (
            <Link
              key={e.id}
              to={`/event/${e.id}`}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:shadow-lg transition"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img src={e.banner} alt={e.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-white/90 text-slate-900">
                  <Calendar className="h-3.5 w-3.5 text-purple-600" />
                  {new Date(e.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold line-clamp-1">{e.title}</h3>
                <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-slate-400" /> {e.venue}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ProfileHeader />
      <div className="mt-6" />
      <MyTickets />
    </div>
  );
}
