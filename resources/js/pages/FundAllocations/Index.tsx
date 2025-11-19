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
      <div className="container mx-auto mt-4 p-6 bg-white rounded-lg shadow text-gray-800"> 
        <h1 className="text-3xl font-bold mb-6">Fund Allocations</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead> 
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">County</th>
              <th className="py-2 px-4 border-b">Ward</th>
              <th className="py-2 px-4 border-b">Amount Allocated</th>
              <th className="py-2 px-4 border-b">Amount Utilized</th>
              <th className="py-2 px-4 border-b">Purpose</th> 
              <th className="py-2 px-4 border-b">Allocation Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Admin</th>
            </tr> 
          </thead>
          <tbody>
            {allocations.map((allocation) => (
              <tr key={allocation.id}>
                <td className="py-2 px-4 border-b">{allocation.id}</td>
                <td className="py-2 px-4 border-b">{allocation.county}</td>
                <td className="py-2 px-4 border-b">{allocation.ward?.ward_name || "N/A"}</td>
                <td className="py-2 px-4 border-b">{allocation.amount_allocated.toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{allocation.amount_utilized.toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{allocation.purpose || "N/A"}</td>
                <td className="py-2 px-4 border-b">{new Date(allocation.allocation_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{allocation.status}</td>
                <td className="py-2 px-4 border-b">{allocation.admin?.name || "N/A"}</td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}











