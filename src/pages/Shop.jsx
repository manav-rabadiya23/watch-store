import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Shop() {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((item) => {
        const searchableText = `
          ${item.name}
          ${item.brand}
          ${item.category}
          ${item.type}
          ${item.shortDescription}
          ${item.description}
          ${item.tags?.join(" ")}
        `.toLowerCase();

        return searchableText.includes(query);
      });
    }

    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

    if (sortBy === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name-az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, sortBy]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("default");
  };

  return (
    <section className="bg-[#f7f4ef] px-6 py-12 transition-colors duration-300 dark:bg-slate-950 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Premium Collection
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white md:text-5xl">
              Shop Watches
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Explore luxury-inspired timepieces designed with bold styling,
              clean details, and everyday sophistication.
            </p>
          </div>

          <div className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            {filteredProducts.length} Products
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <input
              type="text"
              placeholder="Search Rolex, Black, Smartwatch, Leather..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="default">Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="name-az">Name: A to Z</option>
            </select>
          </div>

          {(search || category !== "All" || sortBy !== "default") && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {search && (
                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  Search: {search}
                </span>
              )}

              {category !== "All" && (
                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  Category: {category}
                </span>
              )}

              {sortBy !== "default" && (
                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  Sorted
                </span>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              No watches found
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Try changing your search or filters to explore more styles.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => {
              const liked = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="relative overflow-hidden rounded-[24px] bg-[#f3ede5] dark:bg-slate-800">
                    <Link to={`/product/${product.slug}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-72 w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                      />
                    </Link>

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                    <button
                      type="button"
                      onClick={() => handleWishlistToggle(product)}
                      className={`absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm transition duration-300 ${
                        liked
                          ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300"
                          : "border-white/60 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {liked ? "♥" : "♡"}
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                        >
                          Add to Cart
                        </button>

                        <Link
                          to={`/product/${product.slug}`}
                          className="rounded-2xl border border-white/50 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-900 backdrop-blur-sm transition hover:bg-white dark:border-slate-600 dark:bg-slate-900/85 dark:text-white dark:hover:bg-slate-800"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                          {product.brand} • {product.category}
                        </p>

                        <Link to={`/product/${product.slug}`}>
                          <h2 className="mt-2 text-lg font-semibold leading-6 text-slate-900 transition group-hover:text-emerald-800 dark:text-white dark:group-hover:text-emerald-400">
                            {product.name}
                          </h2>
                        </Link>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                      >
                        Quick Add
                      </button>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {product.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
