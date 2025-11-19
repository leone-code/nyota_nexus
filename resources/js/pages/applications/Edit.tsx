import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import applications from "@/routes/applications";
import { type BreadcrumbItem } from "@/types";
import { useState, useEffect } from "react";
import axios from "axios";

interface Ward {
  id: number;
  ward_name: string;
  county_name: string;
}

interface Application {
  id: number;
  ward_id: number;
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
}

interface Props {
  application: Application;
}

export default function Edit({ application }: Props) {
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    axios.get<Ward[]>("/api/wards")
      .then((res) => {
        setWards(res.data);
      })
      .catch(() => {});
  }, []);

  const { data, setData, put, processing, errors } = useForm({
    ward_id: application.ward_id || "",
    date_of_birth: application.date_of_birth || "",
    id_number: application.id_number || "",
    phone: application.phone || "",
    address: application.address || "",
    education_level: application.education_level || "",
    institution_name: application.institution_name || "",
    graduation_year: application.graduation_year || "",
    business_type: application.business_type || "",
    business_description: application.business_description || "",
    requested_amount: application.requested_amount || "",
    business_plan: application.business_plan || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(applications.update({ application: application.id }).url);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Applications", href: applications.index().url },
    { title: "Edit Application", href: applications.update({ application: application.id }).url },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Application" />
      <div className="max-w-4xl mx-auto p-6 bg-white  dark:bg-gray-800 rounded-lg shadow text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl text-green-700 font-semibold mb-6">Edit Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div> 
            <label className="block  font-medium mb-1" htmlFor="ward_id">
              Ward
            </label>
            <select
              id="ward_id"  
              value={data.ward_id}  
              onChange={(e) => setData("ward_id", Number(e.target.value))}
              className="w-full border border-gray-300 text-gray-700  rounded px-3 py-2"
            >   
              <option value="">Select a ward</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>      
                  {ward.ward_name} - {ward.county_name}
                </option>
              ))} 
            </select>
            {errors.ward_id && <p className="text-red-500 text-sm mt-1">{errors.ward_id}</p>}
          </div>
          <div>   
            <label className="block text-sm  font-medium mb-1" htmlFor="date_of_birth">
              Date of Birth
            </label>      
            <input
              type="date"
              id="date_of_birth"    
              value={data.date_of_birth}
              onChange={(e) => setData("date_of_birth", e.target.value)} 
              className="w-full border border-gray-300  rounded px-3 py-2"   
            />
            {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
          </div>  
          <div>   
            <label className="block text-sm  font-medium mb-1" htmlFor="id_number">
              ID Number 
            </label>      
            <input
              type="text" 
              id="id_number"    
              value={data.id_number} 
              onChange={(e) => setData("id_number", e.target.value)} 
              className="w-full border border-gray-300  rounded px-3 py-2"   
            />
            {errors.id_number && <p className="text-red-500 text-sm mt-1">{errors.id_number}</p>}
          </div>  
          <div>   
            <label className="block text-sm  font-medium mb-1" htmlFor="phone">
              Phone Number  
            </label>      
            <input
              type="text" 
              id="phone"    
              value={data.phone} 
              onChange={(e) => setData("phone", e.target.value)}  
              className="w-full border border-gray-300  rounded px-3 py-2" 
            />   
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>  
          <div>   
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              Address 
            </label>      
            <input
              type="text" 
              id="address"  
              value={data.address} 
              onChange={(e) => setData("address", e.target.value)}  
              className="w-full border border-gray-300 rounded px-3 py-2" 
            />   
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>  
          <div>   
            <label className="block text-sm font-medium mb-1" htmlFor="education_level">
              Education Level 
            </label>      
            <input
              type="text" 
              id="education_level"  
              value={data.education_level} 
              onChange={(e) => setData("education_level", e.target.value)}  
              className="w-full border border-gray-300 rounded px-3 py-2" 
            />   
            {errors.education_level && <p className="text-red-500 text-sm mt-1">{errors.education_level}</p>}   
          </div>  
          <div>   
            <label className="block text-sm font-medium mb-1" htmlFor="institution_name"> 
              Institution Name 
            </label>      
            <input
              type="text" 
              id="institution_name"  
              value={data.institution_name || ""} 
              onChange={(e) => setData("institution_name", e.target.value)}  
              className="w-full border border-gray-300 rounded px-3 py-2" 
            />   
            {errors.institution_name && <p className="text-red-500 text-sm mt-1">{errors.institution_name}</p>}   
          </div>  
          <div>   
            <label className="block text-sm font-medium mb-1" htmlFor="graduation_year">
              Graduation Year 
            </label>      
            <input
              type="number" 
              id="graduation_year"  
              value={data.graduation_year || ""} 
              onChange={(e) => setData("graduation_year", Number(e.target.value))}  
              className="w-full border border-gray-300 rounded px-3 py-2" 
            />   
            {errors.graduation_year && <p className="text-red-500 text-sm mt-1">{errors.graduation_year}</p>}   
          </div>  
          <div>   
            <label className="block text-sm font-medium mb-1" htmlFor="business_type">
              Business Type 
            </label>      
            <input
              type="text" 
              id="business_type"  
              value={data.business_type} 
              onChange={(e) => setData("business_type", e.target.value)}  
              className="w-full border border-gray-300 rounded px-3 py-2" 
            />   
            {errors.business_type && <p className="text-red-500 text-sm mt-1">{errors.business_type}</p>}   
          </div>  
          <div>   
            <label className="block text-sm font-medium mb-1" htmlFor="business_description">
              Business Description    
            </label>      
            <textarea
              id="business_description" 
              value={data.business_description} 
              onChange={(e) => setData("business_description", e.target.value)}  
              className="w-full border border-gray-300 rounded px-3 py-2" 
            ></textarea>   
            {errors.business_description && <p className="text-red-500 text-sm mt-1">{errors.business_description}</p>}   
          </div>  
          <div>   
            <label className="block text-sm font-medium mb-1" htmlFor="requested_amount">
              Requested Amount
            </label>    
            <input
              type="number" 
              id="requested_amount" 
              value={data.requested_amount} 
              onChange={(e) => setData("requested_amount", Number(e.target.value))}   
              className="w-full border border-gray-300 rounded px-3 py-2" 
            />   
            {errors.requested_amount && <p className="text-red-500 text-sm mt-1">{errors.requested_amount}</p>}   
          </div>  
          <div>   
            <label className="block text-sm font-medium mb-1" htmlFor="business_plan">    
              Business Plan   
            </label>      
            <textarea
              id="business_plan"    
              value={data.business_plan}  
              onChange={(e) => setData("business_plan", e.target.value)}    
              className="w-full border border-gray-300 rounded px-3 py-2" 
            ></textarea>   
            {errors.business_plan && <p className="text-red-500 text-sm mt-1">{errors.business_plan}</p>} 
          </div>  
          <div>
            <button 
              type="submit"
              disabled={processing} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Application
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );  
}




