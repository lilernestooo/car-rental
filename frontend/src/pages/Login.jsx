import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import FormField from "../components/FormField";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend wiring goes here later (auth API call).
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-navy">Pampanga Rental</h1>
          <p className="mt-2 text-muted">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField
            id="email"
            label="Email Address"
            icon={Mail}
            type="email"
            placeholder="juan.delacruz@example.com"
            value={form.email}
            onChange={handleChange("email")}
            required
          />

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-navy">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-navy hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange("password")}
                required
                className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-11 text-navy placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-navy/15 focus:border-navy transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-navy"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-navy">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm((prev) => ({ ...prev, remember: e.target.checked }))}
              className="h-4 w-4 rounded border-border text-navy focus:ring-navy/20"
            />
            Remember me
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy py-3 font-semibold text-white hover:bg-navy-hover transition-colors"
          >
            Sign In
            <LogIn size={18} />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-navy">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      <Link
        to="/"
        className="mt-6 flex items-center gap-2 text-sm text-muted hover:text-navy"
      >
        <ArrowLeft size={16} />
        Return to Pampanga Rental Home
      </Link>
    </div>
  );
}
