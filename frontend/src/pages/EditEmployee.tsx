import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeForm, {
    EmployeeFormData,
} from "../components/EmployeeForm";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import {
    getEmployee,
    updateEmployee,
} from "../features/employee/employeeSlice";

import toast from "react-hot-toast";

export default function EditEmployee() {
    const { id } = useParams();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { employee, loading } = useAppSelector(
        state => state.employee
    );

    useEffect(() => {

        if (id) {
            dispatch(getEmployee(id));
        }

    }, [id]);

    const submit = async (
        data: EmployeeFormData
    ) => {

        if (!id) return;

        const result: any =
            await dispatch(
                updateEmployee({
                    id,
                    data,
                })
            );

        if (
            result.meta.requestStatus ===
            "fulfilled"
        ) {

            toast.success(
                "Employee Updated Successfully"
            );

            navigate("/employees");

        }

    };

    if (!employee) {

        return (
            <DashboardLayout>

                <div className="text-center py-10">

                    Loading...

                </div>

            </DashboardLayout>
        );

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-6">

                Edit Employee

            </h1>

            <EmployeeForm
                defaultValues={employee}
                onSubmit={submit}
                submitText="Update Employee"
                onCancel={() => navigate("/employees")}
            />

        </DashboardLayout>

    );
}