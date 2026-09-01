const year = new Date().getFullYear();

const links = [
  { to: "/terms", label: "Terms of Service" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/contact", label: "Contact Us" },
  { to: "/boundary-information", label: "Boundary Information" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} San Fernando Car Logistics. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a key={link.label} href={link.to} className="hover:text-navy">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
