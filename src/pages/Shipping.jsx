import PageContainer from "../components/PageContainer";
import GlassCard from "../components/GlassCard";

export default function Shipping() {
  return (
    <PageContainer
      title="Shipping Information"
      subtitle="Everything about delivery time, charges, order handling, and support."
    >
      <GlassCard className="animate-fade-up">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
            <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-white">
              Delivery Time
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Orders are usually delivered within 3 to 7 business days.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
            <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-white">
              Shipping Charges
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Free shipping on orders above ₹999. Otherwise, ₹99 shipping charge
              applies.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
            <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-white">
              Delivery Rules
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Orders are processed Monday to Saturday. Delivery timelines may
              vary on holidays.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
            <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-white">
              Support
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              For shipping help, contact support at support@watchstore.com
            </p>
          </div>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
