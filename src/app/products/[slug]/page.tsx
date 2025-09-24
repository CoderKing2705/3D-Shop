
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import ProductClient from "./ProductClient";

export default async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    // ✅ get slug from URL
    const slug = params.slug;

    // ✅ Fetch product from DB using slug
    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            images: true,
            categories: true,
        },
    });

    if (!product) return notFound();

    // ✅ Pass to client component for rendering
    return <ProductClient product={product} />;
}
