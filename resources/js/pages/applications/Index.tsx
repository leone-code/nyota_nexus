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
  user?: { name: string };
  ward?: { ward_name: string };
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
      <div className="container mx-auto mt-4 p-6 bg-white rounded-lg shadow text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Applications</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Applicant Name</th>
              <th className="py-2 px-4 border-b">Ward</th>
              <th className="py-2 px-4 border-b">Business Type</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Requested Amount</th>
              <th className="py-2 px-4 border-b">status</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((application) => (
              <tr key={application.id}>
                <td className="py-2 px-4 border-b">{application.id}</td>
                <td className="py-2 px-4 border-b">{application.user?.name || "N/A"}</td>
                <td className="py-2 px-4 border-b">{application.ward?.ward_name || "N/A"}</td>
                <td className="py-2 px-4 border-b">{application.business_type}</td>
                <td className="py-2 px-4 border-b">{application.status}</td>
                <td className="py-2 px-4 border-b">{application.requested_amount.toLocaleString()}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={applications.show(application.id).url}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
