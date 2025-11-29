import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
import PublicPortfolio from "./pages/PublicPortfolio.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/builder" element={<ResumeBuilder />} />
        <Route path="/preview" element={<ResumePreview />} />
        <Route path="/p/:slug" element={<PublicPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
