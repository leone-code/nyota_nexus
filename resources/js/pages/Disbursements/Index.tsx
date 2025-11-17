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
      <div className="container mx-auto mt-4 p-6 bg-white rounded-lg shadow text-gray-800"> 
        <h1 className="text-3xl font-bold mb-6">Disbursements</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead> 
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Applicant Name</th>
              <th className="py-2 px-4 border-b">Ward</th>
              <th className="py-2 px-4 border-b">Business Type</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Requested At</th>
              <th className="py-2 px-4 border-b">Approved At</th>
              <th className="py-2 px-4 border-b">Disbursed At</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr> 
          </thead>
          <tbody>
            {disbursements.map((disbursement) => (
              <tr key={disbursement.id}>
                <td className="py-2 px-4 border-b">{disbursement.id}</td>
                <td className="py-2 px-4 border-b">{disbursement.requester?.name || "N/A"}</td>
                <td className="py-2 px-4 border-b">{disbursement.ward?.ward_name || "N/A"}</td>
                <td className="py-2 px-4 border-b">{disbursement.application?.business_type || "N/A"}</td>
                <td className="py-2 px-4 border-b">{disbursement.amount.toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{disbursement.status}</td>
                <td className="py-2 px-4 border-b">{disbursement.requested_at ? new Date(disbursement.requested_at).toLocaleDateString() : "N/A"}</td>
                <td className="py-2 px-4 border-b">{disbursement.approved_at ? new Date(disbursement.approved_at).toLocaleDateString() : "N/A"}</td>
                <td className="py-2 px-4 border-b">{disbursement.disbursed_at ? new Date(disbursement.disbursed_at).toLocaleDateString() : "N/A"}</td>  
                <td className="py-2 px-4 border-b">
                    {disbursement.status?.toLowerCase() === "pending" && (
                    <>  
                      <button
                        onClick={() => handleApprove(disbursement.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      >
                        Approve 
                      </button>
                      <button
                        onClick={() => handleReject(disbursement.id)}   
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      > 
                        Reject
                      </button>
                    </> 
                  )}
                  {disbursement.status === "Approved" && (
                    <button 
                      onClick={() => handleDisburse(disbursement.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"  
                    >
                      Mark as Disbursed
                    </button> 
                  )}
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}










