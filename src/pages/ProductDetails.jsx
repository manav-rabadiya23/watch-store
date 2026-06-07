import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import products from "../data/products";

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <section className="bg-[#f7f4ef] px-6 py-16 md:px-10 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Product not found
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            The product you are looking for does not exist.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  const relatedProducts = products
    .filter(
      (item) => item.id !== product.id && item.category === product.category,
    )
    .slice(0, 4);

  const fallbackRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : products.filter((item) => item.id !== product.id).slice(0, 4);

  const liked = isInWishlist(product.id);

  const formattedPrice = `₹${product.price.toLocaleString("en-IN")}`;
  const oldPrice = Math.round(product.price * 1.2);
  const formattedOldPrice = `₹${oldPrice.toLocaleString("en-IN")}`;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    toast.success(`${product.name} added to cart`);
  };

  const handleAddAndGoToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    toast.success(`${product.name} added to cart`);
    navigate("/cart");
  };

  const handleWishlistToggle = () => {
    if (liked) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <section className="bg-[#f7f4ef] px-6 py-12 md:px-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <Link
            to="/"
            className="transition hover:text-emerald-800 dark:hover:text-emerald-400"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            to="/shop"
            className="transition hover:text-emerald-800 dark:hover:text-emerald-400"
          >
            Shop
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">{product.name}</span>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="overflow-hidden rounded-[28px] bg-[#f3ede5]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[520px] w-full object-cover transition duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="grid max-w-[720px] gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Highlights
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-x-1 gap-y-2 text-sm text-slate-600">
                  {product.tags?.map((tag) => (
                    <div key={tag}>• {tag}</div>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Specifications
                </h3>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="grid grid-cols-[90px_1fr] items-center gap-3">
                    <span className="text-slate-500">Brand</span>
                    <span className="font-semibold text-slate-900">
                      {product.brand}
                    </span>
                  </div>

                  <div className="grid grid-cols-[90px_1fr] items-center gap-3">
                    <span className="text-slate-500">Category</span>
                    <span className="font-semibold text-slate-900">
                      {product.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-[90px_1fr] items-center gap-3">
                    <span className="text-slate-500">Type</span>
                    <span className="font-semibold text-slate-900">
                      Luxury Watch
                    </span>
                  </div>

                  <div className="grid grid-cols-[90px_1fr] items-center gap-3">
                    <span className="text-slate-500">Warranty</span>
                    <span className="font-semibold text-slate-900">1 Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-800">
                {product.brand} • {product.category}
              </p>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                In Stock
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-slate-900 md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <p className="text-3xl font-semibold text-slate-900">
                {formattedPrice}
              </p>
              <p className="text-sm text-slate-500 line-through">
                {formattedOldPrice}
              </p>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                20% OFF
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3 text-sm text-slate-600">
              <span className="text-amber-500">★ ★ ★ ★ ☆</span>
              <span>4.6 rating</span>
              <span>•</span>
              <span>128 reviews</span>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              {product.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Estimated Delivery
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Delivered in 3–5 business days across India.
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Authenticity
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Premium quality checked before dispatch.
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Easy Returns
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  7-day simple return support for eligible orders.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded-2xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg"
              >
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleAddAndGoToCart}
                className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-800 transition duration-300 hover:border-slate-400 hover:bg-slate-50"
              >
                Buy Now
              </button>

              <button
                type="button"
                onClick={handleWishlistToggle}
                className={`rounded-2xl border px-6 py-4 text-sm font-semibold transition duration-300 ${
                  liked
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                {liked ? "♥ Wishlisted" : "♡ Wishlist"}
              </button>
            </div>

            <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Why customers love it
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Premium Look
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Elegant design that fits daily wear and occasion styling.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Comfortable Fit
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Made for smooth wrist feel and all-day comfort.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Great Gift Option
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    A stylish choice for birthdays, events, and celebrations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                More to Explore
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                Related Watches
              </h2>
            </div>

            <Link
              to="/shop"
              className="text-sm font-semibold text-slate-700 transition hover:text-emerald-800 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              View All →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fallbackRelated.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.slug}`}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="overflow-hidden rounded-[22px] bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="pt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {item.brand} • {item.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
