import { useEffect, useState } from "react";
import api from "../api/api";

export default function WardsPage() {
  const [wards, setWards] = useState([]);

  useEffect(() => {
    api.get("/wards")
      .then(res => setWards(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">Registered Wards</h3>
      <table className="table table-bordered">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Ward Name</th>
            <th>Subcounty</th>
          </tr>
        </thead>
        <tbody>
          {wards.map(ward => (
            <tr key={ward.id}>
              <td>{ward.id}</td>
              <td>{ward.name}</td>
              <td>{ward.subcounty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
