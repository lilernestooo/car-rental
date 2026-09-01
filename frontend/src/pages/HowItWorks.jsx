import { Link } from "react-router-dom";
import { Shield, MapPin, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const steps = [
  {
    title: "Browse & Select",
    text: "Explore our diverse fleet and pick the vehicle that fits your journey.",
  },
  {
    title: "Quick Verification",
    text: "Upload your driver's license and get verified in minutes.",
  },
  {
    title: "Secure Booking",
    text: "Confirm your dates and make a secure reservation.",
  },
  {
    title: "Pick Up & Drive",
    text: "Meet at our San Fernando Hub or request a delivery to your location.",
  },
];

export default function HowItWorks() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Navbar />

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <h1 className="text-4xl font-extrabold text-navy sm:text-5xl">
          How Pampanga Rental Works
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Renting a car in San Fernando and Northern Luzon has never been
          easier. Follow our simple 4-step process to get on the road.
        </p>
      </section>

      {/* Steps */}
      <section className="bg-card px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="mb-5 flex items-center justify-center">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold ${
                      i === 0 ? "bg-navy text-white" : "bg-accent-soft text-navy/70"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="ml-4 hidden h-px flex-1 bg-border sm:block" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety + Boundary rules */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3">
              <Shield size={22} className="text-navy" />
              <h3 className="text-xl font-semibold text-navy">
                Safety &amp; Insurance First
              </h3>
            </div>
            <p className="mt-4 text-muted">
              Every rental includes comprehensive insurance coverage
              standard. Our fleet undergoes rigorous maintenance checks
              before every dispatch to ensure your journey through
              Northern Luzon is safe and reliable.
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
            <div className="flex items-center gap-3">
              <MapPin size={22} className="text-red-600" />
              <h3 className="text-xl font-semibold text-red-700">
                Boundary Rules
              </h3>
            </div>
            <p className="mt-4 text-red-700/90">
              Please note that standard rentals are optimized for the San
              Fernando and wider Pampanga region. Trips beyond Northern
              Luzon may require special authorization.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent-soft/40 px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
          Ready to start your journey?
        </h2>
        <Link
          to="/cars"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-hover transition-colors"
        >
          Browse Fleet
          <ArrowRight size={18} />
        </Link>
      </section>

      <Footer />
    </div>
  );
}