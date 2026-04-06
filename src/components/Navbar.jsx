import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity || 1),
    0,
  );

  const wishlistCount = wishlistItems.length;

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `relative inline-block text-sm font-medium transition duration-300 ${
      isActive
        ? "text-slate-900 dark:text-white"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
    } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full`;

  const badgeClass =
    "ml-2 inline-flex min-w-[18px] items-center justify-center rounded-full bg-emerald-600 px-2 py-[2px] text-[10px] font-semibold text-white";

  const mobileLink =
    "rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-emerald-400";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75">
      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-4 md:px-6 md:py-4">
        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-3">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-xl border border-slate-200 bg-[#f7f1e8] p-1.5 sm:p-2 dark:border-slate-800 dark:bg-slate-900">
              <img
                src={logo}
                alt="logo"
                className="h-6 w-8 object-contain sm:h-8 sm:w-11 md:h-11 md:w-14"
              />
            </div>

            <div className="leading-tight">
              <h1 className="text-[12px] font-semibold text-slate-900 dark:text-white sm:text-[15px] md:text-[22px]">
                M.wat_ches
              </h1>
              <p className="text-[8px] text-slate-500 dark:text-slate-400 sm:text-[10px] md:text-sm">
                Modern watch store
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-6 lg:flex">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
            <NavLink to="/my-orders" className={navLinkClass}>
              My Orders
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

            <NavLink to="/wishlist" className={navLinkClass}>
              Wishlist
              {wishlistCount > 0 && (
                <span className={badgeClass}>{wishlistCount}</span>
              )}
            </NavLink>

            <NavLink to="/cart" className={navLinkClass}>
              Cart
              {cartCount > 0 && <span className={badgeClass}>{cartCount}</span>}
            </NavLink>

            {user ? (
              <>
                <NavLink to="/profile" className={navLinkClass}>
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>

                <Link
                  to="/signup"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 dark:bg-white dark:text-slate-900"
                >
                  Signup
                </Link>
              </>
            )}

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* MOBILE ICONS */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/wishlist" className="relative p-2 text-sm">
              ♥
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] bg-emerald-600 text-white px-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-sm">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] bg-emerald-600 text-white px-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button onClick={toggleTheme} className="p-2">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="mt-3 rounded-2xl border bg-white p-3 dark:bg-slate-950">
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className={mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/my-orders"
                className={mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </Link>
              <Link
                to="/about"
                className={mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/wishlist"
                className={mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist ({wishlistCount})
              </Link>
              <Link
                to="/cart"
                className={mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({cartCount})
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className={mobileLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-2 rounded-xl"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={mobileLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-slate-900 text-white px-3 py-2 rounded-xl"
                  >
                    Signup
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
