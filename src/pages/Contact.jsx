import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = `Hello M.wat_ches,

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`;

    window.open(
      `https://wa.me/918200833181?text=${encodeURIComponent(text)}`,
      "_blank",
    );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="bg-[#f7f4ef] px-4 py-10 sm:px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
              Contact Us
            </p>

            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl md:text-5xl">
              We’d love to hear from you
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Have a question about our watches, your order, or our collection?
              Reach out anytime and we’ll be happy to help.
            </p>

            <div className="mt-8 space-y-5">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  Email
                </p>
                <a
                  href="mailto:mrwatches23@gmail.com"
                  className="mt-2 inline-block text-lg font-semibold text-slate-900 transition hover:text-emerald-800"
                >
                  mrwatches23@gmail.com
                </a>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/m.wat_ches/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-lg font-semibold text-slate-900 transition hover:text-emerald-800"
                >
                  @m.wat_ches
                </a>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/918200833181"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-lg font-semibold text-slate-900 transition hover:text-emerald-800"
                >
                  +91 82008 33181
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              Send us a message
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill in the details below and connect with M.wat_ches.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>

                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800"
              >
                Send now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
