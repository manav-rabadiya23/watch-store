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
        const text = `
          ${item.name}
          ${item.brand}
          ${item.category}
          ${item.type}
          ${item.shortDescription}
          ${item.description}
          ${item.tags?.join(" ")}
        `.toLowerCase();

        return text.includes(query);
      });
    }

    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

    if (sortBy === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high-low") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name-az")
      result.sort((a, b) => a.name.localeCompare(b.name));

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
    <section className="bg-[#f7f4ef] px-4 py-10 sm:px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Premium Collection
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-slate-900 md:text-5xl">
              Shop Watches
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Explore luxury-inspired timepieces designed with bold styling,
              clean details, and everyday sophistication.
            </p>
          </div>

          <div className="w-fit rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm">
            {filteredProducts.length} Products
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <input
              type="text"
              placeholder="Search Rolex, Black, Leather..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:bg-white"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:bg-white"
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
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:bg-white"
            >
              <option value="default">Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="name-az">Name: A to Z</option>
            </select>
          </div>

          {(search || category !== "All" || sortBy !== "default") && (
            <div className="mt-4">
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              No watches found
            </h2>
            <p className="mt-3 text-slate-600">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const liked = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative overflow-hidden rounded-[22px] bg-[#f3ede5]">
                    <Link to={`/product/${product.slug}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleWishlistToggle(product)}
                      className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border bg-white text-lg shadow-sm transition hover:scale-105 ${
                        liked
                          ? "border-red-200 text-red-500"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {liked ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col pt-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      {product.brand} • {product.category}
                    </p>

                    <Link to={`/product/${product.slug}`}>
                      <h2 className="mt-2 text-lg font-semibold leading-6 text-slate-900 transition hover:text-emerald-800">
                        {product.name}
                      </h2>
                    </Link>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                      {product.description}
                    </p>

                    <div className="mt-auto pt-5">
                      <p className="text-lg font-semibold text-slate-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                        >
                          Add Cart
                        </button>

                        <Link
                          to={`/product/${product.slug}`}
                          className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                        >
                          View
                        </Link>
                      </div>
                    </div>
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
