import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User,
  ShoppingBag,
  Heart,
  FileDown,
  LogOut,
  MailCheck,
  ShieldCheck,
  Store,
  CalendarDays,
  ChevronRight,
  Sparkles,
  Gift,
  LockKeyhole,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { generateInvoice } from "../utils/generateInvoice";

export default function Profile() {
  const { user, logout, resendVerification } = useAuth();
  const navigate = useNavigate();

  const [logoutLoading, setLogoutLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  if (!user) {
    return (
      <section className="min-h-screen bg-[#f8f4ee] px-4 py-12 font-sans">
        <div className="mx-auto max-w-md rounded-[32px] bg-white p-8 text-center shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 text-white">
            <User size={34} />
          </div>

          <h1 className="mt-5 text-3xl font-black text-slate-950">
            Login Required
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to view your orders, wishlist and invoice.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-7 rounded-2xl bg-slate-950 px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-emerald-700"
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  const displayName = user?.displayName || "User";
  const email = user?.email || "No email";

  const firstLetter =
    displayName?.charAt(0)?.toUpperCase() ||
    email?.charAt(0)?.toUpperCase() ||
    "U";

  const joinedText = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Recently";

  const handleLogout = async () => {
    setLogoutLoading(true);

    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setVerifyLoading(true);

    try {
      await resendVerification();
      toast.success("Verification email sent");
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Could not send verification email");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");

      if (!orders.length) {
        toast.error("No orders found for invoice");
        return;
      }

      const latestOrder = orders[orders.length - 1];

      await generateInvoice({
        orderId: latestOrder.id || latestOrder.orderId || "ORDER",
        date:
          latestOrder.date ||
          latestOrder.createdAt ||
          new Date().toLocaleDateString("en-IN"),
        customer: {
          name: displayName,
          email,
          phone: latestOrder.customer?.phone || latestOrder.phone || "-",
          address: latestOrder.customer?.address || latestOrder.address || "-",
          city: latestOrder.customer?.city || latestOrder.city || "-",
          pincode: latestOrder.customer?.pincode || latestOrder.pincode || "-",
        },
        items: latestOrder.items || [],
        subtotal: latestOrder.subtotal || latestOrder.total || 0,
        shipping: latestOrder.shipping || 0,
        gstAmount: latestOrder.gstAmount || 0,
        total: latestOrder.total || 0,
        paymentMethod: latestOrder.paymentMethod || "Cash on Delivery",
      });

      toast.success("Invoice downloaded");
    } catch (error) {
      console.error("Invoice download failed:", error);
      toast.error("Could not download invoice");
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f4ee] px-4 py-8 font-sans md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#11122b] via-[#14233c] to-[#1fa173] p-6 text-white shadow-[0_25px_80px_rgba(15,23,42,0.22)] md:p-8">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />
          <div className="absolute right-40 top-0 hidden h-full w-72 rotate-12 border-l border-white/10 md:block" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white/90 text-4xl font-black text-emerald-900 shadow-xl">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    firstLetter
                  )}
                </div>

                <span className="absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-white bg-emerald-500" />
              </div>

              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-purple-200">
                  Welcome back <Sparkles size={16} />
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                  {displayName}
                </h1>

                <p className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur">
                  <MailCheck size={16} />
                  <span className="break-all">{email}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="flex w-fit items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <Store size={19} />
              Continue Shopping
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="rounded-[32px] bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
            <div className="space-y-3">
              <MenuButton
                icon={ShoppingBag}
                title="My Orders"
                subtitle="View order history"
                color="emerald"
                onClick={() => navigate("/my-orders")}
              />

              <MenuButton
                icon={Heart}
                title="Wishlist"
                subtitle="Saved products"
                color="purple"
                onClick={() => navigate("/wishlist")}
              />

              <MenuButton
                icon={FileDown}
                title="Download Invoice"
                subtitle="Latest order invoice"
                color="cyan"
                onClick={handleDownloadInvoice}
              />

              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="group flex w-full items-center justify-between rounded-3xl px-3 py-4 text-left transition hover:bg-red-50 disabled:opacity-60"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <LogOut size={22} />
                  </span>

                  <span>
                    <span className="block text-base font-black text-red-600">
                      {logoutLoading ? "Logging out..." : "Logout"}
                    </span>
                    <span className="text-sm text-slate-500">
                      Sign out securely
                    </span>
                  </span>
                </span>

                <ChevronRight
                  size={19}
                  className="text-slate-400 transition group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="mt-7 rounded-[28px] bg-gradient-to-br from-emerald-100 via-cyan-50 to-purple-100 p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-md">
                <Gift className="text-emerald-700" size={30} />
              </div>

              <h3 className="mt-4 text-lg font-black text-slate-950">
                Love shopping with us?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore new arrivals and exclusive offers.
              </p>

              <button
                onClick={() => navigate("/shop")}
                className="mt-5 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-emerald-700"
              >
                Shop Now
              </button>
            </div>
          </aside>

          <main className="rounded-[32px] bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:p-8">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-700">
                  Account Details
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                  Personal Information
                </h2>
              </div>

              <StatusBadge verified={user.emailVerified} />
            </div>

            {!user.emailVerified && (
              <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="font-black text-amber-900">
                  Email verification pending
                </h3>

                <p className="mt-1 text-sm text-amber-700">
                  Verify your email to keep your account secure.
                </p>

                <button
                  onClick={handleResendVerification}
                  disabled={verifyLoading}
                  className="mt-4 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-black text-white transition hover:bg-amber-600 disabled:opacity-60"
                >
                  {verifyLoading ? "Sending..." : "Resend Verification Email"}
                </button>
              </div>
            )}

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <ProfileField
                icon={User}
                label="Full Name"
                value={displayName}
                bg="from-emerald-50 to-slate-50"
                iconColor="text-emerald-700"
              />

              <ProfileField
                icon={MailCheck}
                label="Email Address"
                value={email}
                bg="from-purple-50 to-slate-50"
                iconColor="text-purple-700"
              />

              <ProfileField
                icon={ShieldCheck}
                label="Account Status"
                value={user.emailVerified ? "Active" : "Pending"}
                bg="from-orange-50 to-slate-50"
                iconColor="text-orange-600"
              />

              <ProfileField
                icon={CalendarDays}
                label="Account Since"
                value={joinedText}
                bg="from-sky-50 to-slate-50"
                iconColor="text-sky-600"
              />
            </div>

            <div className="mt-7 rounded-[28px] bg-gradient-to-r from-emerald-50 via-cyan-50 to-sky-50 p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
                    <Sparkles className="text-slate-950" size={24} />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-950">
                      Thanks for being with us!
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Enjoy a smooth and secure shopping experience.
                    </p>
                  </div>
                </div>

                <Gift className="hidden text-emerald-600 md:block" size={52} />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                <LockKeyhole size={18} className="text-emerald-700" />
                Your data is safe and secure with us.
              </p>

              <button className="text-sm font-black text-emerald-700">
                Need help? Contact Support
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

function MenuButton({ icon: Icon, title, subtitle, color, onClick }) {
  const colors = {
    emerald: "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600",
    purple: "bg-purple-100 text-purple-700 group-hover:bg-purple-600",
    cyan: "bg-cyan-100 text-cyan-700 group-hover:bg-cyan-600",
  };

  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-3xl px-3 py-4 text-left transition hover:bg-slate-50"
    >
      <span className="flex items-center gap-4">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:text-white ${colors[color]}`}
        >
          <Icon size={22} />
        </span>

        <span>
          <span className="block text-base font-black text-slate-950">
            {title}
          </span>
          <span className="text-sm text-slate-500">{subtitle}</span>
        </span>
      </span>

      <ChevronRight
        size={19}
        className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700"
      />
    </button>
  );
}

function StatusBadge({ verified }) {
  return (
    <span
      className={`flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-black ${
        verified
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {verified ? <MailCheck size={18} /> : <ShieldCheck size={18} />}
      {verified ? "Email Verified" : "Email Not Verified"}
    </span>
  );
}

function ProfileField({ icon: Icon, label, value, bg, iconColor }) {
  return (
    <div
      className={`group rounded-[28px] bg-gradient-to-br ${bg} p-6 transition hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-md">
          <Icon size={25} className={iconColor} />
        </span>

        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">
          {label}
        </p>
      </div>

      <p className="mt-5 break-all text-lg font-black text-slate-950">
        {value}
      </p>
    </div>
  );
}
