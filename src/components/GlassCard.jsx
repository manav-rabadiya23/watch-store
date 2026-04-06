export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/40 bg-white/70 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-slate-700/70 dark:bg-slate-900/70 ${className}`}
    >
      {children}
    </div>
  );
}
