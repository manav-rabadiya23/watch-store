import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  return (
    <section className="px-4 py-10 sm:px-6 md:px-10 md:py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">
          Featured Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4"></div>

              <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                Watch {item}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Premium stylish watch
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-white">
                  ₹1999
                </span>

                <Link
                  to="/product/1"
                  className="text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
