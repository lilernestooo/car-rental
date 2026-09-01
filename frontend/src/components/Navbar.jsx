import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/cars", label: "Cars" },
  { to: "/how-it-works", label: "How it Works" },
  { to: "/support", label: "Support" },
];

export default function Navbar() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-bold text-navy">
          TRANZPOZA.
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm ${
                  isActive ? "text-navy font-medium" : "text-muted hover:text-navy"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/login"
          className="rounded-lg border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
