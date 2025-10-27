import { createContext, useContext, useMemo, useState } from "react";

// Simple global store using React Context
const GlobalContext = createContext(null);

const initialEvents = [
  {
    id: 123,
    title: "Tech Fest",
    subtitle: "Experience the future: demos, talks, and workshops.",
    banner:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=2070&auto=format&fit=crop",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    venue: "Main Quadrangle",
    price: 0,
    capacity: 200,
    going: 142,
    friends: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=600&auto=format&fit=crop",
    ],
    tags: ["forYou", "trending"],
  },
  {
    id: 1,
    title: "AI Workshop: Build with LLMs",
    subtitle: "Hands-on session with real projects and mentors.",
    banner:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    venue: "Innovation Lab",
    price: 0,
    capacity: 300,
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
    banner:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString(),
    venue: "Central Arena",
    price: 150,
    capacity: 1000,
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
    banner:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2070&auto=format&fit=crop",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString(),
    venue: "Auditorium",
    price: 0,
    capacity: 400,
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

export function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const [events] = useState(initialEvents);

  function registerForEvent(eventId) {
    setRegisteredEventIds((prev) => (prev.includes(eventId) ? prev : [...prev, eventId]));
  }

  const value = useMemo(
    () => ({
      user,
      setUser,
      registeredEventIds,
      registerForEvent,
      isRegistered: (id) => registeredEventIds.includes(Number(id)),
      events,
      getEventById: (id) => events.find((e) => e.id === Number(id)) || null,
      myRegistrations: () => events.filter((e) => registeredEventIds.includes(e.id)),
    }),
    [user, registeredEventIds, events]
  );

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export function useGlobal() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal must be used within GlobalProvider");
  return ctx;
}
