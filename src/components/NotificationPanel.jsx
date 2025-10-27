import { useEffect, useState } from "react";
import { Bell, CheckCheck, Plus } from "lucide-react";

export default function NotificationPanel({ user, open, onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const backend = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    if (!open || !user?.email) return;
    let ignore = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${backend}/notifications?email=${encodeURIComponent(user.email)}`);
        if (!res.ok) throw new Error("Failed to load notifications");
        const data = await res.json();
        if (!ignore) setItems(data);
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [open, user, backend]);

  async function markAllRead() {
    if (!user?.email) return;
    await fetch(`${backend}/notifications/mark-all-read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });
    setItems((prev) => prev.map((it) => ({ ...it, read: true })));
  }

  async function addDemo() {
    if (!user?.email) return;
    const res = await fetch(`${backend}/notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, title: "New event near you", body: "Don\'t miss Tonight at 8pm 🎉" }),
    });
    if (res.ok) {
      const refreshed = await fetch(`${backend}/notifications?email=${encodeURIComponent(user.email)}`);
      if (refreshed.ok) setItems(await refreshed.json());
    }
  }

  if (!open) return null;

  return (
    <div className="absolute right-4 top-16 z-50 w-[22rem] sm:w-[26rem]">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-slate-600" />
            <h4 className="font-semibold">Notifications</h4>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={addDemo} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium border border-slate-200 hover:bg-slate-50">
              <Plus className="h-4 w-4" /> Add demo
            </button>
            <button onClick={markAllRead} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium border border-slate-200 hover:bg-slate-50">
              <CheckCheck className="h-4 w-4" /> Mark all read
            </button>
            <button onClick={onClose} className="rounded-md p-1 hover:bg-slate-100">✕</button>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
          {loading && <div className="p-4 text-sm text-slate-500">Loading…</div>}
          {error && <div className="p-4 text-sm text-red-600">{error}</div>}
          {!loading && !error && items.length === 0 && (
            <div className="p-6 text-center text-sm text-slate-500">No notifications yet</div>
          )}
          {items.map((n) => (
            <div key={n.id} className={`p-4 ${n.read ? "bg-white" : "bg-purple-50/50"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">{n.title}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{n.body}</p>
                </div>
                {!n.read && <span className="mt-1 inline-block h-2 w-2 rounded-full bg-purple-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
