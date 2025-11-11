import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";

interface FundAllocation {
  id: number;
  county: string;
  ward?: {
    ward_name: string;
  };
  amount_allocated: number;
  amount_utilized: number;
  purpose?: string;
  allocation_date: string;
  status: string;
  admin?: {
    name: string;
  };
}

interface Props {
  allocations: FundAllocation[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Fund Allocations", href: "/fund-allocations" },
];

export default function Index({ allocations }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Fund Allocations" />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Fund Allocations</h3>
          <Link href="/fund-allocations/create" className="btn btn-success">
            + New Allocation
          </Link>
        </div>

        {allocations.length === 0 && (
          <div className="alert alert-warning">No fund allocations found.</div>
        )}

        {allocations.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>County</th>
                  <th>Ward</th>
                  <th>Amount Allocated</th>
                  <th>Amount Utilized</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Allocation Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((allocation, index) => {
                  const balance = allocation.amount_allocated - allocation.amount_utilized;
                  return (
                    <tr key={allocation.id}>
                      <td>{index + 1}</td>
                      <td>{allocation.county}</td>
                      <td>{allocation.ward?.ward_name || "All Wards"}</td>
                      <td>Ksh {allocation.amount_allocated.toLocaleString()}</td>
                      <td>Ksh {allocation.amount_utilized.toLocaleString()}</td>
                      <td>
                        <span className={balance < 0 ? "text-danger" : ""}>
                          Ksh {balance.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            allocation.status === "active"
                              ? "bg-success"
                              : allocation.status === "completed"
                              ? "bg-info"
                              : "bg-secondary"
                          }`}
                        >
                          {allocation.status}
                        </span>
                      </td>
                      <td>{new Date(allocation.allocation_date).toLocaleDateString()}</td>
                      <td>
                        <Link
                          href={`/fund-allocations/${allocation.id}`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          View
                        </Link>
                        <Link
                          href={`/fund-allocations/${allocation.id}/edit`}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}








