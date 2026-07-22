import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({
    children,
}: Props) {
    return (
        <div className="min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 lg:ml-64">

                <div className="pt-16 lg:pt-0">

                    <Navbar />

                    <main className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-64px)]">

                        {children}

                    </main>

                </div>

            </div>

        </div>
    );
}