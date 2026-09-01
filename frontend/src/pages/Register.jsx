import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, UploadCloud } from "lucide-react";
import FormField from "../components/FormField";
import StepIndicator from "../components/StepIndicator";

const STEPS = ["Info", "Verify", "Done"];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    licenseFile: null,
  });

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    // Backend wiring goes here later (upload license, send OTP, etc).
    navigate("/verification-success");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-navy">Transpoza</h1>
          <p className="mt-2 text-muted">Create your account</p>
        </div>

        <StepIndicator steps={STEPS} current={step} />

        {step === 1 && (
          <form onSubmit={handleInfoSubmit} className="space-y-5">
            <FormField
              id="fullName"
              label="Full Name"
              type="text"
              placeholder="Juan Dela Cruz"
              value={form.fullName}
              onChange={handleChange("fullName")}
              required
            />
            <FormField
              id="email"
              label="Email Address"
              type="email"
              placeholder="juan@example.com"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
            <FormField
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="+63 900 000 0000"
              value={form.phone}
              onChange={handleChange("phone")}
              required
            />
            <FormField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange("password")}
              required
            />

            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 font-medium text-navy hover:gap-3 transition-all"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifySubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Driver&apos;s License
              </label>
              <label
                htmlFor="licenseFile"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-white px-4 py-8 text-center text-sm text-muted hover:border-navy hover:text-navy transition-colors"
              >
                <UploadCloud size={22} />
                {form.licenseFile ? form.licenseFile : "Upload a clear photo of your license"}
                <input
                  id="licenseFile"
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      licenseFile: e.target.files?.[0]?.name ?? null,
                    }))
                  }
                />
              </label>
            </div>

            <FormField
              id="otp"
              label="Verification Code"
              type="text"
              inputMode="numeric"
              placeholder="6-digit code sent to your email"
              required
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-medium text-muted hover:text-navy"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 font-medium text-navy hover:gap-3 transition-all"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-navy">
          <Link to="/login" className="hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
