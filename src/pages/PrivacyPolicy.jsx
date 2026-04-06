export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f7f4ef] px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-6 text-3xl font-bold text-slate-800 dark:text-white">
          Privacy Policy
        </h1>

        <div className="space-y-5 text-slate-600 dark:text-slate-300">
          <p>
            We collect your basic order information such as name, address,
            email, and phone number to process purchases.
          </p>
          <p>We do not sell your personal data to third parties.</p>
          <p>
            Your payment details are handled securely by supported payment
            services.
          </p>
          <p>
            We use local storage in the browser to improve your shopping
            experience, including cart and wishlist data.
          </p>
        </div>
      </div>
    </div>
  );
}
