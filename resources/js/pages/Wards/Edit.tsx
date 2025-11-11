import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

interface Ward {
  id: number;
  ward_name: string;
  county_name: string;
  ward_code: string;
  ward_officer_id?: number;
  description?: string;
}

interface Props {
  ward: Ward;
}

export default function Edit({ ward }: Props) {
  // ✅ Typed users array
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("/api/users")
      .then((res) => setUsers(res.data))
      .catch(() => {});
  }, []);

  const { data, setData, put, processing, errors } = useForm({
    ward_name: ward.ward_name || "",
    county_name: ward.county_name || "",
    ward_code: ward.ward_code || "",
    ward_officer_id: ward.ward_officer_id || "",
    description: ward.description || "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/wards/${ward.id}`);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Wards", href: "/wards" },
    { title: "Edit Ward", href: `/wards/${ward.id}/edit` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Ward" />

      <div className="container mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Edit Ward</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ward Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ward Name *</label>
            <input
              type="text"
              value={data.ward_name}
              onChange={(e) => setData("ward_name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
            {errors.ward_name && <div className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.ward_name}</div>}
          </div>

          {/* County Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">County Name *</label>
            <input
              type="text"
              value={data.county_name}
              onChange={(e) => setData("county_name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
            {errors.county_name && <div className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.county_name}</div>}
          </div>

          {/* Ward Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ward Code *</label>
            <input
              type="text"
              value={data.ward_code}
              onChange={(e) => setData("ward_code", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
            {errors.ward_code && <div className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.ward_code}</div>}
          </div>

          {/* Ward Officer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ward Officer</label>
            <select
              value={data.ward_officer_id}
              onChange={(e) => setData("ward_officer_id", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Officer</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.ward_officer_id && <div className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.ward_officer_id}</div>}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={3}
            ></textarea>
            {errors.description && <div className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.description}</div>}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-right mt-4">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-6 py-2 rounded-md shadow-sm transition-colors"
            >
              {processing ? "Updating..." : "Update Ward"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
