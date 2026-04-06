import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, resendVerification } = useAuth();

  const from = location.state?.from?.pathname || "/profile";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (!result.user.emailVerified) {
        setInfo(
          "Your email is not verified yet. Please check your inbox. You can still continue for now, or verify first.",
        );
      }

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);

      let message = "Failed to login. Please try again.";

      if (err.code === "auth/invalid-credential") {
        message = "Invalid email or password.";
      } else if (err.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (err.code === "auth/wrong-password") {
        message = "Wrong password.";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Too many attempts. Please try again later.";
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setInfo("");
    setGoogleLoading(true);

    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google login error:", err);

      let message = "Google login failed. Please try again.";

      if (err.code === "auth/popup-closed-by-user") {
        message = "Google login popup was closed before completing sign in.";
      } else if (err.code === "auth/popup-blocked") {
        message =
          "Popup was blocked by browser. Please allow popups and try again.";
      } else if (err.code === "auth/unauthorized-domain") {
        message = "This domain is not authorized in Firebase.";
      } else if (err.code === "auth/operation-not-allowed") {
        message = "Google sign-in is not enabled in Firebase.";
      }

      setError(message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerification();
      setInfo("Verification email sent again. Please check your inbox.");
    } catch (err) {
      console.error("Resend verification error:", err);
      setError("Could not resend verification email right now.");
    }
  };

  return (
    <section className="min-h-screen bg-[#f7f4ef] px-4 py-12 dark:bg-slate-950 sm:px-6 md:px-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Welcome Back
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
              Login to your account
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Access your profile, cart, checkout, and orders.
            </p>
          </div>

          {error ? (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </div>
          ) : null}

          {info ? (
            <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <p>{info}</p>
              <button
                type="button"
                onClick={handleResendVerification}
                className="mt-2 font-semibold underline underline-offset-4"
              >
                Resend verification email
              </button>
            </div>
          ) : null}

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-emerald-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              or
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition duration-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            {googleLoading ? "Please wait..." : "Continue with Google"}
          </button>

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-300">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
