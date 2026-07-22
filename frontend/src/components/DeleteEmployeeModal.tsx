import { Employee } from "../features/employee/employeeTypes";

interface Props {
    employee: Employee | null;
    open: boolean;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteEmployeeModal({
    employee,
    open,
    loading = false,
    onClose,
    onConfirm,
}: Props) {
    if (!open || !employee) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-[420px] p-6">

                <h2 className="text-2xl font-semibold">
                    Delete Employee
                </h2>

                <p className="mt-4 text-gray-600">
                    Are you sure you want to delete
                    <span className="font-semibold">
                        {" "}
                        {employee.name}
                    </span>
                    ?
                </p>

                <p className="text-red-500 mt-2">
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded border"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-5 py-2 rounded"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
}