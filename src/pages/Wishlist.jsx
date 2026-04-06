import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist, moveToCart } =
    useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    const moved = moveToCart(item.id, addToCart);

    if (moved) {
      toast.success(`${item.name} moved to cart`);
    }
  };

  const handleRemove = (id) => {
    removeFromWishlist(id);
    toast.success("Removed from wishlist");
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success("Wishlist cleared");
  };

  return (
    <section className="bg-[#f7f4ef] px-6 py-12 dark:bg-slate-950 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Saved Items
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
              Your Wishlist
            </h1>
          </div>

          {wishlistItems.length > 0 && (
            <button
              type="button"
              onClick={handleClearWishlist}
              className="rounded-2xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Your wishlist is empty
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Add some premium watches to your wishlist.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-white dark:text-slate-900"
            >
              Explore Watches
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="overflow-hidden rounded-2xl bg-[#f3ede5] dark:bg-slate-800">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-72 w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-72 place-items-center text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="pt-5">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    ₹{Number(item.price || 0).toLocaleString("en-IN")}
                  </p>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-white dark:text-slate-900"
                    >
                      Move to Cart
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="rounded-2xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30"
                    >
                      Remove
                    </button>
                  </div>

                  <Link
                    to={`/product/${item.slug}`}
                    className="mt-3 inline-block text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  >
                    View Product →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
