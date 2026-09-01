import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerificationSuccess from "./pages/VerificationSuccess";
import Cars from "./pages/Cars";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verification-success" element={<VerificationSuccess />} />

      {/* Placeholder routes — swap these for real pages as the backend comes online */}
      <Route path="/cars" element={<Cars />} />
      <Route path="/how-it-works" element={<Placeholder title="How it Works" />} />
      <Route path="/support" element={<Placeholder title="Support" />} />
      <Route path="/dashboard" element={<Placeholder title="Dashboard" text="Your bookings and account details will show up here." />} />
      <Route path="/forgot-password" element={<Placeholder title="Forgot Password" />} />
      <Route path="/terms" element={<Placeholder title="Terms of Service" />} />
      <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
      <Route path="/contact" element={<Placeholder title="Contact Us" />} />
      <Route path="/boundary-information" element={<Placeholder title="Boundary Information" />} />
      <Route path="*" element={<Placeholder title="Page not found" text="Let's get you back on the road." />} />
    </Routes>
  );
}
