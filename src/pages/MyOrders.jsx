import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useOrders } from "../context/OrdersContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function formatPrice(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString("en-GB");
  } catch {
    return "N/A";
  }
}

function getStatusClasses(status = "") {
  const value = status.toLowerCase();

  if (value === "delivered") {
    return "border border-emerald-500/30 bg-emerald-500/15 text-emerald-400";
  }

  if (value === "shipped") {
    return "border border-sky-500/30 bg-sky-500/15 text-sky-400";
  }

  if (value === "confirmed") {
    return "border border-amber-500/30 bg-amber-500/15 text-amber-400";
  }

  return "border border-slate-600 bg-slate-800 text-slate-300";
}

export default function MyOrders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getOrdersByUser } = useOrders();
  const { addToCart } = useCart();

  const userOrders = useMemo(() => {
    if (!user) return [];
    return getOrdersByUser(user.uid, user.email).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, [getOrdersByUser, user]);

  const totalSpent = userOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0,
  );

  const totalItemsBought = userOrders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (itemSum, item) => itemSum + Number(item.quantity || 1),
        0,
      ),
    0,
  );

  const handleBuyAgain = (order) => {
    if (!order.items?.length) return;

    order.items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        title: item.title,
        price: item.price,
        image: item.image,
      });
    });

    navigate("/cart");
  };

  return (
    <section className="min-h-screen bg-[#f7f4ef] px-4 py-10 dark:bg-slate-950 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-900 px-6 py-10 text-white md:px-10 md:py-12">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-400 blur-3xl" />
              <div className="absolute right-0 top-10 h-40 w-40 rounded-full bg-emerald-400 blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                  My Orders
                </p>
                <h1 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
                  Your purchase history
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">
                  Track your recent purchases, review payment details, and
                  continue shopping.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:w-full md:w-[360px]">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Total Orders
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {userOrders.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Total Spent
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatPrice(totalSpent)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {userOrders.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-950/50">
                <div className="mx-auto max-w-xl">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-2xl dark:bg-slate-800">
                    🕒
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold text-slate-900 dark:text-white">
                    No orders yet
                  </h2>

                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    When you place an order while logged in, it will appear here
                    automatically.
                  </p>

                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                      to="/shop"
                      className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-white dark:text-slate-900 dark:hover:bg-emerald-300"
                    >
                      Start Shopping
                    </Link>

                    <Link
                      to="/wishlist"
                      className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                    >
                      View Wishlist
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/50">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Items Purchased
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                      {totalItemsBought}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/50">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Latest Status
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                      {userOrders[0]?.status || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/50">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Last Order Date
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                      {formatDate(userOrders[0]?.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {userOrders.map((order) => (
                    <article
                      key={order.id}
                      className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
                    >
                      <div className="grid gap-6 p-6 md:grid-cols-5 md:p-8">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Order ID
                          </p>
                          <h3 className="mt-2 break-all text-2xl font-semibold text-slate-900 dark:text-white">
                            {order.id}
                          </h3>
                        </div>

                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Date
                          </p>
                          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Total
                          </p>
                          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                            {formatPrice(order.total)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Payment
                          </p>
                          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                            {order.payment}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Status
                          </p>
                          <div className="mt-3">
                            <span
                              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${getStatusClasses(
                                order.status,
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {order.items?.length ? (
                        <div className="border-t border-slate-200 px-6 py-5 dark:border-slate-800 md:px-8">
                          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                            Items
                          </p>

                          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {order.items.map((item, index) => (
                              <div
                                key={`${order.id}-${item.id}-${index}`}
                                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                              >
                                <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                                  <img
                                    src={item.image}
                                    alt={item.name || item.title || "Watch"}
                                    className="h-full w-full object-cover"
                                  />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                    {item.name || item.title || "Watch"}
                                  </p>
                                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Qty: {item.quantity || 1}
                                  </p>
                                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {formatPrice(item.price)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-5 dark:border-slate-800 sm:flex-row md:px-8">
                        <button
                          onClick={() => navigate(`/track-order/${order.id}`)}
                          className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Track Order
                        </button>

                        <button
                          onClick={() => handleBuyAgain(order)}
                          className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                        >
                          Buy Again
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
