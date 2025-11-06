import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import applications from "@/routes/applications";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { 
    title: "Applications",
    href: applications.index().url
  },
];

interface Application {
  id: number;
  user?: {
    name: string;
  };
  ward?: {
    ward_name: string;
  };
  business_type: string;
  status: string;
  requested_amount: number;
}

interface Props {
  applications: Application[];
}

export default function Index({ applications: apps }: Props) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Applications" />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Applications</h3>
          <Link
            href="/applications/create"
            className="btn btn-success"
          >
            + New Application
          </Link>
        </div>

        {apps.length === 0 && (
          <div className="alert alert-warning">No applications found.</div>
        )}

        {apps.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Applicant Name</th>
                  <th>Ward</th>
                  <th>Business Type</th>
                  <th>Status</th>
                  <th>Requested Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app, index) => (
                  <tr key={app.id}>
                    <td>{index + 1}</td>
                    <td>{app.user?.name || "N/A"}</td>
                    <td>{app.ward?.ward_name || "N/A"}</td>
                    <td>{app.business_type}</td>
                    <td>
                      <span
                        className={`badge ${
                          app.status === "approved"
                            ? "bg-success"
                            : app.status === "rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {app.status || "Pending"}
                      </span>
                    </td>
                    <td>Ksh {app.requested_amount?.toLocaleString()}</td>
                    <td>
                      <Link
                        href={applications.show({ application: app.id }).url}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        View
                      </Link>
                      <Link
                        href={`/applications/${app.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
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
