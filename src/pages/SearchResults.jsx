import { Link, useSearchParams } from "react-router-dom";
import products from "../data/products";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const name = (product.name || product.title || "").toLowerCase();
    const category = (product.category || "").toLowerCase();
    const brand = (product.brand || "").toLowerCase();

    return (
      name.includes(query) || category.includes(query) || brand.includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#f7f4ef] px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-800 dark:text-white">
          Search Results
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-300">
          Showing results for:{" "}
          <span className="font-semibold">{query || "All Products"}</span>
        </p>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-300">
              No products found.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
              >
                <img
                  src={product.image}
                  alt={product.name || product.title}
                  className="h-56 w-full rounded-xl object-cover"
                />
                <h2 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">
                  {product.name || product.title}
                </h2>
                <p className="mt-1 text-emerald-600 dark:text-emerald-400">
                  ₹{product.price}
                </p>

                <Link
                  to={`/product/${product.id}`}
                  className="mt-4 inline-block rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
