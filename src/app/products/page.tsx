// app/products/page.tsx
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";

export default async function ProductsPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/login");

    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <>
            <Navbar />
            <main className="pt-20 px-6 md:px-12 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">
                    Our Products
                </h1>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {/* Reduced gap */}
                    {products.map((product: any) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/10 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
                        >
                            <div className="relative aspect-square w-full">
                                <Image
                                    src={product.thumbnail}
                                    alt={product.name}
                                    fill
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>

                            <div className="p-4 flex flex-col justify-between flex-1 bg-white/5 dark:bg-gray-900/20">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                                    {product.name}
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                                    ${product.price}
                                </p>
                                <button className="mt-4 w-full py-3 bg-purple-600 text-white rounded-xl font-semibold text-base hover:bg-purple-700 transition">
                                    View Product
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}
