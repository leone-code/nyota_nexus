import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import applications from "@/routes/applications";
import { type BreadcrumbItem } from "@/types";

interface Application {
  id: number;
  user?: {
    name: string;
    email: string;
  };
  ward?: {
    ward_name: string;
    county_name: string;
  };
  reviewer?: {
    name: string;
  };
  documents?: Array<{
    id: number;
    file_name: string;
    file_path: string;
    doc_type: string;
  }>;
  date_of_birth: string;
  id_number: string;
  phone: string;
  address: string;
  education_level: string;
  institution_name?: string;
  graduation_year?: number;
  business_type: string;
  business_description: string;
  requested_amount: number;
  business_plan: string;
  status: string;
  submitted_at?: string;
}

interface Props {
  application: Application;
}

export default function Show({ application }: Props) {
  const { patch, processing, setData } = useForm<{ status: string }>({
    status: application.status,
  });

  const updateStatus = (status: string) => {
    setData("status", status);
    patch(applications.updateStatus({ application: application.id }).url);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Applications", href: applications.index().url },
    { title: "View Application", href: applications.show({ application: application.id }).url },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Application Details" />

      <div className="container mx-auto mt-4 p-6">
       <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Application Details</h2>
      <div className="flex gap-2">
              <Link
                href={applications.index().url}
                className="btn btn-outline-secondary"
              >
                Back
              </Link>
              <Link
                href={`/applications/${application.id}/edit`}
                className="btn btn-primary"
              >
                Edit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">Applicant Information</h3>
            <div className="space-y-2">
                <p><strong>Name:</strong> {application.user?.name || "N/A"}</p>
                <p><strong>Email:</strong> {application.user?.email || "N/A"}</p>
                <p><strong>ID Number:</strong> {application.id_number}</p>
                <p><strong>Phone:</strong> {application.phone}</p>
                <p><strong>Date of Birth:</strong> {new Date(application.date_of_birth).toLocaleDateString()}</p>
                <p><strong>Address:</strong> {application.address}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Ward Information</h3>
              <div className="space-y-2">
                <p><strong>Ward:</strong> {application.ward?.ward_name || "N/A"}</p>
                <p><strong>County:</strong> {application.ward?.county_name || "N/A"}</p>
              </div>

              <h3 className="text-lg font-semibold mb-4 mt-6">Education</h3>
              <div className="space-y-2">
                <p><strong>Level:</strong> {application.education_level}</p>
                {application.institution_name && (
                  <p><strong>Institution:</strong> {application.institution_name}</p>
                )}
                {application.graduation_year && (
                  <p><strong>Graduation Year:</strong> {application.graduation_year}</p>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Business Information</h3>
              <div className="space-y-2">
                <p><strong>Business Type:</strong> {application.business_type}</p>
                <p><strong>Description:</strong> {application.business_description}</p>
                <p><strong>Requested Amount:</strong> Ksh {application.requested_amount.toLocaleString()}</p>
                <div>
                  <strong>Business Plan:</strong>
                  <p className="mt-2 p-3 bg-gray-50 rounded">{application.business_plan}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Status & Review</h3>
              <div className="space-y-2">
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      application.status === "approved"
                        ? "bg-success"
                        : application.status === "rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {application.status || "Pending"}
                  </span>
                </p>
                {application.submitted_at && (
                  <p><strong>Submitted:</strong> {new Date(application.submitted_at).toLocaleString()}</p>
                )}
                {application.reviewer && (
                  <p><strong>Reviewed By:</strong> {application.reviewer.name}</p>
                )}
              </div>
            </div>

            {application.documents && application.documents.length > 0 && (
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Documents</h3>
                <ul className="list-group">
                  {application.documents.map((doc) => (
                    <li key={doc.id} className="list-group-item">
                      <a
                        href={`/storage/${doc.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        {doc.file_name} ({doc.doc_type})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Status Update Actions (for admins/reviewers) */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Update Status</h3>
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus("under_review")}
                disabled={processing}
                className="btn btn-warning"
              >
                Mark Under Review
              </button>
              <button
                onClick={() => updateStatus("approved")}
                disabled={processing}
                className="btn btn-success"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus("rejected")}
                disabled={processing}
                className="btn btn-danger"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

