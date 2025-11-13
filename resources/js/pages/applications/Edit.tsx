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

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit Application</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ward */}
          <div>
            <label className="form-label">Ward *</label>
            <select
              name="ward_id"
              value={data.ward_id}
              onChange={(e) => setData("ward_id", e.target.value)}
              className="form-control w-full"
              required
            >
              <option value="">Select Ward</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.ward_name} - {ward.county_name}
                </option>
              ))}
            </select>
            {errors.ward_id && <div className="text-danger text-sm">{errors.ward_id}</div>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={data.date_of_birth}
              onChange={(e) => setData("date_of_birth", e.target.value)}
              className="form-control w-full"
            />
            {errors.date_of_birth && <div className="text-danger text-sm">{errors.date_of_birth}</div>}
          </div>

          {/* ID Number */}
          <div>
            <label className="form-label">National ID</label>
            <input
              type="text"
              name="id_number"
              value={data.id_number}
              onChange={(e) => setData("id_number", e.target.value)}
              className="form-control w-full"
            />
            {errors.id_number && <div className="text-danger text-sm">{errors.id_number}</div>}
          </div>

          {/* Phone */}
          <div>
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={(e) => setData("phone", e.target.value)}
              className="form-control w-full"
            />
            {errors.phone && <div className="text-danger text-sm">{errors.phone}</div>}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="form-label">Address *</label>
            <textarea
              name="address"
              value={data.address}
              onChange={(e) => setData("address", e.target.value)}
              className="form-control w-full"
              rows={2}
              required
            />
            {errors.address && <div className="text-danger text-sm">{errors.address}</div>}
          </div>

          {/* Education Level */}
          <div>
            <label className="form-label">Education Level *</label>
            <select
              name="education_level"
              value={data.education_level}
              onChange={(e) => setData("education_level", e.target.value)}
              className="form-control w-full"
              required
            >
              <option value="">Select Level</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </select>
            {errors.education_level && <div className="text-danger text-sm">{errors.education_level}</div>}
          </div>

          {/* Institution Name */}
          <div>
            <label className="form-label">Institution Name</label>
            <input
              type="text"
              name="institution_name"
              value={data.institution_name}
              onChange={(e) => setData("institution_name", e.target.value)}
              className="form-control w-full"
            />
            {errors.institution_name && <div className="text-danger text-sm">{errors.institution_name}</div>}
          </div>

          {/* Graduation Year */}
          <div>
            <label className="form-label">Graduation Year</label>
            <input
              type="number"
              name="graduation_year"
              value={data.graduation_year}
              onChange={(e) => setData("graduation_year", e.target.value)}
              className="form-control w-full"
              min="1950"
              max={new Date().getFullYear()}
            />
            {errors.graduation_year && <div className="text-danger text-sm">{errors.graduation_year}</div>}
          </div>

          {/* Business Type */}
          <div>
            <label className="form-label">Business Type *</label>
            <input
              type="text"
              name="business_type"
              value={data.business_type}
              onChange={(e) => setData("business_type", e.target.value)}
              className="form-control w-full"
              required
            />
            {errors.business_type && <div className="text-danger text-sm">{errors.business_type}</div>}
          </div>

          {/* Business Description */}
          <div className="md:col-span-2">
            <label className="form-label">Business Description *</label>
            <textarea
              name="business_description"
              value={data.business_description}
              onChange={(e) => setData("business_description", e.target.value)}
              className="form-control w-full"
              rows={4}
              required
            />
            {errors.business_description && <div className="text-danger text-sm">{errors.business_description}</div>}
          </div>

          {/* Requested Amount */}
          <div>
            <label className="form-label">Requested Amount (Ksh) *</label>
            <input
              type="number"
              name="requested_amount"
              value={data.requested_amount}
              onChange={(e) => setData("requested_amount", e.target.value)}
              className="form-control w-full"
              min="0"
              step="0.01"
              required
            />
            {errors.requested_amount && <div className="text-danger text-sm">{errors.requested_amount}</div>}
          </div>

          {/* Business Plan */}
          <div className="md:col-span-2">
            <label className="form-label">Business Plan *</label>
            <textarea
              name="business_plan"
              value={data.business_plan}
              onChange={(e) => setData("business_plan", e.target.value)}
              className="form-control w-full"
              rows={6}
              required
            />
            {errors.business_plan && <div className="text-danger text-sm">{errors.business_plan}</div>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-right mt-4">
            <button
              type="submit"
              disabled={processing}
              className="btn btn-primary px-4 py-2 rounded"
            >
              {processing ? "Updating..." : "Update Application"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}



