import { useMemo, useState } from "react";
import { Flame, Sparkles, Users } from "lucide-react";
import EventCard from "./EventCard";

const sampleEvents = [
  {
    id: 1,
    title: "AI Workshop: Build with LLMs",
    subtitle: "Hands-on session with real projects and mentors.",
    banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    venue: "Innovation Lab",
    price: 0,
    going: 234,
    friends: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=600&auto=format&fit=crop",
    ],
    tags: ["forYou", "following"],
  },
  {
    id: 2,
    title: "Music Night: Indie Vibes",
    subtitle: "Live bands, open mic, and a surprise headliner.",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString(),
    venue: "Central Arena",
    price: 150,
    going: 768,
    friends: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=600&auto=format&fit=crop",
    ],
    tags: ["forYou", "trending"],
  },
  {
    id: 3,
    title: "Startup Pitch Battle",
    subtitle: "Showcase your idea and win exciting grants.",
    banner: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2070&auto=format&fit=crop",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString(),
    venue: "Auditorium",
    price: 0,
    going: 512,
    friends: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    ],
    tags: ["following", "trending"],
  },
];

export default function FeatureTabs() {
  const [tab, setTab] = useState("forYou");

  const filtered = useMemo(() => {
    return sampleEvents.filter((e) => e.tags.includes(tab));
  }, [tab]);

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
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
