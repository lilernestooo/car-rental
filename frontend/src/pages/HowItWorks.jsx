import { Link } from "react-router-dom";
import { Shield, MapPin, ArrowRight, Search, ShieldCheck, CalendarCheck, KeyRound, Check } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

const steps = [
  {
    icon: Search,
    title: "Browse & Select",
    text: "Explore our diverse fleet and pick the vehicle that fits your journey.",
    details: [
      "Filter by vehicle type, seats, or transmission",
      "Compare daily rates side-by-side",
      "View real photos and specs before you decide",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Quick Verification",
    text: "Upload your driver's license and get verified in minutes.",
    details: [
      "Upload a valid driver's license",
      "Quick identity check, usually under 2 minutes",
      "Get notified the moment you're approved",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Secure Booking",
    text: "Confirm your dates and make a secure reservation.",
    details: [
      "Choose your pick-up and drop-off dates",
      "Pay a small reservation deposit online",
      "Receive instant booking confirmation",
    ],
  },
  {
    icon: KeyRound,
    title: "Pick Up & Drive",
    text: "Meet at our San Fernando Hub or request a delivery to your location.",
    details: [
      "Meet our team at the San Fernando Hub",
      "Or request doorstep delivery nearby",
      "Quick walkthrough, then you're on the road",
    ],
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
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            {/* Connecting vertical line running through every circle */}
            <div className="absolute left-7 top-7 bottom-7 w-px bg-border" />

            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <div className="relative flex gap-6 pb-12 last:pb-0">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-lg font-bold text-white shadow-sm">
                    {i + 1}
                  </div>

                  <div className="flex-1 rounded-2xl border border-border bg-page p-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                      <step.icon size={14} />
                      Step {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-navy">{step.title}</h3>
                    <p className="mt-2 text-muted">{step.text}</p>

                    <ul className="mt-4 space-y-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-navy/80">
                          <Check size={14} className="mt-0.5 shrink-0 text-navy" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Safety + Boundary rules */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
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
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-red-200 bg-red-50 p-8">
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
          </Reveal>
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