import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { getEmployees } from "../features/employee/employeeSlice";
import EmployeeTable from "../components/EmployeeTable";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { Employee } from "../features/employee/employeeTypes";
import DeleteEmployeeModal from "../components/DeleteEmployeeModal";
import toast from "react-hot-toast";
import { deleteEmployee } from "../features/employee/employeeSlice";

export default function Employees() {
    const dispatch = useAppDispatch();

    const { employees, pagination, loading } = useAppSelector(
        (state) => state.employee
    );

    const [selectedEmployee, setSelectedEmployee] =
        useState<Employee | null>(null);

    const [openDeleteModal, setOpenDeleteModal] =
        useState(false);
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");

    const [department, setDepartment] = useState("");

    const [status, setStatus] = useState("");
    const handleDelete = async () => {

        if (!selectedEmployee) return;

        const result: any = await dispatch(
            deleteEmployee(selectedEmployee._id)
        );

        if (result.meta.requestStatus === "fulfilled") {

            toast.success("Employee Deleted");

            setOpenDeleteModal(false);

            setSelectedEmployee(null);

        }

    };
    useEffect(() => {
        const fetchEmployees = async () => {
            dispatch(
                getEmployees({
                    page,
                    limit: 10,
                    search,
                    department,
                    status,
                })
            );
        };

        fetchEmployees();

    }, [page, search, department, status, dispatch]);

    return (
        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Employees
                </h1>

                <Link
                    to="/employees/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Add Employee
                </Link>

            </div>

            <SearchBar
                search={search}
                setSearch={(value) => {
                    setPage(1);
                    setSearch(value);
                }}
            />


            <FilterBar
                department={department}
                setDepartment={(value) => {
                    setPage(1);
                    setDepartment(value);
                }}
                status={status}
                setStatus={(value) => {
                    setPage(1);
                    setStatus(value);
                }}
            />

            <EmployeeTable
                employees={employees}
                loading={loading}
                onDelete={(employee) => {
                    setSelectedEmployee(employee);
                    setOpenDeleteModal(true);
                }}
            />

            <DeleteEmployeeModal
                employee={selectedEmployee}
                open={openDeleteModal}
                onClose={() => {
                    setOpenDeleteModal(false);
                    setSelectedEmployee(null);
                }}
                onConfirm={handleDelete}
            />
            {pagination && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={pagination.totalPages}
                />
            )}

        </DashboardLayout>
    );
}