import { useEffect, useState } from "react";
import api from "../api/api";

export default function ApplicationsList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/applications")
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">Applications</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Applicant</th>
            <th>Business Type</th>
            <th>Requested Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.user?.name || "N/A"}</td>
              <td>{app.business_type}</td>
              <td>Ksh {app.requested_amount}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
