import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell,
} from "recharts";

const COLORS = [
    "#16a34a",
    "#dc2626",
    "#eab308",
];

interface Props {
    data: {
        status: string;
        count: number;
    }[];
}

export default function StatusChart({
    data,
}: Props) {
    return (
        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-semibold mb-4">
                Employee Status
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >
                <PieChart>

                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="status"
                        outerRadius={100}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={
                                    COLORS[
                                        index %
                                            COLORS.length
                                    ]
                                }
                            />
                        ))}
                    </Pie>

                    <Legend />

                    <Tooltip />

                </PieChart>
            </ResponsiveContainer>

        </div>
    );
}