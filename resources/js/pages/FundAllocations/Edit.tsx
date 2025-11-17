import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { useState, useEffect } from "react";
import axios from "axios";

interface Ward {
  id: number;
  ward_name: string;
  county_name?: string;
}

interface FundAllocation {
  id: number;
  county: string;
  ward?: number;
  amount_allocated: number;
  amount_utilized: number;
  purpose?: string;
  allocation_date: string;
  status: string;
}

interface Props {
  fundAllocation: FundAllocation;
}

export default function Edit({ fundAllocation }: Props) {
  // ✅ replaced `any[]` with `Ward[]`
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    axios.get("/api/wards").then((res) => {
      setWards(res.data);
    });
  }, []);

  const { data, setData, put, processing, errors } = useForm({
    county: fundAllocation.county || "",
    ward: fundAllocation.ward || "",
    amount_allocated: fundAllocation.amount_allocated || "",
    amount_utilized: fundAllocation.amount_utilized || "",
    purpose: fundAllocation.purpose || "",
    allocation_date: fundAllocation.allocation_date || "",
    status: fundAllocation.status || "active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/fund-allocations/${fundAllocation.id}`);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Fund Allocations", href: "/fund-allocations" },
    { title: "Edit Allocation", href: `/fund-allocations/${fundAllocation.id}/edit` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Fund Allocation" />

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit Fund Allocation</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">County *</label>
            <input
              type="text"
              value={data.county}
              onChange={(e) => setData("county", e.target.value)}
              className="form-control w-full"
              required
            />
            {errors.county && <div className="text-danger text-sm">{errors.county}</div>}
          </div>

          <div>
            <label className="form-label">Ward (Optional)</label>
            <select
              value={data.ward}
              onChange={(e) => setData("ward", e.target.value)}
              className="form-control w-full"
            >
              <option value="">All Wards in County</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.ward_name}
                </option>
              ))}
            </select>
            {errors.ward && <div className="text-danger text-sm">{errors.ward}</div>}
          </div>

          <div>
            <label className="form-label">Amount Allocated (Ksh) *</label>
            <input
              type="number"
              value={data.amount_allocated}
              onChange={(e) => setData("amount_allocated", e.target.value)}
              className="form-control w-full"
              min="0"
              step="0.01"
              required
            />
            {errors.amount_allocated && <div className="text-danger text-sm">{errors.amount_allocated}</div>}
          </div>

          <div>
            <label className="form-label">Amount Utilized (Ksh)</label>
            <input
              type="number"
              value={data.amount_utilized}
              onChange={(e) => setData("amount_utilized", e.target.value)}
              className="form-control w-full"
              min="0"
              step="0.01"
            />
            {errors.amount_utilized && <div className="text-danger text-sm">{errors.amount_utilized}</div>}
          </div>

          <div>
            <label className="form-label">Allocation Date *</label>
            <input
              type="date"
              value={data.allocation_date}
              onChange={(e) => setData("allocation_date", e.target.value)}
              className="form-control w-full"
              required
            />
            {errors.allocation_date && <div className="text-danger text-sm">{errors.allocation_date}</div>}
          </div>

          <div>
            <label className="form-label">Status *</label>
            <select
              value={data.status}
              onChange={(e) => setData("status", e.target.value)}
              className="form-control w-full text-gray-700"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && <div className="text-danger text-sm">{errors.status}</div>}
          </div>

          <div className="md:col-span-2">
            <label className="form-label">Purpose</label>
            <textarea
              value={data.purpose}
              onChange={(e) => setData("purpose", e.target.value)}
              className="form-control w-full"
              rows={3}
            ></textarea>
            {errors.purpose && <div className="text-danger text-sm">{errors.purpose}</div>}
          </div>

          <div className="md:col-span-2 text-right mt-4">
            <button
              type="submit"
              disabled={processing}
              className="btn btn-primary px-4 py-2 rounded"
            >
              {processing ? "Updating..." : "Update Allocation"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}



