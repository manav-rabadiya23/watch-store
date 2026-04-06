import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cartItems.reduce((acc, item) => {
    return acc + Number(item.price || 0) * Number(item.quantity || 1);
  }, 0);

  return (
    <section className="bg-[#f7f4ef] px-4 py-10 sm:px-6 md:px-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Shopping Cart
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-slate-900 dark:text-white sm:text-3xl">
            Your Cart
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Your cart is empty
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Add some premium watches to continue shopping.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-2xl object-cover sm:h-24 sm:w-24"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        Watch
                      </div>
                    )}

                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">
                        ₹{Number(item.price || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-1 dark:border-slate-700 dark:bg-slate-800">
                      <button
                        type="button"
                        onClick={() => decreaseQty(item.id)}
                        className="h-9 w-9 rounded-full text-lg font-semibold text-slate-700 transition hover:bg-white dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        -
                      </button>
                      <span className="min-w-[36px] text-center text-sm font-semibold text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increaseQty(item.id)}
                        className="h-9 w-9 rounded-full text-lg font-semibold text-slate-700 transition hover:bg-white dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Order Summary
              </h3>

              <div className="mt-6 space-y-4 border-t border-slate-200 pt-6 dark:border-slate-800">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span>Items</span>
                  <span>
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity || 1),
                      0,
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900 dark:border-slate-800 dark:text-white">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
