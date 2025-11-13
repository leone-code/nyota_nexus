import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import applications from "@/routes/applications";
import { type BreadcrumbItem } from "@/types";
import type { JSX, ReactElement } from "react";

const breadcrumbs: BreadcrumbItem[] = [
  { 
    title: "Applications",
    href: applications.index().url
  },
];

export interface Application {
  id: number;
  user?: { name: string };
  ward?: { ward_name: string };
  business_type: string;
  status: "approved" | "rejected" | "pending";
  requested_amount: number;
}
interface Props {
  applications: Application[];
}

export default function Applications({ applications: apps }: Props): JSX.Element {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Applications" />

      <div className="container mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {apps.map((app) => (
              <div key={app.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold mb-2">{app.user?.name || "N/A"}</h5>
                    <p className="mb-1"><span className="fw-semibold">ID:</span> {app.id}</p>
                    <p className="mb-1"><span className="fw-semibold">Ward:</span> {app.ward?.ward_name || "N/A"}</p>
                    <p className="mb-1"><span className="fw-semibold">Business Type:</span> {app.business_type}</p>
                    <p className="mb-1">
                      <span className="fw-semibold">Status:</span>{" "}
                      <span
                        className={`badge ${
                          app.status === "approved"
                            ? "bg-success"
                            : app.status === "rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {app.status}
                      </span>
                    </p>
                    <p className="mb-3"><span className="fw-semibold">Requested Amount:</span> Ksh {app.requested_amount.toLocaleString()}</p>
                    
                    <div className="mt-auto d-flex gap-2">
                      <Link
                        href={applications.show({ application: app.id }).url}
                        className="btn btn-sm btn-outline-primary flex-fill"
                      >
                        View
                      </Link>
                      <br />
                      <Link
                        href={`/applications/${app.id}/edit`}
                        className="btn btn-sm btn-outline-secondary flex-fill"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
