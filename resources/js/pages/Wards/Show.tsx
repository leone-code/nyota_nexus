import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";

interface Ward {
  id: number;
  ward_name: string;
  county_name: string;
  ward_code: string;
  description?: string;
  officer?: {
    name: string;
    email: string;
  };
  applications?: Array<{
    id: number;
    business_type: string;
    status: string;
  }>;
}

interface Props {
  ward: Ward;
}

export default function Show({ ward }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Wards", href: "/wards" },
    { title: ward.ward_name, href: `/wards/${ward.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Ward: ${ward.ward_name}`} />

      <div className="container mx-auto mt-4 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{ward.ward_name}</h2>
            <div className="flex gap-2">
              <Link href="/wards" className="btn btn-outline-secondary">
                Back
              </Link>
              <Link href={`/wards/${ward.id}/edit`} className="btn btn-primary">
                Edit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ward Information</h3>
              <div className="space-y-2">
                <p><strong>Ward Name:</strong> {ward.ward_name}</p>
                <p><strong>County:</strong> {ward.county_name}</p>
                <p><strong>Ward Code:</strong> {ward.ward_code}</p>
                {ward.description && (
                  <div>
                    <strong>Description:</strong>
                    <p className="mt-2 p-3 bg-gray-50 rounded">{ward.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Ward Officer</h3>
              {ward.officer ? (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {ward.officer.name}</p>
                  <p><strong>Email:</strong> {ward.officer.email}</p>
                </div>
              ) : (
                <p className="text-muted">No officer assigned</p>
              )}
            </div>

            {ward.applications && ward.applications.length > 0 && (
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Applications ({ward.applications.length})</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Business Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ward.applications.map((app, index) => (
                        <tr key={app.id}>
                          <td>{index + 1}</td>
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
                          <td>
                            <Link
                              href={`/applications/${app.id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

