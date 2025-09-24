// src/app/api/admin/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// ✅ GET all products
export async function GET() {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}

// ✅ CREATE product
export async function POST(req: NextRequest) {
    const data = await req.json();
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                modelPath: data.modelPath,
                thumbnail: data.thumbnail,
                colors: data.colors,
                slug: data.slug,
            },
        });
        return NextResponse.json(product, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

// ✅ UPDATE product
export async function PUT(req: NextRequest) {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    try {
        const product = await prisma.product.update({
            where: { id: data.id },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                modelPath: data.modelPath,
                thumbnail: data.thumbnail,
                colors: data.colors,
                slug: data.slug,
            },
        });
        return NextResponse.json(product);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

// ✅ DELETE product
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing product id" }, { status: 400 });

    try {
        await prisma.product.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: "Product deleted" });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
