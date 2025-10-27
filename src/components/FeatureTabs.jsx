import { useMemo, useState } from "react";
import { Flame, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { useGlobal } from "./GlobalStore";

export default function FeatureTabs() {
  const [tab, setTab] = useState("forYou");
  const { events, registeredEventIds } = useGlobal();

  const filtered = useMemo(() => {
    return events.filter((e) => (e.tags?.length ? e.tags.includes(tab) : true));
  }, [tab, events]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("forYou")}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              tab === "forYou"
                ? "text-white bg-gradient-to-r from-purple-600 to-cyan-500"
                : "text-slate-700 bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <Sparkles className="h-4 w-4" /> For You
          </button>
          <button
            onClick={() => setTab("following")}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              tab === "following"
                ? "text-white bg-gradient-to-r from-purple-600 to-cyan-500"
                : "text-slate-700 bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <Users className="h-4 w-4" /> Following
          </button>
          <button
            onClick={() => setTab("trending")}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              tab === "trending"
                ? "text-white bg-gradient-to-r from-purple-600 to-cyan-500"
                : "text-slate-700 bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <Flame className="h-4 w-4" /> Trending
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="px-2.5 py-1 rounded-full bg-fuchsia-50 text-fuchsia-700 font-medium">Fast • 60fps</span>
          <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 font-medium">Personalized</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((event) => (
          <Link key={event.id} to={`/event/${event.id}`} className="block">
            <EventCard event={event} registered={registeredEventIds.includes(event.id)} />
          </Link>
        ))}
      </div>
    </section>
  );
}
