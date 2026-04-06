import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Hero() {
  return (
    <section className="bg-[#f6f1ea] px-4 py-6 transition-colors duration-300 dark:bg-slate-950 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-7xl items-center overflow-hidden rounded-[24px] sm:rounded-[36px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)] transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="px-4 py-6 sm:px-6 sm:py-10 md:px-14 md:py-16 lg:px-16">
          <div className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-medium text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300 sm:px-4 sm:text-sm">
            Premium Timepieces • Curated Collection
          </div>

          {/* HEADING FIX */}
          <h1 className="max-w-xl text-2xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-6xl">
            <span className="block">Timeless watches</span>
            <span className="block text-emerald-800 dark:text-emerald-400">
              for every style
            </span>
          </h1>

          {/* TEXT FIX */}
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base md:text-lg">
            Discover elegant watches designed for modern lifestyles — refined,
            reliable, and made to elevate every moment.
          </p>

          {/* BUTTON FIX */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto text-center rounded-2xl bg-emerald-800 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-900"
            >
              Shop Now
            </Link>

            <Link
              to="/shop"
              className="w-full sm:w-auto text-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
            >
              View Collection
            </Link>
          </div>

          {/* FEATURES FIX */}
          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-200 pt-4 dark:border-slate-800 sm:grid-cols-3">
            <div className="rounded-xl p-2">
              <p className="text-lg font-semibold">Stylish</p>
              <p className="text-xs text-slate-500">Latest watches</p>
            </div>

            <div className="rounded-xl p-2">
              <p className="text-lg font-semibold">24/7</p>
              <p className="text-xs text-slate-500">Support</p>
            </div>

            <div className="rounded-xl p-2">
              <p className="text-lg font-semibold">Trusted</p>
              <p className="text-xs text-slate-500">Quality</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f3ede5] via-[#efe7dc] to-[#f8f4ee] px-4 py-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 sm:px-6 md:min-h-[500px] md:px-8 md:py-12">
          <div className="absolute h-52 w-52 sm:h-72 sm:w-72 rounded-full bg-emerald-100/60 blur-3xl dark:bg-emerald-500/10" />

          <div className="relative rounded-[20px] sm:rounded-[30px] border border-white/70 bg-white/50 p-3 sm:p-6 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
            <img
              src={logo}
              alt="logo"
              className="w-full max-w-[180px] sm:max-w-[260px] md:max-w-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
