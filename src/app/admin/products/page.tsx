import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export default async function AdminProductsPage() {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
        redirect("/auth/login");
    }

    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <main className="min-h-screen p-8 bg-[url('/neon-grid-bg.jpg')] bg-cover bg-center text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-wide text-purple-400 drop-shadow-lg">
                    Admin – Products
                </h1>
                <Link
                    href="/admin/products/new"
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                    + Add New Product
                </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white/10 backdrop-blur-md border border-purple-600 rounded-2xl shadow-lg p-6 transform transition-transform hover:scale-105 hover:shadow-2xl"
                    >
                        <h2 className="text-2xl font-semibold text-purple-300 mb-2">{p.name}</h2>
                        <p className="text-gray-300 mb-2">Slug: {p.slug}</p>
                        <p className="text-white font-bold text-lg mb-4">${p.price}</p>

                        <div className="flex justify-between items-center">
                            <Link
                                href={`/admin/products/edit/${p.id}`}
                                className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black rounded-lg font-medium shadow hover:scale-105 transition-transform"
                            >
                                Edit
                            </Link>
                            <Link
                                href={`/admin/products/delete/${p.id}`}
                                className="px-4 py-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg font-medium shadow hover:scale-105 transition-transform"
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
