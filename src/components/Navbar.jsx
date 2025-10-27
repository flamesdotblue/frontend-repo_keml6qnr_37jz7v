import { Search, Bell, User, LogOut } from "lucide-react";

export default function Navbar({ user, onOpenLogin, onToggleNotifications, notificationsOpen, onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500 via-purple-600 to-cyan-400 shadow-md" />
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500">Flyx</span>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search events, clubs, people"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100/70 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <button onClick={onToggleNotifications} className={`p-2 rounded-lg transition ${notificationsOpen ? "bg-slate-100" : "hover:bg-slate-100"}`} aria-label="Notifications">
              <Bell className="h-5 w-5 text-slate-600" />
            </button>
          )}
          {!user ? (
            <button onClick={onOpenLogin} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow hover:shadow-md active:scale-[0.99] transition">
              <User className="h-4 w-4" /> Login
            </button>
          ) : (
            <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          )}
          <button className="hidden sm:inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow hover:shadow-md active:scale-[0.99] transition">
            Get the app
          </button>
        </div>
      </div>
    </header>
  );
}
