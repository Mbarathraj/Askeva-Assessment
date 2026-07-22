import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

interface Props {
    data: {
        month: string;
        count: number;
    }[];
}

export default function MonthlyChart({
    data,
}: Props) {
    return (
        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-semibold mb-4">
                Monthly Joined Employees
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >
                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#2563eb"
                    />

                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}