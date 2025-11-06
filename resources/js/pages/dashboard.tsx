import AppLayout from '@/layouts/app-layout'; //a shared page wrapper. Ensures consistent layout across pages
import { dashboard } from '@/routes';
import applications from '@/routes/applications';
import { type BreadcrumbItem } from '@/types'; //type definition for breadcrumb items
import { Head, Link } from '@inertiajs/react';

// Define the breadcrumb navigation for the dashboard page
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: dashboard().url,
    },
];

// Define the props expected by the Dashboard component
interface Props {
    total_applications: number;
    pending_applications: number;
    approved_applications: number;
    total_disbursements: number;
    total_wards: number;
    total_allocations: number;
    total_utilized: number;
}

export default function Dashboard({
    total_applications,
    pending_applications,
    approved_applications,
    total_disbursements,
    total_wards,
    total_allocations,
    total_utilized,
}: Props) {
    const balance = total_allocations - total_utilized;

    return (
        // Use the AppLayout component to wrap the dashboard content
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="container mx-auto mt-4 p-6">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Applications</h3>
                        <p className="text-3xl font-bold text-blue-600">{total_applications}</p>
                        <Link href={applications.index().url} className="text-sm text-blue-500 hover:underline mt-2 inline-block">
                            View All →
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Pending Applications</h3>
                        <p className="text-3xl font-bold text-yellow-600">{pending_applications}</p>
                        <Link href={applications.index().url} className="text-sm text-yellow-500 hover:underline mt-2 inline-block">
                            Review →
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Approved Applications</h3>
                        <p className="text-3xl font-bold text-green-600">{approved_applications}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Wards</h3>
                        <p className="text-3xl font-bold text-purple-600">{total_wards}</p>
                        <Link href="/wards" className="text-sm text-purple-500 hover:underline mt-2 inline-block">
                            Manage Wards →
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Fund Allocations</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Allocated:</span>
                                <span className="font-semibold">Ksh {total_allocations.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Utilized:</span>
                                <span className="font-semibold">Ksh {total_utilized.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                                <span className="text-gray-600">Balance:</span>
                                <span className={`font-bold ${balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    Ksh {balance.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <Link href="/fund-allocations" className="text-sm text-blue-500 hover:underline mt-4 inline-block">
                            Manage Allocations →
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Disbursements</h3>
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                Total Disbursements: <span className="font-semibold text-lg">{total_disbursements}</span>
                            </p>
                        </div>
                        <Link href="/disbursements" className="text-sm text-blue-500 hover:underline mt-4 inline-block">
                            Manage Disbursements →
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href="/applications/create"
                            className="btn btn-primary"
                        >
                            + New Application
                        </Link>
                        <Link
                            href="/disbursements/create"
                            className="btn btn-success"
                        >
                            + New Disbursement
                        </Link>
                        <Link
                            href="/fund-allocations/create"
                            className="btn btn-info"
                        >
                            + New Fund Allocation
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
