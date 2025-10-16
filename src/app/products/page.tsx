// app/products/page.tsx
import Navbar from "../../components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import ProductGrid from "@/components/ProductGrid";

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

                <ProductGrid products={products} />
            </main>
        </>
    );
}
