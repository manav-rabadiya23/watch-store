import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-88px)] items-center bg-[#f7f4ef] px-6 py-12 md:px-10 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[36px] border border-slate-200 bg-white p-10 text-center shadow-sm md:p-14 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            404 Error
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white md:text-7xl">
            Lost in Time
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
            The page you are looking for does not exist or may have been moved.
            Let’s get you back to the collection.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="rounded-2xl bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Back to Home
            </Link>

            <Link
              to="/shop"
              className="rounded-2xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 transition duration-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              Explore Watches
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Shop
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Browse premium watches and discover your next style.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Wishlist
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Save your favorite timepieces and revisit them anytime.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Contact
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Need help? Reach out and we’ll guide you quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
