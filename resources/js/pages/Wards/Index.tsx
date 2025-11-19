import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import wards from "@/routes/wards";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { 
    title: "Wards",
    href: wards.index().url
  },
];

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

export default function Index({ wards }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Wards" />
      <div className="container mx-auto mt-4 p-6 bg-white rounded-lg shadow text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Wards</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Ward Name</th>
              <th className="py-2 px-4 border-b">County Name</th>
              <th className="py-2 px-4 border-b">Ward Code</th>
              <th className="py-2 px-4 border-b">Description</th> 
              <th className="py-2 px-4 border-b">Officer</th>
            </tr>
          </thead>  
          <tbody>
            {wards.map((ward) => (
              <tr key={ward.id}>  
                <td className="py-2 px-4 border-b">{ward.id}</td>
                <td className="py-2 px-4 border-b">{ward.ward_name}</td>
                <td className="py-2 px-4 border-b">{ward.county_name}</td>
                <td className="py-2 px-4 border-b">{ward.ward_code}</td>
                <td className="py-2 px-4 border-b">{ward.description || "N/A"}</td>
                <td className="py-2 px-4 border-b">{ward.officer?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>  
        </table>
      </div>
    </AppLayout>
  );
}











