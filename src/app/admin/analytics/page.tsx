"use client";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
    // Example mock data
    const salesData = [
        { month: "Jan", sales: 1200 },
        { month: "Feb", sales: 2100 },
        { month: "Mar", sales: 800 },
        { month: "Apr", sales: 1600 },
        { month: "May", sales: 2400 },
    ];

    const categoryData = [
        { name: "Café", value: 40 },
        { name: "Restaurant", value: 25 },
        { name: "Bakery", value: 20 },
        { name: "Other", value: 15 },
    ];

    const COLORS = ["#a855f7", "#f43f5e", "#3b82f6", "#22c55e"];

    return (
        <main className="min-h-screen p-8 bg-cover bg-center text-white">
            <h1 className="text-4xl font-extrabold text-purple-400 mb-8">📊 Analytics Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Sales Line Chart */}
                <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold text-purple-300 mb-4">Monthly Sales</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <Line type="monotone" dataKey="sales" stroke="#a855f7" strokeWidth={3} />
                            <CartesianGrid stroke="#555" strokeDasharray="5 5" />
                            <XAxis dataKey="month" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Pie Chart */}
                <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold text-purple-300 mb-4">Product Categories</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Sales Bar Chart */}
                <div className="col-span-1 md:col-span-2 bg-white/10 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold text-purple-300 mb-4">Sales Comparison</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                            <XAxis dataKey="month" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip />
                            <Bar dataKey="sales" fill="#f43f5e" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </main>
    );
}
