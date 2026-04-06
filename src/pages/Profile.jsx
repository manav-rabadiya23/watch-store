import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

  return (
    <section className="min-h-screen bg-[#f7f4ef] px-4 py-10 dark:bg-slate-950 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
          {/* Top premium banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-900 px-6 py-10 text-white md:px-10 md:py-12">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-emerald-400 blur-3xl" />
              <div className="absolute right-0 top-8 h-40 w-40 rounded-full bg-cyan-400 blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 text-4xl font-bold shadow-lg backdrop-blur">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={displayName}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    firstLetter
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                    My Account
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
                    {displayName}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
                    Manage your account details, review orders, and keep your
                    watch-store profile updated.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
                      {email}
                    </span>

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        user?.emailVerified
                          ? "border border-emerald-300/20 bg-emerald-400/15 text-emerald-200"
                          : "border border-amber-300/20 bg-amber-400/15 text-amber-100"
                      }`}
                    >
                      {user?.emailVerified
                        ? "Email Verified"
                        : "Email Not Verified"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:w-[320px]">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Account Since
                  </p>
                  <p className="mt-2 text-lg font-semibold">{joinedText}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Status
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {user?.emailVerified ? "Active" : "Pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="grid gap-6 p-6 md:grid-cols-[1.25fr_0.9fr] md:p-8">
            {/* Left side */}
            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      Account Overview
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                      Personal Information
                    </h2>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <InfoCard label="Full Name" value={displayName} />
                  <InfoCard label="Email Address" value={email} />
                  <InfoCard
                    label="Verification"
                    value={user?.emailVerified ? "Verified" : "Not Verified"}
                    chip={user?.emailVerified}
                  />
                  <UidCard uid={user?.uid} />
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/50">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Quick Actions
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  Manage your store activity
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <ActionCard
                    title="My Orders"
                    desc="Track current and previous purchases."
                    onClick={() => navigate("/my-orders")}
                  />
                  <ActionCard
                    title="Wishlist"
                    desc="View saved watches and favorites."
                    onClick={() => navigate("/wishlist")}
                  />
                  <ActionCard
                    title="Continue Shopping"
                    desc="Explore premium watch collections."
                    onClick={() => navigate("/shop")}
                  />
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Account Summary
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  Membership Details
                </h2>

                <div className="mt-5 space-y-4">
                  <SummaryRow label="Display Name" value={displayName} />
                  <SummaryRow label="Primary Email" value={email} />
                  <SummaryRow
                    label="Verified"
                    value={user?.emailVerified ? "Yes" : "No"}
                  />
                  <SummaryRow
                    label="Provider"
                    value={user?.providerData?.[0]?.providerId || "password"}
                  />
                </div>
              </div>

              <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 dark:border-red-500/20 dark:bg-red-500/10">
                <p className="text-xs uppercase tracking-[0.22em] text-red-500 dark:text-red-300">
                  Session
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                  Sign out securely
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Sign out from your account on this device when you are done.
                </p>

                <button
                  onClick={handleLogout}
                  className="mt-5 w-full rounded-2xl bg-red-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ label, value, chip = false }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        {label}
      </p>

      {chip ? (
        <div className="mt-3">
          <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {value}
          </span>
        </div>
      ) : (
        <p className="mt-3 break-all text-lg font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      )}
    </div>
  );
}

function UidCard({ uid }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        User ID
      </p>
      <div className="mt-3 rounded-xl bg-slate-100 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <span className="break-all">{uid}</span>
      </div>
    </div>
  );
}

function ActionCard({ title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
    </button>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="max-w-[60%] break-all text-right text-sm font-semibold text-slate-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}
