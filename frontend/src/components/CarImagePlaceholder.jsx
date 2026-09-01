import { Car } from "lucide-react";

/**
 * Stand-in for a real vehicle photo. Swap the <img> back in once you
 * have actual car images — just replace this component's usage with
 * <img src={car.image} alt={car.name} className="..." />
 */
export default function CarImagePlaceholder({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center bg-accent-soft/60 text-navy/40 ${className}`}
    >
      <Car size={40} strokeWidth={1.5} />
    </div>
  );
}