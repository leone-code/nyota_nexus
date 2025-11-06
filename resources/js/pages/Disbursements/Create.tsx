import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { useState, useEffect } from "react";
import axios from "axios";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Disbursements", href: "/disbursements" },
  { title: "Create Disbursement", href: "/disbursements/create" },
];

export default function Create() {
  const [applications, setApplications] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get("/api/applications"),
      axios.get("/api/wards"),
    ]).then(([appsRes, wardsRes]) => {
      setApplications(appsRes.data);
      setWards(wardsRes.data);
    });
  }, []);

  const { data, setData, post, processing, errors } = useForm({
    application_id: "",
    ward_id: "",
    amount: "",
    disbursement_notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/disbursements");
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Disbursement" />

<div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Disbursement</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Application *</label>
            <select
              value={data.application_id}
              onChange={(e) => setData("application_id", e.target.value)}
              className="form-control w-full"
              required
            >
              <option value="">Select Application</option>
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.business_type} - Ksh {app.requested_amount?.toLocaleString()}
                </option>
              ))}
            </select>
            {errors.application_id && <div className="text-danger text-sm">{errors.application_id}</div>}
          </div>

          <div>
            <label className="form-label">Ward *</label>
            <select
              value={data.ward_id}
              onChange={(e) => setData("ward_id", e.target.value)}
              className="form-control w-full"
              required
            >
              <option value="">Select Ward</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.ward_name} - {ward.county_name}
                </option>
              ))}
            </select>
            {errors.ward_id && <div className="text-danger text-sm">{errors.ward_id}</div>}
          </div>

          <div>
            <label className="form-label">Amount (Ksh) *</label>
            <input
              type="number"
              value={data.amount}
              onChange={(e) => setData("amount", e.target.value)}
              className="form-control w-full"
              min="0"
              step="0.01"
              required
            />
            {errors.amount && <div className="text-danger text-sm">{errors.amount}</div>}
          </div>

          <div className="md:col-span-2">
            <label className="form-label">Notes</label>
            <textarea
              value={data.disbursement_notes}
              onChange={(e) => setData("disbursement_notes", e.target.value)}
              className="form-control w-full"
              rows={3}
            ></textarea>
            {errors.disbursement_notes && <div className="text-danger text-sm">{errors.disbursement_notes}</div>}
          </div>

          <div className="md:col-span-2 text-right mt-4">
            <button
              type="submit"
              disabled={processing}
              className="btn btn-success px-4 py-2 rounded"
            >
              {processing ? "Creating..." : "Create Disbursement"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

