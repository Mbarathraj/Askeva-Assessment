import { useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { getDashboard } from "../features/dashboard/dashboardSlice";

import DashboardCards from "../components/DashboardCards";
import DepartmentChart from "../components/DepartmentChart";
import StatusChart from "../components/StatusChart";
import MonthlyChart from "../components/MonthlyChart";

export default function Dashboard() {
    const dispatch = useAppDispatch();

    const { dashboard, loading } = useAppSelector(
        (state) => state.dashboard
    );

    useEffect(() => {
        dispatch(getDashboard());
    }, [dispatch]);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-64">
                    Loading...
                </div>
            </DashboardLayout>
        );
    }

    if (!dashboard) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-64">
                    No Data Found
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                Dashboard
            </h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">

                <DashboardCards
                    title="Total Employees"
                    value={dashboard.totalEmployees}
                    color="bg-blue-600"
                />

                <DashboardCards
                    title="Active"
                    value={dashboard.activeEmployees}
                    color="bg-green-600"
                />

                <DashboardCards
                    title="Inactive"
                    value={dashboard.inactiveEmployees}
                    color="bg-red-600"
                />

                <DashboardCards
                    title="On Leave"
                    value={dashboard.onLeaveEmployees}
                    color="bg-yellow-500"
                />

            </div>

            {/* Department Chart */}
            <div className="mt-6 lg:mt-8">
                <DepartmentChart
                    data={dashboard.departmentWise}
                />
            </div>

            {/* Other Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6 lg:mt-8">

                <StatusChart
                    data={dashboard.statusDistribution}
                />

                <MonthlyChart
                    data={dashboard.monthlyJoined}
                />

            </div>

        </DashboardLayout>
    );
}