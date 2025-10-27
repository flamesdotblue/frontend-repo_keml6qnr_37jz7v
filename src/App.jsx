import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureTabs from "./components/FeatureTabs";

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureTabs />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-3xl bg-gradient-to-br from-fuchsia-50 via-purple-50 to-cyan-50 border border-slate-200 p-6 sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight">Why students love Flyx</h2>
            <p className="mt-2 text-slate-600">Built for speed, crafted for delight, and designed for your campus journey.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4">
                <p className="text-sm font-semibold">Personalized feed</p>
                <p className="text-sm text-slate-600 mt-1">See exactly what matters: your clubs, interests, and what friends are attending.</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4">
                <p className="text-sm font-semibold">Frictionless registration</p>
                <p className="text-sm text-slate-600 mt-1">One-tap signup, smooth payments, instant tickets with QR codes.</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4">
                <p className="text-sm font-semibold">Live moments</p>
                <p className="text-sm text-slate-600 mt-1">Share photos, stories, and connect with attendees in real-time.</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4">
                <p className="text-sm font-semibold">Beautiful by default</p>
                <p className="text-sm text-slate-600 mt-1">Modern visuals, smooth animations, and delightful micro-interactions.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Flyx. All rights reserved.</p>
          <div className="text-sm text-slate-500">Built for campus communities.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
