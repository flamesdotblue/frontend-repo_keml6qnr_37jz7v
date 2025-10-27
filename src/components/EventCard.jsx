import { Calendar, CheckCheck, Clock, MapPin, Users, Share2, Ticket } from "lucide-react";

function daysLeft(dateStr) {
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days <= 1) return "Today";
  return `${days} days left`;
}

export default function EventCard({ event, registered = false }) {
  const isFree = event.price === 0;
  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:shadow-lg transition">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={event.banner}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-white/90 text-slate-900">
          <Calendar className="h-3.5 w-3.5 text-purple-600" />
          {new Date(event.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </div>
        <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-white/90 text-slate-900">
          {isFree ? (
            <span className="text-green-600">FREE</span>
          ) : (
            <div className="inline-flex items-center gap-1">
              <Ticket className="h-3.5 w-3.5 text-fuchsia-500" />₹{event.price}
            </div>
          )}
        </div>
        {registered && (
          <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-green-600 text-white shadow">
            <CheckCheck className="h-3.5 w-3.5" /> Registered
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-900 line-clamp-1">{event.title}</h3>
        <p className="mt-1 text-sm text-slate-600 line-clamp-2">{event.subtitle}</p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <div className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-slate-400" />{daysLeft(event.date)}</div>
          <div className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" />{event.venue}</div>
          <div className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-slate-400" />{event.going.toLocaleString()} going</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center -space-x-2">
            {event.friends.slice(0, 4).map((f, i) => (
              <img
                key={i}
                src={f}
                alt="friend"
                className="h-7 w-7 rounded-full ring-2 ring-white object-cover"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition">Interested</button>
            <button className="p-2 rounded-lg hover:bg-slate-100" aria-label="Share">
              <Share2 className="h-4 w-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
