interface Props {
    title: string;
    value: number;
    color: string;
}

export default function DashboardCards({
    title,
    value,
    color
}: Props) {

    return (

        <div
            className={`rounded-xl shadow p-6 ${color} text-white`}>

            <h2 className="text-lg">

                {title}

            </h2>

            <h1 className="text-4xl font-bold mt-3">

                {value}

            </h1>

        </div>

    )

}