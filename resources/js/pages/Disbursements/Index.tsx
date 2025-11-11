import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";

interface Disbursement {
  id: number;
  amount: number;
  status: string;
  disbursement_notes?: string;
  requested_at?: string;
  approved_at?: string;
  disbursed_at?: string;
  transaction_reference?: string;
  application?: {
    id: number;
    business_type: string;
  };
  ward?: {
    ward_name: string;
  };
  requester?: {
    name: string;
  };
  approver?: {
    name: string;
  };
}

interface Props {
  disbursements: Disbursement[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Disbursements", href: "/disbursements" },
];

export default function Index({ disbursements }: Props) {
  const { patch, processing } = useForm({});

  const handleApprove = (id: number) => {
    if (confirm("Are you sure you want to approve this disbursement?")) {
      patch(`/disbursements/${id}/approve`);
    }
  };

  const handleReject = (id: number) => {
    if (confirm("Are you sure you want to reject this disbursement?")) {
      patch(`/disbursements/${id}/reject`);
    }
  };

  const handleDisburse = (id: number) => {
    if (confirm("Are you sure you want to mark this as disbursed?")) {
      patch(`/disbursements/${id}/disburse`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Disbursements" />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Disbursements</h3>
          <Link href="/disbursements/create" className="btn btn-success">
            + New Disbursement
          </Link>
        </div>

        {disbursements.length === 0 && (
          <div className="alert alert-warning">No disbursements found.</div>
        )}

        {disbursements.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Application</th>
                  <th>Ward</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Requested By</th>
                  <th>Approved By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {disbursements.map((disbursement, index) => (
                  <tr key={disbursement.id}>
                    <td>{index + 1}</td>
                    <td>
                      {disbursement.application ? (
                        <Link href={`/applications/${disbursement.application.id}`}>
                          {disbursement.application.business_type}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{disbursement.ward?.ward_name || "N/A"}</td>
                    <td>Ksh {disbursement.amount.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          disbursement.status === "disbursed"
                            ? "bg-success"
                            : disbursement.status === "approved"
                            ? "bg-info"
                            : disbursement.status === "rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {disbursement.status || "Pending"}
                      </span>
                    </td>
                    <td>{disbursement.requester?.name || "N/A"}</td>
                    <td>{disbursement.approver?.name || "N/A"}</td>
                    <td>
                      <div className="btn-group">
                        {disbursement.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(disbursement.id)}
                              disabled={processing}
                              className="btn btn-sm btn-success"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(disbursement.id)}
                              disabled={processing}
                              className="btn btn-sm btn-danger"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {disbursement.status === "approved" && (
                          <button
                            onClick={() => handleDisburse(disbursement.id)}
                            disabled={processing}
                            className="btn btn-sm btn-primary"
                          >
                            Mark Disbursed
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}







