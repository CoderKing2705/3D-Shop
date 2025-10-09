// app/products/page.tsx
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";

export default async function ProductsPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/login");

    // ✅ fetch products from DB
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" }, // optional: newest first
    });

    return (
        <>
            <Navbar />
            <main className="pt-20 p-6">
                <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {products.map((product: any) => (
                        <Link
                            // ✅ use product.slug here instead of id
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="group block bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden hover:bg-white/20 hover:border-white/30 transition-all shadow-lg hover:shadow-xl"
                        >
                            <div className="aspect-square relative">
                                <Image
                                    src={product.thumbnail}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-white">
                                    {product.name}
                                </h2>
                                <p className="text-gray-200">${product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}
