import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Hero() {
  return (
    <section className="bg-[#f6f1ea] px-4 py-8 transition-colors duration-300 dark:bg-slate-950 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-7xl items-center overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)] transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:grid-cols-2">
        <div className="px-5 py-8 sm:px-6 sm:py-10 md:px-14 md:py-16 lg:px-16">
          <div className="mb-5 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-800 transition duration-300 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300 sm:px-4 sm:text-sm">
            Premium Timepieces • Curated Collection
          </div>

          <h1 className="max-w-xl text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-4xl md:text-6xl">
            <span className="inline-block animate-[fadeUp_0.7s_ease-out]">
              Timeless watches
            </span>
            <span className="block animate-[fadeUp_0.9s_ease-out] text-emerald-800 dark:text-emerald-400">
              for every style
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-[fadeUp_1.1s_ease-out] text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base md:text-lg">
            Discover elegant watches designed for modern lifestyles — refined,
            reliable, and made to elevate every moment.
          </p>

          <div className="mt-8 flex animate-[fadeUp_1.3s_ease-out] flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-800 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-emerald-900"
            >
              Shop Now
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
            >
              View Collection
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 border-t border-slate-200 pt-6 animate-[fadeUp_1.5s_ease-out] dark:border-slate-800 sm:grid-cols-3">
            <div className="rounded-2xl p-3 transition duration-300 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-slate-800">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                Stylish
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Latest trending watches
              </p>
            </div>

            <div className="rounded-2xl p-3 transition duration-300 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-slate-800">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                24/7
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Customer support
              </p>
            </div>

            <div className="rounded-2xl p-3 transition duration-300 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-slate-800">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                Trusted
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Quality focused
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f3ede5] via-[#efe7dc] to-[#f8f4ee] px-4 py-8 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 sm:px-6 md:min-h-[560px] md:px-8 md:py-12">
          <div className="absolute h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl dark:bg-emerald-500/10" />
          <div className="absolute bottom-10 left-10 h-32 w-32 rounded-full bg-cyan-200/20 blur-3xl dark:bg-cyan-400/10" />

          <div className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 sm:right-6 sm:top-6 md:right-10 md:top-10">
            M.wat_ches
          </div>

          <div className="relative rounded-[24px] border border-white/70 bg-white/50 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur transition duration-500 hover:-translate-y-2 dark:border-slate-700 dark:bg-slate-900/60 sm:rounded-[30px] sm:p-6">
            <img
              src={logo}
              alt="M.wat_ches logo"
              className="w-full max-w-[260px] object-contain drop-shadow-[0_14px_30px_rgba(6,78,59,0.12)] transition duration-500 hover:scale-105 sm:max-w-[330px] md:max-w-[430px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
