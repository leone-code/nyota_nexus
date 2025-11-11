import { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import applications from "@/routes/applications";
import axios from "axios";

// ✅ Define proper type for wards
interface Ward {
  id: number;
  ward_name: string;
  county_name: string;
}

export default function CreateApplication() {
  // ✅ Strongly typed useState hooks
  const [wards, setWards] = useState<Ward[]>([]);
  const [loadingWards, setLoadingWards] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Ward[]>("/api/wards")
      .then((res) => {
        setWards(res.data);
        setLoadingWards(false);
      })
      .catch(() => setLoadingWards(false));
  }, []);

  const { data, setData, post, processing, errors } = useForm({
    ward_id: "",
    date_of_birth: "",
    id_number: "",
    phone: "",
    address: "",
    education_level: "",
    institution_name: "",
    graduation_year: "",
    business_type: "",
    business_description: "",
    requested_amount: "",
    business_plan: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(applications.store().url);
  };

  return (
    <AppLayout>
      <Head title="Create Application" />

      <div className="container mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
          Submit New Application
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Ward */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ward *
            </label>
            {loadingWards ? (
              <div className="text-gray-500 dark:text-gray-400">Loading wards...</div>
            ) : (
              <select
                name="ward_id"
                value={data.ward_id}
                onChange={(e) => setData("ward_id", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Ward</option>
                {wards.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.ward_name} - {ward.county_name}
                  </option>
                ))}
              </select>
            )}
            {errors.ward_id && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.ward_id}
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={data.date_of_birth}
              onChange={(e) => setData("date_of_birth", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            {errors.date_of_birth && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.date_of_birth}
              </div>
            )}
          </div>

          {/* ID Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              National ID
            </label>
            <input
              type="text"
              name="id_number"
              value={data.id_number}
              onChange={(e) => setData("id_number", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            {errors.id_number && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.id_number}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={(e) => setData("phone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            {errors.phone && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.phone}
              </div>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address *
            </label>
            <textarea
              name="address"
              value={data.address}
              onChange={(e) => setData("address", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={2}
              required
            />
            {errors.address && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.address}
              </div>
            )}
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Education Level *
            </label>
            <select
              name="education_level"
              value={data.education_level}
              onChange={(e) => setData("education_level", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
            {errors.education_level && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.education_level}
              </div>
            )}
          </div>

          {/* Institution Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Institution Name
            </label>
            <input
              type="text"
              name="institution_name"
              value={data.institution_name}
              onChange={(e) => setData("institution_name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            {errors.institution_name && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.institution_name}
              </div>
            )}
          </div>

          {/* Graduation Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Graduation Year
            </label>
            <input
              type="number"
              name="graduation_year"
              value={data.graduation_year}
              onChange={(e) => setData("graduation_year", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="1950"
              max={new Date().getFullYear()}
            />
            {errors.graduation_year && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.graduation_year}
              </div>
            )}
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Business Type *
            </label>
            <input
              type="text"
              name="business_type"
              value={data.business_type}
              onChange={(e) => setData("business_type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
            {errors.business_type && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.business_type}
              </div>
            )}
          </div>

          {/* Business Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Business Description *
            </label>
            <textarea
              name="business_description"
              value={data.business_description}
              onChange={(e) => setData("business_description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={4}
              required
            ></textarea>
            {errors.business_description && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.business_description}
              </div>
            )}
          </div>

          {/* Requested Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Requested Amount (Ksh) *
            </label>
            <input
              type="number"
              name="requested_amount"
              value={data.requested_amount}
              onChange={(e) => setData("requested_amount", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
              step="0.01"
              required
            />
            {errors.requested_amount && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.requested_amount}
              </div>
            )}
          </div>

          {/* Business Plan */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Business Plan *
            </label>
            <textarea
              name="business_plan"
              value={data.business_plan}
              onChange={(e) => setData("business_plan", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={6}
              required
            ></textarea>
            {errors.business_plan && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">
                {errors.business_plan}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-right mt-4">
            <button
              type="submit"
              disabled={processing}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-6 py-2 rounded-md shadow-sm transition-colors"
            >
              {processing ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
