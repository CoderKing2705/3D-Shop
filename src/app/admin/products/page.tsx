import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export default async function AdminProductsPage() {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
        redirect("/auth/login")
    };

    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin – Products</h1>
            <Link
                href="/admin/products/new"
                className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
                + Add New Product
            </Link>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Slug</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id} className="border-b">
                            <td className="p-2">{p.name}</td>
                            <td className="p-2">${p.price}</td>
                            <td className="p-2">{p.slug}</td>
                            <td className="p-2 space-x-2">
                                <Link
                                    href={`/admin/products/edit/${p.id}`}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded-md"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={`/admin/products/delete/${p.id}`}
                                    className="px-2 py-1 bg-red-600 text-white rounded-md"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
