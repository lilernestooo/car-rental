import { useState } from "react";
import {
  AlertTriangle,
  MapPin,
  Car,
  Headset,
  Plus,
  Minus,
  LocateFixed,
  Circle as CircleIcon,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Polyline,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// San Fernando, Pampanga
const CITY_CENTER = [15.0286, 120.6898];
const BOUNDARY_RADIUS_METERS = 3000;
const NORMAL_POSITION = [15.0308, 120.694];
const BREACHED_POSITION = [15.0525, 120.7155];

function vehicleIcon(breached) {
  const color = breached ? "#dc2626" : "#0f172a";
  return L.divIcon({
    className: "",
    html: `
      <div style="
        display:flex;align-items:center;justify-content:center;
        width:34px;height:34px;border-radius:9999px;
        background:#ffffff;border:2px solid ${color};
        box-shadow:0 2px 6px rgba(0,0,0,0.25);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/>
          <path d="M9 17h6"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

function MapControls() {
  const map = useMap();
  return (
    <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-navy shadow hover:bg-page"
      >
        <Plus size={16} />
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-navy shadow hover:bg-page"
      >
        <Minus size={16} />
      </button>
      <button
        onClick={() => map.setView(CITY_CENTER, 13)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-navy shadow hover:bg-page"
      >
        <LocateFixed size={16} />
      </button>
    </div>
  );
}

export default function Support() {
  const [boundaryBreached, setBoundaryBreached] = useState(true);
  const vehiclePosition = boundaryBreached ? BREACHED_POSITION : NORMAL_POSITION;
  const routeColor = boundaryBreached ? "#dc2626" : "#0f172a";

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <h1 className="text-3xl font-extrabold text-navy">Active Rental Tracking</h1>
        <p className="mt-2 text-muted">
          Monitoring your vehicle&apos;s location within San Fernando, Pampanga.
        </p>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_320px]">
          {/* Map */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
            {boundaryBreached && (
              <div className="absolute inset-x-4 top-4 z-[1000] flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg sm:inset-x-8">
                <AlertTriangle size={18} />
                Boundary Alert: Vehicle has left San Fernando area!
              </div>
            )}

            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <MapContainer
                center={CITY_CENTER}
                zoom={13}
                zoomControl={false}
                scrollWheelZoom={true}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Circle
                  center={CITY_CENTER}
                  radius={BOUNDARY_RADIUS_METERS}
                  pathOptions={{
                    color: "#0f172a",
                    weight: 2,
                    fillColor: "#0f172a",
                    fillOpacity: 0.05,
                  }}
                />

                <Polyline
                  positions={[CITY_CENTER, vehiclePosition]}
                  pathOptions={{ color: routeColor, weight: 3, dashArray: "6 6" }}
                />

                <Marker position={vehiclePosition} icon={vehicleIcon(boundaryBreached)}>
                  <Tooltip permanent direction="top" offset={[0, -10]} className="!rounded-full !border-0 !bg-navy !px-2 !py-1 !text-xs !font-semibold !text-white">
                    Toyota Vios
                  </Tooltip>
                </Marker>

                <MapControls />
              </MapContainer>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-navy">Rental Status</h2>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-navy">
                  Active
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted">Vehicle</p>
                  <p className="font-semibold text-navy">Toyota Vios 2023</p>
                  <p className="text-muted">Plate: ABC 1234</p>
                </div>
                <div>
                  <p className="text-muted">Time Remaining</p>
                  <p className="font-semibold text-navy">04:32:15</p>
                  <p className="text-muted">Ends at 6:00 PM</p>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-5">
                <p className="text-sm text-muted">Current Location</p>
                <div className="mt-1 flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-navy" />
                  <p className="text-sm font-medium text-navy">
                    MacArthur Highway, San Fernando, Pampanga
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-navy">Map Legend</h3>
              <ul className="mt-4 space-y-3 text-sm text-navy">
                <li className="flex items-center gap-2">
                  <CircleIcon size={14} className="text-navy" />
                  Within San Fernando Boundary
                </li>
                <li className="flex items-center gap-2">
                  <CircleIcon size={14} className="text-red-600" />
                  Boundary Crossed Alert
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-px w-4 bg-navy" />
                  City Limits
                </li>
              </ul>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card py-3 font-semibold text-navy hover:border-navy transition-colors">
              <Headset size={18} />
              Contact Support
            </button>

            <div className="rounded-2xl bg-accent-soft/50 p-5 text-center">
              <p className="text-sm font-medium text-navy/80">Interactive Demo Controls</p>
              <button
                onClick={() => setBoundaryBreached((v) => !v)}
                className="mt-3 w-full rounded-lg bg-accent-soft py-2.5 text-sm font-semibold text-navy hover:bg-accent-soft/80 transition-colors"
              >
                {boundaryBreached ? "Reset to Normal Route" : "Simulate Boundary Crossing"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}