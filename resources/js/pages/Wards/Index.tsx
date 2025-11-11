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
  };
}

interface Props {
  wards: Ward[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Wards", href: "/wards" },
];

export default function Index({ wards }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Wards" />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Wards</h3>
          <Link href="/wards/create" className="btn btn-success">
            + New Ward
          </Link>
        </div>

        {wards.length === 0 && (
          <div className="alert alert-warning">No wards found.</div>
        )}

        {wards.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Ward Name</th>
                  <th>County</th>
                  <th>Ward Code</th>
                  <th>Officer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {wards.map((ward, index) => (
                  <tr key={ward.id}>
                    <td>{index + 1}</td>
                    <td>{ward.ward_name}</td>
                    <td>{ward.county_name}</td>
                    <td>{ward.ward_code}</td>
                    <td>{ward.officer?.name || "N/A"}</td>
                    <td>
                      <Link
                        href={`/wards/${ward.id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        View
                      </Link>
                      <Link
                        href={`/wards/${ward.id}/edit`}
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








