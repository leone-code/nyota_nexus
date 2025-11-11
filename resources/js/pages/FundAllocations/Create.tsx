import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { useState, useEffect } from "react";
import axios from "axios";

interface Ward {
  id: number;
  ward_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Fund Allocations", href: "/fund-allocations" },
  { title: "Create Allocation", href: "/fund-allocations/create" },
];

export default function Create() {
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    axios.get<Ward[]>("/api/wards").then((res) => {
      setWards(res.data);
    });
  }, []);

  const { data, setData, post, processing, errors } = useForm({
    county: "",
    ward: "",
    amount_allocated: "",
    purpose: "",
    allocation_date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/fund-allocations");
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Fund Allocation" />

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Fund Allocation</h2>

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
              className="btn btn-success px-4 py-2 rounded"
            >
              {processing ? "Creating..." : "Create Allocation"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

