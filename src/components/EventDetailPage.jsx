import { useParams } from "react-router-dom";
import { Clock, MapPin, Users } from "lucide-react";
import MagicButton from "./MagicButton";
import { useGlobal } from "./GlobalStore";

function daysLeft(dateStr) {
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days <= 1) return "Today";
  return `${days} days left`;
}

export default function EventDetailPage() {
  const { id } = useParams();
  const { getEventById } = useGlobal();
  const event = getEventById(id);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-xl font-semibold">Event not found</h2>
        <p className="text-slate-600 mt-2">The event you are looking for doesn't exist.</p>
      </div>
    );
  }

  const capacity = event.capacity ?? 200;
  const filled = Math.min(event.going, capacity);
  const percent = Math.round((filled / capacity) * 100);

  return (
    <div className="pb-24">
      <div className="relative w-full aspect-[16/7] overflow-hidden">
        <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="mx-auto max-w-3xl px-4 -mt-20 relative">
        <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{event.title}</h1>
              <p className="text-slate-600 mt-1">{event.subtitle}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-cyan-400 shadow" />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-700">
            <div className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-slate-400" />{daysLeft(event.date)}</div>
            <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" />{event.venue}</div>
            <div className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-slate-400" />{event.going.toLocaleString()} going</div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold">About this event</h3>
            <p className="text-slate-600 mt-1">
              {event.description ||
                "Join us for an unforgettable experience with engaging sessions, hands-on activities, and opportunities to connect with amazing people."}
            </p>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700 font-medium">{filled}/{capacity} spots filled</span>
              <span className="text-slate-500">{percent}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-500" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-slate-700 font-medium">18 friends are going</p>
            <div className="mt-2 flex -space-x-2">
              {event.friends.slice(0, 8).map((f, i) => (
                <img key={i} src={f} alt="friend" className="h-8 w-8 rounded-full ring-2 ring-white object-cover" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <MagicButton />
    </div>
  );
}
