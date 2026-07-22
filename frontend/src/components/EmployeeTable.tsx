import { Employee } from "../features/employee/employeeTypes";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  employees: Employee[];
  loading: boolean;
  onDelete: (employee: Employee) => void;
}

const statusDot: Record<string, string> = {
  Active: "bg-green-500",
  Inactive: "bg-red-500",
};

const statusText: Record<string, string> = {
  Active: "text-green-700 bg-green-50 ring-1 ring-green-600/20",
  Inactive: "text-red-700 bg-red-50 ring-1 ring-red-600/20",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const avatarPalette = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
];

function avatarColor(id: string) {
  const sum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
}

export default function EmployeeTable({ employees, loading, onDelete }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-500">
        <div className="h-8 w-8 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-3" />
        <p className="text-sm">Loading employees...</p>
      </div>
    );
  }

  if (!employees.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-500 bg-white rounded-xl shadow-sm border border-slate-100">
        <p className="text-base font-medium text-slate-700">No employees found</p>
        <p className="text-sm mt-1">Try adjusting your filters or add a new employee.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop / tablet: table */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-left font-semibold text-slate-600">Employee</th>
                <th className="p-4 text-left font-semibold text-slate-600">Department</th>
                <th className="p-4 text-left font-semibold text-slate-600">Designation</th>
                <th className="p-4 text-left font-semibold text-slate-600">Status</th>
                <th className="p-4 text-left font-semibold text-slate-600">Joining</th>
                <th className="p-4 text-right font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee._id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatarColor(
                          employee._id
                        )}`}
                      >
                        {initials(employee.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 whitespace-nowrap">
                          {employee.name}
                        </p>
                        <p className="text-xs text-slate-500 whitespace-nowrap">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 whitespace-nowrap">{employee.department}</td>
                  <td className="p-4 text-slate-600 whitespace-nowrap">{employee.designation}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        statusText[employee.status] ??
                        "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          statusDot[employee.status] ?? "bg-yellow-500"
                        }`}
                      />
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 whitespace-nowrap">
                    {new Date(employee.joiningDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        to={`/employees/edit/${employee._id}`}
                        title="Edit employee"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FaEdit size={16} />
                      </Link>
                      <button
                        onClick={() => onDelete(employee)}
                        title="Delete employee"
                        className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="sm:hidden space-y-3">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatarColor(
                    employee._id
                  )}`}
                >
                  {initials(employee.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 truncate">{employee.name}</p>
                  <p className="text-xs text-slate-500 truncate">{employee.email}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                  statusText[employee.status] ??
                  "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    statusDot[employee.status] ?? "bg-yellow-500"
                  }`}
                />
                {employee.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-2 mt-4 text-sm">
              <div>
                <p className="text-xs text-slate-400">Department</p>
                <p className="text-slate-700">{employee.department}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Designation</p>
                <p className="text-slate-700">{employee.designation}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Joining</p>
                <p className="text-slate-700">
                  {new Date(employee.joiningDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
              <Link
                to={`/employees/edit/${employee._id}`}
                className="flex items-center gap-1.5 text-blue-600 text-sm font-medium"
              >
                <FaEdit size={14} /> Edit
              </Link>
              <button
                onClick={() => onDelete(employee)}
                className="flex items-center gap-1.5 text-red-600 text-sm font-medium cursor-pointer"
              >
                <FaTrash size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}