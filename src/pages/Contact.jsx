export default function Contact() {
  return (
    <section className="bg-[#f7f4ef] px-4 py-10 sm:px-6 md:px-10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Contact Us
            </p>

            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-white sm:text-3xl md:text-5xl">
              We’d love to hear from you
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              Have a question about our watches, your order, or our collection?
              Reach out anytime and we’ll be happy to help.
            </p>

            <div className="mt-8 space-y-5">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <a
                  href="mailto:mrwatches23@gmail.com"
                  className="mt-2 inline-block text-lg font-semibold text-slate-900 transition hover:text-emerald-800 dark:text-white dark:hover:text-emerald-400"
                >
                  mrwatches23@gmail.com
                </a>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/m.wat_ches/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-lg font-semibold text-slate-900 transition hover:text-emerald-800 dark:text-white dark:hover:text-emerald-400"
                >
                  @m.wat_ches
                </a>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Support
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  We can help with product details, order support, and general
                  inquiries about our watch collection.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Fill in the details below and connect with M.wat_ches.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-emerald-900/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-emerald-900/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  rows="6"
                  placeholder="Write your message here..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-emerald-900/30"
                />
              </div>

              <button
                type="submit"
                className="inline-flex rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
