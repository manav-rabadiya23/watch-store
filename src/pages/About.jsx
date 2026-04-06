import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="bg-[#f7f4ef] px-4 py-10 sm:px-6 md:px-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              About Brand
            </p>

            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-white sm:text-3xl md:text-5xl">
              Crafting Timeless Watches for Modern Style
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              At M.wat_ches, we believe a watch is more than just an accessory.
              It reflects personality, confidence, and everyday style. Our goal
              is to offer premium-looking timepieces that feel modern, elegant,
              and versatile for every occasion.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
              Every watch in our collection is selected with attention to
              quality, comfort, and design. Whether you prefer classic silver,
              bold black, luxury gold, or refined leather styles, we aim to
              bring you watches that make a strong impression.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Premium Feel
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Clean finishes, stylish detailing, and elegant designs made for
                everyday wear.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Modern Collection
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                A curated range of watches designed for classic, luxury, and
                statement looks.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Trusted Style
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Built for customers who want confidence, comfort, and a polished
                premium appearance.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Instagram
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                Follow M.wat_ches
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Stay updated with our latest watches, reels, and premium
                collection drops.
              </p>
              <a
                href="https://www.instagram.com/m.wat_ches/?hl=en"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Visit Instagram
              </a>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Contact Email
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                Get in touch with us
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                For inquiries, support, or order-related help, contact us
                directly by email.
              </p>
              <a
                href="mailto:mrwatches23@gmail.com"
                className="mt-5 inline-flex rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                mrwatches23@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Explore Collection
            </Link>

            <Link
              to="/contact"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
