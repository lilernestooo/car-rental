import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Placeholder({ title, text }) {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-24 text-center">
        <div>
          <h1 className="text-2xl font-bold text-navy">{title}</h1>
          <p className="mt-3 text-muted">
            {text ?? "This page is on the way — check back once the backend is wired up."}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
