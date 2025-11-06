import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ApplicationsList from "./pages/applicationslist";
import ApplicationForm from "./pages/applicatiofForm";
import WardsPage from "./pages/wardspage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<ApplicationsList />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/wards" element={<WardsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
