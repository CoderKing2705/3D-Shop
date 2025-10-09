// app/admin/analytics/page.tsx
import AnalyticsClient from "./AnalyticsClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma"; // adjust if you export default: `import prisma from "@/app/lib/prisma";`
import Link from "next/link";

export default async function AdminAnalyticsPage() {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") redirect("/auth/login");

    // Fetch categories along with product counts
    // This assumes Category has a `products` relation in Prisma schema
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            _count: { select: { products: true } },
        },
        orderBy: { name: "asc" },
    });

    // Map into the shapes the client expects
    const categoryDistribution = categories.map((c) => ({
        name: c.name,
        value: c._count.products,
    }));

    // If you want a fallback / include an "Uncategorized" bucket, you can compute it here

    return (
        <main className="min-h-screen p-8 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header + Back button */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
                        📊 Analytics
                    </h1>

                    <div className="flex gap-3">
                        <Link
                            href="/admin/products"
                            className="px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg shadow hover:scale-105 transition"
                        >
                            ← Back to Products
                        </Link>
                    </div>
                </div>

                {categoryDistribution.length === 0 ? (
                    <div className="bg-white/10 p-6 rounded-2xl">No categories or products found.</div>
                ) : (
                    <AnalyticsClient categoryDistribution={categoryDistribution} />
                )}
            </div>
        </main>
    );
}
