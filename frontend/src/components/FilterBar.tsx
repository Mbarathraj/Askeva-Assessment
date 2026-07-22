interface Props {
    department: string;
    status: string;
    setDepartment: (v: string) => void;
    setStatus: (v: string) => void;
}

export default function FilterBar({
    department,
    status,
    setDepartment,
    setStatus,
}: Props) {
    return (
        <div className="flex gap-4 mb-5">

            <select
                value={department}
                onChange={(e) =>
                    setDepartment(e.target.value)
                }
                className="border p-2 rounded"
            >
                <option value="">Department</option>

                <option>IT</option>

                <option>HR</option>

                <option>Finance</option>

                <option>Sales</option>

                <option>Marketing</option>

                <option>Operations</option>

                <option>Support</option>

            </select>

            <select
                value={status}
                onChange={(e) =>
                    setStatus(e.target.value)
                }
                className="border p-2 rounded"
            >
                <option value="">Status</option>

                <option>Active</option>

                <option>Inactive</option>

                <option>On Leave</option>

            </select>

        </div>
    );
}