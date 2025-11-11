import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";

interface FundAllocation {
  id: number;
  county: string;
  ward?: {
    ward_name: string;
    county_name: string;
  };
  amount_allocated: number;
  amount_utilized: number;
  purpose?: string;
  allocation_date: string;
  status: string;
  admin?: {
    name: string;
    email: string;
  };
}

interface Props {
  fundAllocation: FundAllocation;
}

export default function Show({ fundAllocation }: Props) {
  const balance = fundAllocation.amount_allocated - fundAllocation.amount_utilized;
  const utilizationPercent = (fundAllocation.amount_utilized / fundAllocation.amount_allocated) * 100;

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Fund Allocations", href: "/fund-allocations" },
    { title: `Allocation #${fundAllocation.id}`, href: `/fund-allocations/${fundAllocation.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Fund Allocation #${fundAllocation.id}`} />

      <div className="container mx-auto mt-4 p-6">
<div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Fund Allocation Details</h2>
            <div className="flex gap-2">
              <Link href="/fund-allocations" className="btn btn-outline-secondary">
                Back
              </Link>
              <Link href={`/fund-allocations/${fundAllocation.id}/edit`} className="btn btn-primary">
                Edit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Allocation Information</h3>
              <div className="space-y-2">
                <p><strong>County:</strong> {fundAllocation.county}</p>
                <p><strong>Ward:</strong> {fundAllocation.ward?.ward_name || "All Wards"}</p>
                <p><strong>Status:</strong> 
                  <span
                    className={`badge ms-2 ${
                      fundAllocation.status === "active"
                        ? "bg-success"
                        : fundAllocation.status === "completed"
                        ? "bg-info"
                        : "bg-secondary"
                    }`}
                  >
                    {fundAllocation.status}
                  </span>
                </p>
                <p><strong>Allocation Date:</strong> {new Date(fundAllocation.allocation_date).toLocaleDateString()}</p>
                {fundAllocation.purpose && (
                  <div>
                    <strong>Purpose:</strong>
                    <p className="mt-2 p-3 bg-gray-50 rounded">{fundAllocation.purpose}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
              <div className="space-y-2">
                <p><strong>Amount Allocated:</strong> Ksh {fundAllocation.amount_allocated.toLocaleString()}</p>
                <p><strong>Amount Utilized:</strong> Ksh {fundAllocation.amount_utilized.toLocaleString()}</p>
                <p>
                  <strong>Balance:</strong>{" "}
                  <span className={balance < 0 ? "text-danger" : "text-success"}>
                    Ksh {balance.toLocaleString()}
                  </span>
                </p>
                <div className="mt-3">
                  <strong>Utilization Rate:</strong>
                  <div className="progress mt-2">
                    <div
                      className={`progress-bar ${utilizationPercent > 100 ? "bg-danger" : "bg-success"}`}
                      role="progressbar"
                      style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                    >
                      {utilizationPercent.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {fundAllocation.admin && (
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Allocated By</h3>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {fundAllocation.admin.name}</p>
                  <p><strong>Email:</strong> {fundAllocation.admin.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}







