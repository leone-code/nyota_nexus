import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { useState, useEffect } from "react";
import axios from "axios";

interface Ward {
  id: number;
  ward_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Fund Allocations", href: "/fund-allocations" },
  { title: "Create Allocation", href: "/fund-allocations/create" },
];

export default function Create() {
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    axios.get<Ward[]>("/api/wards").then((res) => {
      setWards(res.data);
    });
  }, []);

  const { data, setData, post, processing, errors } = useForm({
    county: "",
    ward: "",
    amount_allocated: "",
    purpose: "",
    allocation_date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/fund-allocations");
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Fund Allocation" />
      <div className="container mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow"> 
        <h1 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
          Create Fund Allocation
          </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="county">
              County
            </label>
            <input
              type="text"
              id="county"
              value={data.county}
              onChange={(e) => setData("county", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.county && <p className="text-red-500 text-sm mt-1">{errors.county}</p>}
          </div>  
          <div className="mb-4">  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="ward">
              Ward  
            </label>
            <select
              id="ward" 
              value={data.ward}
              onChange={(e) => setData("ward", e.target.value)}
              className="w-full p-2 border border-gray-300 text-gray-700 rounded"
            >
              <option value="">Select a ward</option>
              {wards.map((ward) => (        
                <option key={ward.id} value={ward.ward_name}>  
                  {ward.ward_name}
                </option> 
              ))}
            </select>
            {errors.ward && <p className="text-red-500 text-sm mt-1">{errors.ward}</p>} 
          </div>  
          <div className="mb-4">  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="amount_allocated"> 
              Amount Allocated
            </label>
            <input  
              type="number"
              id="amount_allocated"
              value={data.amount_allocated}
              onChange={(e) => setData("amount_allocated", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />  
            {errors.amount_allocated && (
              <p className="text-red-500 text-sm mt-1">{errors.amount_allocated}</p>
            )}    
          </div>  
          <div className="mb-4">  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="purpose">
              Purpose
            </label>
            <textarea
              id="purpose"
              value={data.purpose}
              onChange={(e) => setData("purpose", e.target.value)}  
              className="w-full p-2 border border-gray-300 rounded" 
            />
            {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
          </div>
          <div className="mb-4">  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="allocation_date">    
              Allocation Date
            </label>
            <input  
              type="date"
              id="allocation_date"
              value={data.allocation_date}
              onChange={(e) => setData("allocation_date", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />  
            {errors.allocation_date && (
              <p className="text-red-500 text-sm mt-1">{errors.allocation_date}</p>
            )}    
          </div>  
          <button 
            type="submit" 
            disabled={processing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {processing ? "Submitting..." : "Create Allocation"}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}



