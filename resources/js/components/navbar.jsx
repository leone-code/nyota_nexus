import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-success text-white p-3 d-flex justify-content-between">
      <h4 className="fw-bold">Nyota Application System</h4>
      <div>
        <Link to="/" className="text-white me-3">Dashboard</Link>
        <Link to="/applications" className="text-white me-3">Applications</Link>
        <Link to="/wards" className="text-white me-3">Wards</Link>
        <Link to="/fund-allocations" className="text-white me-3">Funds</Link>
        <Link to="/disbursements" className="text-white">Disbursements</Link>
      </div>
    </nav>
  );
}
