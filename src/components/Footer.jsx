import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import logo from "../assets/logo.png";

export default function Footer() {
  const linkStyle =
    "relative inline-block w-fit text-slate-700 transition duration-300 hover:text-emerald-800 dark:text-slate-300 dark:hover:text-emerald-400 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-emerald-800 dark:after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full";

  const titleStyle =
    "text-[12px] font-semibold uppercase tracking-[0.28em] text-slate-900 dark:text-white";

  return (
    <footer className="border-t border-[#e4dacd] bg-[#F2ECE3] transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10 md:py-12">
        <div className="mb-8 text-center md:mb-10">
          <div className="mb-3 inline-flex rounded-2xl border border-slate-200 bg-[#f7f1e8] p-2 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
            <img
              src={logo}
              alt="M.wat_ches logo"
              className="h-14 w-20 object-contain"
            />
          </div>

          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-white md:text-xl">
            M.wat_ches
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Modern watch store
          </p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
            Premium watches crafted for modern style, clean elegance, and
            everyday confidence.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center md:hidden">
          <div>
            <h3 className={titleStyle}>Quick</h3>
            <div className="mt-3 flex flex-col items-center gap-2 text-sm">
              <Link to="/" className={linkStyle}>
                Home
              </Link>
              <Link to="/shop" className={linkStyle}>
                Shop
              </Link>
              <Link to="/wishlist" className={linkStyle}>
                Wishlist
              </Link>
              <Link to="/cart" className={linkStyle}>
                Cart
              </Link>
            </div>
          </div>

          <div>
            <h3 className={titleStyle}>Store</h3>
            <div className="mt-3 flex flex-col items-center gap-2 text-sm">
              <Link to="/about" className={linkStyle}>
                About
              </Link>
              <Link to="/contact" className={linkStyle}>
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className={titleStyle}>Connect</h3>
            <div className="mt-3 flex flex-col items-center gap-2 text-sm">
              <a
                href="https://www.instagram.com/m.wat_ches/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-700 transition hover:text-emerald-800 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                <FaInstagram className="text-lg text-pink-600" />
                Instagram
              </a>

              <a
                href="mailto:mrwatches23@gmail.com"
                className="flex items-center gap-2 text-slate-700 transition hover:text-emerald-800 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                <SiGmail className="text-lg text-red-500" />
                Gmail
              </a>
            </div>
          </div>
        </div>

        <div className="hidden gap-8 text-center md:grid md:grid-cols-4 md:text-left">
          <div>
            <h3 className={titleStyle}>Quick Links</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/" className={linkStyle}>
                Home
              </Link>
              <Link to="/shop" className={linkStyle}>
                Shop
              </Link>
              <Link to="/wishlist" className={linkStyle}>
                Wishlist
              </Link>
              <Link to="/cart" className={linkStyle}>
                Cart
              </Link>
            </div>
          </div>

          <div>
            <h3 className={titleStyle}>Store</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/about" className={linkStyle}>
                About Us
              </Link>
              <Link to="/contact" className={linkStyle}>
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className={titleStyle}>Connect</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a
                href="https://www.instagram.com/m.wat_ches/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-700 transition hover:text-emerald-800 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                <FaInstagram className="text-lg text-pink-600" />
                Instagram
              </a>

              <a
                href="mailto:mrwatches23@gmail.com"
                className="flex items-center gap-2 text-slate-700 transition hover:text-emerald-800 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                <SiGmail className="text-lg text-red-500" />
                Gmail
              </a>
            </div>
          </div>

          <div>
            <h3 className={titleStyle}>Support</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              We are here to help you discover the right watch with confidence
              and style.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <p>© {new Date().getFullYear()} M.wat_ches. All rights reserved.</p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/privacy"
              className="text-slate-600 transition hover:text-emerald-700 hover:underline dark:text-slate-300 dark:hover:text-emerald-400"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-slate-600 transition hover:text-emerald-700 hover:underline dark:text-slate-300 dark:hover:text-emerald-400"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
