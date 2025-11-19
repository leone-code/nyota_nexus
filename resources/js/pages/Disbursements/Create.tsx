import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { useState, useEffect } from "react";
import axios from "axios";

interface Application {
  id: number;
  business_type: string;
  requested_amount: number;
}

interface Ward {
  id: number;
  ward_name: string;
  county_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Disbursements", href: "/disbursements" },
  { title: "Create Disbursement", href: "/disbursements/create" },
];

export default function Create() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get<Application[]>("/api/applications"),
      axios.get<Ward[]>("/api/wards"),
    ]).then(([appsRes, wardsRes]) => {
      setApplications(appsRes.data);
      setWards(wardsRes.data);
    });
  }, []);

  const { data, setData, post, processing, errors } = useForm({
    application_id: "",
    ward_id: "",
    amount: "",
    disbursement_notes: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/disbursements");
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Disbursement" />
      <div className="container mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
          Create Disbursement
          </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="application_id">
              Application
            </label>
            <select
              id="application_id"
              value={data.application_id}
              onChange={(e) => setData("application_id", e.target.value)}
              className="w-full p-2 border border-gray-300 text-gray-700 rounded"
            > 
              <option value="">Select Application</option>
              {applications.map((app) => (
                <option key={app.id} value={app.id}>  
                  {app.business_type} - {app.requested_amount.toLocaleString()}
                </option>
              ))} 
            </select>
            {errors.application_id && (
              <p className="text-red-500 text-sm mt-1">{errors.application_id}</p>
            )}
          </div>  
          <div className="mb-4">  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="ward_id">
              Ward    
            </label>
            <select
              id="ward_id"
              value={data.ward_id}
              onChange={(e) => setData("ward_id", e.target.value)}
              className="w-full p-2 border border-gray-300 text-gray-700 rounded"
            > 
              <option value="">Select Ward</option>
              {wards.map((ward) => (  
                <option key={ward.id} value={ward.id}>  
                  {ward.ward_name} - {ward.county_name}
                </option> 
              ))} 
            </select>
            {errors.ward_id && (  
              <p className="text-red-500 text-sm mt-1">{errors.ward_id}</p>
            )} 
          </div>  
          <div className="mb-4">  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={data.amount}
              onChange={(e) => setData("amount", e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.amount && ( 
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )} 
          </div>    
          <div className="mb-4">  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="disbursement_notes">
              Disbursement Notes  
            </label>
            <textarea
              id="disbursement_notes" 
              value={data.disbursement_notes}
              onChange={(e) => setData("disbursement_notes", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" 
            />
            {errors.disbursement_notes && ( 
              <p className="text-red-500 text-sm mt-1">{errors.disbursement_notes}</p>  
            )}
          </div>  
          <button 
            type="submit"
            disabled={processing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Disbursement
          </button>
        </form>
      </div>
    </AppLayout>
  );
}




