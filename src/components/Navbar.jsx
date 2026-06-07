import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  PackageCheck,
  Info,
  Phone,
  Heart,
  ShoppingCart,
  UserRound,
  LogOut,
  LogIn,
  Watch,
} from "lucide-react";

import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity || 1),
    0,
  );

  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const closeMenu = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("touchstart", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("touchstart", closeMenu);
    };
  }, []);

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
    `relative px-2 py-2 text-[15px] font-semibold tracking-wide transition duration-300 ${
      isActive
        ? "text-emerald-700 after:w-full"
        : "text-slate-600 hover:text-slate-950 after:w-0 hover:after:w-full"
    } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:rounded-full after:bg-emerald-700 after:transition-all after:duration-300`;

  return (
    <>
      <header
        ref={navbarRef}
        className="fixed left-0 top-0 z-[9999] w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-3 py-2 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="min-w-0">
                <h1 className="font-serif text-[22px] font-black tracking-tight text-slate-950 sm:text-3xl">
                  M.watches
                </h1>

                <p className="text-[11px] font-semibold tracking-[0.14em] text-emerald-700 sm:text-xs">
                  NEW WATCH STORE
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
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
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <IconButton to="/wishlist" label="Wishlist" count={wishlistCount}>
                <Heart size={19} />
              </IconButton>

              <IconButton to="/cart" label="Cart" count={cartCount}>
                <ShoppingCart size={19} />
              </IconButton>

              {user && (
                <IconButton to="/profile" label="Profile">
                  <UserRound size={19} />
                </IconButton>
              )}

              <div className="hidden lg:block">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="rounded-full bg-red-500 px-6 py-3 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-red-600"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700"
                  >
                    Login
                  </Link>
                )}
              </div>

              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-100 sm:h-11 sm:w-11 lg:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="absolute right-3 top-[76px] w-[230px] rounded-[26px] border border-slate-200 bg-white p-2.5 shadow-2xl sm:right-5 sm:top-[84px] lg:hidden">
              <nav className="flex flex-col gap-1">
                <MobileLink
                  icon={Home}
                  text="Home"
                  to="/"
                  close={() => setIsMenuOpen(false)}
                />
                <MobileLink
                  icon={ShoppingBag}
                  text="Shop"
                  to="/shop"
                  close={() => setIsMenuOpen(false)}
                />
                <MobileLink
                  icon={PackageCheck}
                  text="My Orders"
                  to="/my-orders"
                  close={() => setIsMenuOpen(false)}
                />
                <MobileLink
                  icon={Info}
                  text="About"
                  to="/about"
                  close={() => setIsMenuOpen(false)}
                />
                <MobileLink
                  icon={Phone}
                  text="Contact"
                  to="/contact"
                  close={() => setIsMenuOpen(false)}
                />

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="mt-1 flex items-center gap-3 rounded-2xl bg-red-50 px-3.5 py-2.5 text-left text-sm font-bold text-red-600 transition hover:bg-red-100"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                ) : (
                  <MobileLink
                    icon={LogIn}
                    text="Login"
                    to="/login"
                    close={() => setIsMenuOpen(false)}
                  />
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <div className="h-[78px] sm:h-[88px]" />
    </>
  );
}

function IconButton({ to, label, count, children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700 sm:h-11 sm:w-11"
    >
      {children}

      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-black text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

function MobileLink({ icon: Icon, text, to, close }) {
  return (
    <Link
      to={to}
      onClick={close}
      className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
    >
      <Icon size={17} />
      {text}
    </Link>
  );
}
