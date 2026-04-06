import { Link } from "react-router-dom";

export function PrimaryButton({
  children,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-emerald-600 ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButtonLink({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:hover:bg-slate-800 ${className}`}
    >
      {children}
    </Link>
  );
}
