import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "../features/employee/employeeTypes";

const employeeSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
  status: z.string().min(1, "Status is required"),
  joiningDate: z.string().min(1, "Joining date is required"),
  salary: z.coerce.number().min(1, "Salary is required"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

interface Props {
  defaultValues?: Partial<Employee>;
  onSubmit: (data: EmployeeFormData) => void;
  loading?: boolean;
  submitText?: string;
  onCancel?: () => void;
}

const inputClass = (hasError?: boolean) =>
  `border w-full rounded-lg p-2.5 mt-1.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
    hasError ? "border-red-400" : "border-slate-300"
  }`;

const labelClass = "text-sm font-medium text-slate-700";

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  loading = false,
  submitText = "Save Employee",
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof employeeSchema>, any, EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      phone: defaultValues?.phone ?? "",
      department: defaultValues?.department ?? "",
      designation: defaultValues?.designation ?? "",
      status: defaultValues?.status ?? "Active",
      joiningDate: defaultValues?.joiningDate
        ? defaultValues.joiningDate.substring(0, 10)
        : "",
      salary: defaultValues?.salary ?? 0,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8"
    >
      {/* Personal details */}
      <div>
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
          Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
          <div>
            <label className={labelClass}>Name</label>
            <input
              {...register("name")}
              placeholder="Full name"
              className={inputClass(!!errors.name)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              {...register("email")}
              placeholder="name@company.com"
              className={inputClass(!!errors.email)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input
              {...register("phone")}
              placeholder="9876543210"
              className={inputClass(!!errors.phone)}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      <hr className="my-7 border-slate-100" />

      {/* Job details */}
      <div>
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
          Job Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
          <div>
            <label className={labelClass}>Department</label>
            <select
              {...register("department")}
              className={inputClass(!!errors.department) + " bg-white"}
              defaultValue=""
            >
              <option value="">Select department</option>
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Operations</option>
              <option>Support</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">
                {errors.department.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Designation</label>
            <input
              {...register("designation")}
              placeholder="e.g. Software Engineer"
              className={inputClass(!!errors.designation)}
            />
            {errors.designation && (
              <p className="text-red-500 text-xs mt-1">
                {errors.designation.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              {...register("status")}
              className={inputClass(!!errors.status) + " bg-white"}
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Joining Date</label>
            <input
              type="date"
              {...register("joiningDate")}
              className={inputClass(!!errors.joiningDate)}
            />
            {errors.joiningDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.joiningDate.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Salary</label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                ₹
              </span>
              <input
                type="number"
                {...register("salary")}
                placeholder="0"
                className={`border w-full rounded-lg p-2.5 pl-7 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.salary ? "border-red-400" : "border-slate-300"
                }`}
              />
            </div>
            {errors.salary && (
              <p className="text-red-500 text-xs mt-1">{errors.salary.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition font-medium text-sm"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition font-medium text-sm flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {loading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}