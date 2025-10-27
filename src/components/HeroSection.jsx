import Spline from "@splinetool/react-spline";
import { Rocket, Play, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[520px] md:h-[600px]">
        <div className="absolute inset-0">
          <Spline
            scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 ring-1 ring-slate-200 px-3 py-1 text-xs font-medium text-slate-700 mb-4 shadow-sm">
              <Rocket className="h-3.5 w-3.5 text-purple-600" />
              Elevate your campus life with Flyx
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Discover, register, and relive the best campus events — all in one place
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              Personalized feeds, effortless registrations, stunning ticketing, and vibrant live moments.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 shadow hover:shadow-lg transition">
                Get started
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 bg-white ring-1 ring-slate-200 hover:ring-slate-300 transition">
                <Play className="h-4 w-4" />
                See how it works
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
