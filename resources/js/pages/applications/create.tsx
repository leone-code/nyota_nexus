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

          {/* ... the rest of your form remains unchanged ... */}

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
