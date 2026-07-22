import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Cell,
} from "recharts";

interface Props {
    data: {
        department: string;
        count: number;
    }[];
}

const PALETTE = [
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
    "#0ea5e9",
    "#14b8a6",
];

function CustomTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
}) {
    if (!active || !payload || !payload.length) return null;
    return (
        <div className="rounded-lg bg-slate-900 px-3.5 py-2.5 shadow-xl">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="mt-0.5 text-lg font-semibold text-white tabular-nums">
                {payload[0].value.toLocaleString()}
                <span className="ml-1 text-xs font-normal text-slate-400">
                    employees
                </span>
            </p>
        </div>
    );
}

export default function DepartmentChart({ data }: Props) {
    const total = data.reduce((sum, d) => sum + d.count, 0);
    const top = data.reduce(
        (max, d) => (d.count > max.count ? d : max),
        data[0]
    );

    return (
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Department wise employees
                    </h2>
                    <p className="mt-0.5 text-sm text-slate-500">
                        {total.toLocaleString()} employees across{" "}
                        {data.length} departments
                    </p>
                </div>
                {top && (
                    <div className="text-right">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Largest
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                            {top.department}
                        </p>
                    </div>
                )}
            </div>

            <ResponsiveContainer width="100%" height={340}>
                <BarChart
                    data={data}
                    margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                    barCategoryGap="28%"
                >
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 6"
                        stroke="#e2e8f0"
                    />

                    <XAxis
                        dataKey="department"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12.5 }}
                        dy={8}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        width={40}
                    />

                    <Tooltip
                        cursor={{ fill: "#f1f5f9" }}
                        content={<CustomTooltip />}
                    />

                    <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={56}>
                        {data.map((entry, index) => (
                            <Cell
                                key={entry.department}
                                fill={PALETTE[index % PALETTE.length]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}