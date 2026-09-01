import { Link } from "react-router-dom";
import { BadgeCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StepIndicator from "../components/StepIndicator";

// Note: this reuses the same Info / Verify / Done steps as the registration
// flow (fixed from the reference mock, which mismatched labeled "Select /
// Details / Done" steps with driver's-license copy). `current={4}` marks
// the whole flow as finished, so the last circle renders a checkmark.
const STEPS = ["Info", "Verify", "Done"];

export default function VerificationSuccess() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-page to-accent-soft/60">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
          <StepIndicator steps={STEPS} current={4} />

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
            <BadgeCheck size={30} className="text-navy" />
          </div>

          <h1 className="text-2xl font-bold text-navy">Verification Successful</h1>
          <p className="mt-3 text-muted">
            Your driver&apos;s license has been successfully verified. You are
            now ready to hit the roads of Pampanga with a trusted vehicle.
          </p>

          <div className="mt-8 space-y-3">
            <Link
              to="/dashboard"
              className="block rounded-lg bg-navy py-3 font-semibold text-white hover:bg-navy-hover transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/cars"
              className="block rounded-lg border border-border py-3 font-semibold text-navy hover:border-navy transition-colors"
            >
              Browse Vehicles
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
