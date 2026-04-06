import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { generateInvoice } from "../utils/generateInvoice";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasPrompted = useRef(false);

  const order =
    location.state?.order ||
    JSON.parse(localStorage.getItem("lastOrder") || "null");

  useEffect(() => {
    if (!order) {
      navigate("/");
      return;
    }

    if (hasPrompted.current) return;
    hasPrompted.current = true;

    const shouldDownload = window.confirm(
      "Your order has been placed successfully.\n\nDo you want to download your invoice now?",
    );

    if (shouldDownload) {
      generateInvoice(order);
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-[#f7f4ef] dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 bg-[#f7f4ef] px-6 py-8 text-center dark:border-slate-800 dark:bg-slate-900/60">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-900/30">
              ✅
            </div>

            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Order Placed Successfully
            </h1>

            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Thank you for shopping with{" "}
              <span className="font-medium">M.wat_ches</span>.
            </p>

            <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
              Your order has been confirmed successfully.
            </p>
          </div>

          <div className="grid gap-6 px-6 py-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                Order Details
              </h2>

              <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Order ID
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {order.orderId || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Date
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {order.date || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Payment Method
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {order.paymentMethod || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Status
                    </p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-400">
                      Confirmed
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Grand Total
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      ₹{Number(order.total || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="mb-4 mt-8 text-xl font-semibold text-slate-900 dark:text-white">
                Shipping Details
              </h2>

              <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-800/50">
                <p className="font-medium text-slate-900 dark:text-white">
                  {order.customer?.name || "Customer Name"}
                </p>

                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  {order.customer?.email || "No email"}
                </p>

                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  {order.customer?.phone || "No phone"}
                </p>

                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  {order.customer?.address || "No address"}
                  {order.customer?.city ? `, ${order.customer.city}` : ""}
                  {order.customer?.pincode
                    ? ` - ${order.customer.pincode}`
                    : ""}
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                Ordered Items
              </h2>

              <div className="space-y-4 rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-800/50">
                {(order.items || []).length > 0 ? (
                  (order.items || []).map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0 dark:border-slate-800"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Qty: {item.quantity} × ₹
                          {Number(item.price || 0).toFixed(2)}
                        </p>
                      </div>

                      <p className="font-medium text-slate-900 dark:text-white">
                        ₹
                        {(
                          Number(item.price || 0) * Number(item.quantity || 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">
                    No items found for this order.
                  </p>
                )}

                <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>Subtotal</span>
                    <span>₹{Number(order.subtotal || 0).toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>Shipping</span>
                    <span>₹{Number(order.shipping || 0).toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>GST</span>
                    <span>₹{Number(order.gstAmount || 0).toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900 dark:border-slate-800 dark:text-white">
                    <span>Total</span>
                    <span>₹{Number(order.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <button
                  onClick={() => generateInvoice(order)}
                  className="rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Download Invoice
                </button>

                <Link
                  to="/my-orders"
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-center font-medium text-white transition hover:bg-emerald-700"
                >
                  My Orders
                </Link>

                <Link
                  to="/shop"
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-center font-medium text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
