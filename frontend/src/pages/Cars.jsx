import { Users, Settings2, Fuel } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarImagePlaceholder from "../components/CarImagePlaceholder";
import viosImage from "../assets/vios.jpg";
import fortunerImage from "../assets/SUV.jpg";

const categories = ["All Vehicles", "SUV", "Sedan", "Van", "Pickup"];
const transmissions = ["Any", "Automatic", "Manual"];

const fleet = [
  {
    name: "Toyota Vios",
    category: "Sedan",
    year: "2023 Model",
    seats: "5 Seats",
    transmission: "Automatic",
    fuel: "Gas",
    price: "₱2,500",
    image: viosImage,
  },
  {
    name: "Toyota Fortuner",
    category: "SUV",
    year: "2024 Model",
    seats: "7 Seats",
    transmission: "Automatic",
    fuel: "Diesel",
    price: "₱4,500",
    image: fortunerImage,
  },
  {
    name: "Toyota Innova",
    category: "MPV",
    year: "2023 Model",
    seats: "7 Seats",
    transmission: "Automatic",
    fuel: "Diesel",
    price: "₱3,500",
    image: null, // no photo yet — swap in once available
  },
  {
    name: "Toyota Hiace",
    category: "Van",
    year: "2022 Model",
    seats: "15 Seats",
    transmission: "Manual",
    fuel: "Diesel",
    price: "₱5,000",
    image: null, // no photo yet — swap in once available
  },
];

export default function Cars() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <h1 className="text-4xl font-extrabold text-navy">Explore Our Fleet</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Premium vehicles for San Fernando and Northern Luzon travel.
          Reliable, clean, and ready for your journey.
        </p>

        <div className="mt-8 grid gap-8 border-t border-border pt-8 lg:grid-cols-[240px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-navy">Filters</h2>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-navy">Vehicle Category</h3>
              <div className="mt-3 space-y-3">
                {categories.map((label, i) => (
                  <label key={label} className="flex items-center gap-2 text-sm text-navy">
                    <input
                      type="checkbox"
                      defaultChecked={i === 0}
                      className="h-4 w-4 rounded border-border text-navy focus:ring-navy/20"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <h3 className="text-sm font-medium text-navy">Transmission</h3>
              <div className="mt-3 space-y-3">
                {transmissions.map((label, i) => (
                  <label key={label} className="flex items-center gap-2 text-sm text-navy">
                    <input
                      type="radio"
                      name="transmission"
                      defaultChecked={i === 0}
                      className="h-4 w-4 border-border text-navy focus:ring-navy/20"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Fleet grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {fleet.map((car) => (
              <div
                key={car.name}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy/30 hover:shadow-xl"
              >
                {car.image ? (
                  <img
                    src={car.image}
                    alt={car.name}
                    className="aspect-video w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                ) : (
                  <CarImagePlaceholder className="aspect-video w-full" />
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy">{car.name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {car.category} &bull; {car.year}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <Users size={16} /> {car.seats}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Settings2 size={16} /> {car.transmission}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Fuel size={16} /> {car.fuel}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                    <p className="text-lg font-bold text-navy">
                      {car.price} <span className="text-sm font-normal text-muted">/day</span>
                    </p>
                    <button className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-hover transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}