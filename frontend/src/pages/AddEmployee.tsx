import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeForm, {
    EmployeeFormData,
} from "../components/EmployeeForm";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { createEmployee } from "../features/employee/employeeSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddEmployee() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const submit = async (data: EmployeeFormData) => {
        const result: any = await dispatch(createEmployee(data));

        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Employee Created Successfully");
            navigate("/employees");
        }
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                Add Employee
            </h1>

            <EmployeeForm
                onSubmit={submit}
                onCancel={() => navigate("/employees")}
            />
        </DashboardLayout>
    );
}