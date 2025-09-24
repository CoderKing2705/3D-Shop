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
        <main className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">
                    Admin – Products
                </h1>
                <Link
                    href="/admin/products/new"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                    + Add New Product
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {p.name}
                            </h2>
                            <p className="text-gray-500 mb-4">Slug: {p.slug}</p>
                            <p className="text-gray-900 font-bold text-lg mb-4">${p.price}</p>

                            <div className="flex justify-between items-center">
                                <Link
                                    href={`/admin/products/edit/${p.id}`}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium shadow hover:bg-yellow-600 transition-colors"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={`/admin/products/delete/${p.id}`}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
