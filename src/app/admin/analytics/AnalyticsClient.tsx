// app/admin/analytics/AnalyticsClient.tsx
"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type CategoryItem = { name: string; value: number };

export default function AnalyticsClient({ categoryDistribution }: { categoryDistribution: CategoryItem[] }) {
    const labels = categoryDistribution.map((c) => c.name);
    const values = categoryDistribution.map((c) => c.value);

    const pieOptions: ApexOptions = useMemo(
        () => ({
            labels,
            legend: { position: "bottom", labels: { colors: "#e5e7eb" } },
            tooltip: { theme: "dark" },
            dataLabels: { enabled: true },
            stroke: { colors: ["transparent"] },
            colors: ["#a78bfa", "#f97316", "#06b6d4", "#34d399", "#f43f5e", "#f59e0b"],
        }),
        [labels]
    );

    const barOptions: ApexOptions = useMemo(
        () => ({
            chart: { toolbar: { show: false }, zoom: { enabled: false } },
            plotOptions: { bar: { borderRadius: 8, distributed: false } },
            xaxis: { categories: labels, labels: { style: { colors: "#e5e7eb" } } },
            yaxis: { labels: { style: { colors: "#e5e7eb" } } },
            grid: { borderColor: "#374151" },
            tooltip: { theme: "dark" },
            colors: ["#60a5fa"],
        }),
        [labels]
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-2xl shadow">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Products by Category (Pie)</h3>
                <Chart options={pieOptions} series={values} type="pie" height={320} />
            </div>

            <div className="col-span-1 md:col-span-2 bg-white/10 p-6 rounded-2xl shadow">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Products by Category (Bar)</h3>
                <Chart options={barOptions} series={[{ name: "Count", data: values }]} type="bar" height={380} />
            </div>
        </div>
    );
}
