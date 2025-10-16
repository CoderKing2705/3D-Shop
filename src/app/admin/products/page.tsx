import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import AdminProductFilters from "@/components/Admin/AdminProductFilters";
import AdminProductActions from "@/components/Admin/AdminProductActions";

export default async function AdminProductsPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>;
}) {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
        redirect("/auth/login");
    }

    const params = await searchParams;
    const q = params.q || "";
    const category = params.category || "";
    const minPrice = params.minPrice || "";
    const maxPrice = params.maxPrice || "";
    const sort = params.sort || "";

    // ✅ Type-safe orderBy
    let orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    if (sort === "price-desc") orderBy = { price: "desc" };
    if (sort === "oldest") orderBy = { createdAt: "asc" };

    const products = await prisma.product.findMany({
        where: {
            AND: [
                q
                    ? {
                        OR: [
                            { name: { contains: q, mode: "insensitive" } },
                            { slug: { contains: q, mode: "insensitive" } },
                        ],
                    }
                    : {},
                category ? { categories: { some: { name: category } } } : {},
                minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
                maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
            ],
        },
        orderBy,
        include: { categories: true },
    });


    return (
        <main className="min-h-screen p-8 bg-cover bg-center text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-wide text-purple-400 drop-shadow-lg">
                    Admin – Products
                </h1>
                <div className="flex gap-4">
                    <Link
                        href="/admin/analytics"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                    >
                        📊 Analytics
                    </Link>
                    <Link
                        href="/admin/products/new"
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                    >
                        + Add New Product
                    </Link>
                </div>
            </div>

            <AdminProductFilters />

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white/10 backdrop-blur-md border border-purple-600 rounded-2xl shadow-lg p-6 transform transition-transform hover:scale-105 hover:shadow-2xl"
                    >
                        <h2 className="text-2xl font-semibold text-purple-300 mb-2">{p.name}</h2>
                        <p className="text-gray-300 mb-2">Slug: {p.slug}</p>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-white font-bold text-lg">${p.price}</p>
                            {p.thumbnail && (
                                <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-purple-500">
                                    <Image
                                        src={p.thumbnail}
                                        alt={p.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        <AdminProductActions id={p.id} />
                    </div>
                ))}
            </div>
        </main>
    );
}
