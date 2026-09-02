import { Link } from "react-router-dom";
import { MapPin, Map, Wallet, Headset, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import heroImage from "../assets/pampanga-pic.jpg";
import sedanImage from "../assets/sedan.jpg";
import suvImage from "../assets/SUV.jpg";
import viosImage from "../assets/vios.jpg";

const vehicles = [
  {
    name: "Economy Sedan",
    badge: "Petrol",
    description: "Perfect for city errands in San Fernando.",
    price: "₱1,500",
    image: sedanImage,
  },
  {
    name: "Family SUV",
    badge: "7 Seats",
    description: "Spacious comfort for longer trips up North.",
    price: "₱3,200",
    image: suvImage,
  },
  {
    name: "Toyota Vios",
    badge: "Petrol",
    description: "Easy to park, easy on fuel for quick trips around town.",
    price: "₱1,300",
    image: viosImage,
  },
];

const perks = [
  {
    icon: Map,
    title: "Local San Fernando Experts",
    text: "We know Pampanga. Navigate local routes with confidence, backed by our extensive knowledge of San Fernando and surrounding municipalities.",
  },
  {
    icon: Wallet,
    title: "Simple Pricing",
    text: "No hidden fees. Transparent daily rates designed for local travel. What you see is what you pay.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    text: "Questions on the road or during booking? Our San Fernando team is a call away, any hour of the day.",
  },
];


export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
     <Navbar />
      <div className="h-1 w-full bg-black" />

      {/* Hero */}

      {/* Hero */}
     <section className="relative">
  <div className="relative h-[520px] w-full overflow-hidden border-x-2 border-b-2 border-black sm:h-[560px]">
        <img
          src={heroImage}
          alt="Aerial view of San Fernando, Pampanga at dusk"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/35 to-navy/10" />
          <div className="absolute inset-x-0 top-16 px-6 sm:top-20">
            <div className="mx-auto max-w-6xl">
              <div className="group relative inline-block">
                <span className="pointer-events-none absolute -left-3 -top-3 h-10 w-10 border-l-2 border-t-2 border-white/70 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out group-hover:-translate-x-1.5 group-hover:-translate-y-1.5" />
                <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-5xl transition-all duration-300 ease-out group-hover:tracking-wide group-hover:text-accent-soft">
                  Professional Vehicle Logistics in San Fernando
                </h1>
               <span className="pointer-events-none absolute -bottom-3 -left-3 h-10 w-10 border-b-2 border-l-2 border-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out group-hover:-translate-x-1.5 group-hover:translate-y-1.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Search card — overlaps the hero and the section below */}
        <div className="relative z-10 mx-auto -mt-24 max-w-5xl px-6 sm:-mt-16">
          <form className="grid gap-4 rounded-2xl border-2 border-black bg-card p-6 shadow-lg sm:grid-cols-[1.1fr_1.2fr_1.2fr_auto] sm:items-end">
            <div>
              <label htmlFor="pickupLocation" className="mb-1.5 block text-sm font-medium text-navy">
                Pick-up Location
              </label>
              <div className="relative">
                <MapPin size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  id="pickupLocation"
                  type="text"
                  defaultValue="San Fernando, Pampanga"
                  className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-3 text-navy focus:outline-none focus:ring-2 focus:ring-navy/15 focus:border-navy transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pickupDate" className="mb-1.5 block text-sm font-medium text-navy">
                Pick-up Date &amp; Time
              </label>
              <input
                id="pickupDate"
                type="datetime-local"
                className="w-full rounded-lg border border-border bg-white py-2.5 px-3 text-navy focus:outline-none focus:ring-2 focus:ring-navy/15 focus:border-navy transition-colors"
              />
            </div>

            <div>
              <label htmlFor="dropoffDate" className="mb-1.5 block text-sm font-medium text-navy">
                Drop-off Date &amp; Time
              </label>
              <input
                id="dropoffDate"
                type="datetime-local"
                className="w-full rounded-lg border border-border bg-white py-2.5 px-3 text-navy focus:outline-none focus:ring-2 focus:ring-navy/15 focus:border-navy transition-colors"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-navy px-6 py-2.5 font-semibold text-white hover:bg-navy-hover transition-colors"
            >
              Search Vehicles
            </button>
          </form>
        </div>
      </section>

      {/* Why book with us */}
      <section className="mx-auto mt-16 max-w-6xl px-6 sm:mt-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Why Book With Us</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            Reliable vehicles, honest pricing, and support that actually
            picks up the phone.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">

          {perks.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 120}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy/30 hover:shadow-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white">
                  <perk.icon size={20} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-navy">{perk.title}</h3>
                <p className="mt-2 text-muted">{perk.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured vehicles */}
  <section className="mx-auto mb-24 mt-16 max-w-6xl px-6">
  <div className="relative mb-10 text-center">
    <h2 className="text-2xl font-bold text-navy sm:text-3xl">Featured Vehicles</h2>
    <Link
      to="/cars"
      className="absolute right-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 text-sm font-semibold text-navy hover:gap-2.5 transition-all"
    >
      View All Vehicles
      <ArrowRight size={16} />
    </Link>
  </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((car, i) => (
            <Reveal key={car.name} delay={i * 120}>
              <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy/30 hover:shadow-xl">
                <img
                  src={car.image}
                  alt={car.name}
                  className="aspect-video w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-navy">{car.name}</h3>
                    <span className="whitespace-nowrap rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-navy">
                      {car.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{car.description}</p>

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-lg font-bold text-navy">
                      {car.price} <span className="text-sm font-normal text-muted">/day</span>
                    </p>
                    <Link
                      to="/cars"
                      className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-navy hover:border-navy transition-colors"
                    >
                      Select
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}