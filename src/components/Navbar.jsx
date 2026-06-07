import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
    } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full`;

  const badgeClass =
    "ml-2 inline-flex min-w-[18px] items-center justify-center rounded-full bg-emerald-600 px-2 py-[2px] text-[10px] font-semibold text-white";

  const mobileLink =
    "rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-emerald-600";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-4 md:px-6 md:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-xl border border-slate-200 bg-[#f7f1e8] p-1.5 sm:p-2">
              <img
                src={logo}
                alt="logo"
                className="h-6 w-8 object-contain sm:h-8 sm:w-11 md:h-11 md:w-14"
              />
            </div>

            <div className="leading-tight">
              <h1 className="text-[12px] font-semibold text-slate-900 sm:text-[15px] md:text-[22px]">
                M.wat_ches
              </h1>
              <p className="text-[8px] text-slate-500 sm:text-[10px] md:text-sm">
                Modern watch store
              </p>
            </div>
          </Link>

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
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
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
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/wishlist" className="relative p-2 text-sm">
              ♥
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-emerald-600 px-1 text-[9px] text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-sm">
              🛒
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-emerald-600 px-1 text-[9px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-2 transition hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3">
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
                    className="rounded-xl bg-red-500 px-3 py-2 text-white transition hover:bg-red-600"
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
                    className="rounded-xl bg-slate-900 px-3 py-2 text-white transition hover:bg-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
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
