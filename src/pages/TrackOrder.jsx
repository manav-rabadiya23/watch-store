import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";
import { useAuth } from "../context/AuthContext";

export default function TrackOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getOrdersByUser } = useOrders();

  const order = useMemo(() => {
    if (!user) return null;
    const orders = getOrdersByUser(user.uid, user.email);
    return orders.find((o) => o.id === orderId) || null;
  }, [user, orderId, getOrdersByUser]);

  const trackingSteps = ["Confirmed", "Processing", "Shipped", "Delivered"];

  const normalizedStatus = (order?.status || "Confirmed").toLowerCase();

  const currentStepIndex = useMemo(() => {
    const statusMap = {
      confirmed: 0,
      processing: 1,
      shipped: 2,
      delivered: 3,
    };
    return statusMap[normalizedStatus] ?? 0;
  }, [normalizedStatus]);

  const shortOrderId = order?.id
    ? `ORD-${order.id.slice(-6).toUpperCase()}`
    : "";

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not available";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "Not available";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const estimatedDelivery = useMemo(() => {
    const sourceDate = order?.date || order?.createdAt;
    if (!sourceDate) return null;

    const baseDate = new Date(sourceDate);
    if (Number.isNaN(baseDate.getTime())) return null;

    const deliveryDate = new Date(baseDate);
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    return deliveryDate;
  }, [order?.date, order?.createdAt]);

  const getStatusBadge = (status) => {
    switch ((status || "").toLowerCase()) {
      case "delivered":
        return "border border-emerald-500/20 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";
      case "shipped":
        return "border border-blue-500/20 bg-blue-500/15 text-blue-600 dark:text-blue-400";
      case "processing":
        return "border border-amber-500/20 bg-amber-500/15 text-amber-600 dark:text-amber-400";
      case "confirmed":
      default:
        return "border border-violet-500/20 bg-violet-500/15 text-violet-600 dark:text-violet-400";
    }
  };

  const getDeliveryMessage = () => {
    switch ((order?.status || "").toLowerCase()) {
      case "confirmed":
        return "Your order has been placed successfully and is waiting for processing.";
      case "processing":
        return "Your order is being prepared carefully for dispatch.";
      case "shipped":
        return "Your order has been shipped and is on the way to your address.";
      case "delivered":
        return "Your order has been delivered successfully.";
      default:
        return "Your order status has been updated.";
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f4ef] px-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Please log in
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            You need to sign in to track your order.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-white transition hover:opacity-90 dark:bg-white dark:text-slate-900"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f4ef] px-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Order not found
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            We could not find the order you are looking for.
          </p>
          <button
            onClick={() => navigate("/my-orders")}
            className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-white transition hover:bg-emerald-700"
          >
            Back to My Orders
          </button>
        </div>
      </div>
    );
  }

  const shippingInfo = order.shippingInfo || {};
  const items = order.items || order.products || [];
  const orderDate = order.date || order.createdAt;

  return (
    <section className="min-h-screen bg-[#f7f4ef] px-4 py-10 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Order Tracking
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Track Your Order
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Follow your shipment journey and review your order details.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/my-orders"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              Back to Orders
            </Link>

            <Link
              to="/shop"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-slate-900"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] xl:gap-8">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    Tracking Summary
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">#{shortOrderId}</h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Ordered on {formatDate(orderDate)}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusBadge(order.status)}`}
                >
                  {order.status || "Confirmed"}
                </span>
              </div>

              <div className="mt-10 hidden md:block">
                <div className="relative px-4">
                  <div className="absolute left-[7%] right-[7%] top-5 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />

                  <div
                    className="absolute left-[7%] top-5 h-1 rounded-full bg-emerald-600 transition-all duration-500"
                    style={{
                      width: `${currentStepIndex * 28}%`,
                    }}
                  />

                  <div className="relative grid grid-cols-4">
                    {trackingSteps.map((step, index) => {
                      const completed = index <= currentStepIndex;

                      return (
                        <div key={step} className="flex flex-col items-center">
                          <div
                            className={`z-10 flex h-11 w-11 items-center justify-center rounded-full border-4 text-sm font-bold transition ${
                              completed
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-slate-300 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                            }`}
                          >
                            {index + 1}
                          </div>

                          <p
                            className={`mt-3 text-center text-sm font-medium ${
                              completed
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-500 dark:text-slate-400"
                            }`}
                          >
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4 md:hidden">
                {trackingSteps.map((step, index) => {
                  const completed = index <= currentStepIndex;

                  return (
                    <div key={step} className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          completed
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div>
                        <p className="font-medium">{step}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {completed ? "Completed" : "Pending"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">Ordered Items</h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-4">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
                    >
                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/120x120?text=Watch"
                        }
                        alt={item.name || item.title || "Product"}
                        className="h-20 w-20 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                          {item.name || item.title || "Watch"}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          Quantity: {item.quantity || 1}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    No item details available for this order.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 shadow-sm md:p-7">
              <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                Delivery Update
              </h2>
              <p className="mt-3 text-sm leading-6 text-emerald-700/90 dark:text-emerald-300">
                {getDeliveryMessage()}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-7">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500 dark:text-slate-400">
                    Order ID
                  </span>
                  <span className="text-right font-semibold">
                    {shortOrderId}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500 dark:text-slate-400">
                    Status
                  </span>
                  <span className="text-right font-semibold">
                    {order.status || "Confirmed"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500 dark:text-slate-400">
                    Payment
                  </span>
                  <span className="text-right font-semibold">
                    {order.paymentMethod || "Not available"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500 dark:text-slate-400">
                    Order Date
                  </span>
                  <span className="text-right font-semibold">
                    {formatDate(orderDate)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500 dark:text-slate-400">
                    Estimated Delivery
                  </span>
                  <span className="text-right font-semibold">
                    {estimatedDelivery
                      ? formatDate(estimatedDelivery)
                      : "Not available"}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="flex items-center justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-7">
              <h2 className="text-2xl font-bold">Shipping Details</h2>

              <div className="mt-6 space-y-3 text-sm">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {shippingInfo.fullName || "Customer Name"}
                </p>

                <p className="text-slate-600 dark:text-slate-400">
                  {shippingInfo.address || "Address not available"}
                </p>

                <p className="text-slate-600 dark:text-slate-400">
                  {[shippingInfo.city, shippingInfo.state, shippingInfo.pincode]
                    .filter(Boolean)
                    .join(", ") || "City / State / Pincode not available"}
                </p>

                <p className="text-slate-600 dark:text-slate-400">
                  {shippingInfo.phone || "Phone not available"}
                </p>
              </div>
            </div>

            <Link
              to="/my-orders"
              className="inline-block text-sm font-medium text-emerald-600 transition hover:underline dark:text-emerald-400"
            >
              View All Orders →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
