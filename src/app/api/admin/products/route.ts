// src/app/api/admin/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { writeFile, writeFileSync } from "fs";
import path from "path";
import fs from "fs";

// ✅ GET all products
export async function GET() {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}

// ✅ CREATE product
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string;
        const price = Number(formData.get("price"));
        const description = formData.get("description") as string;

        const glbFile = formData.get("glbFile") as File | null;
        const imageFile = formData.get("imageFile") as File | null;

        let modelPath = "";
        let thumbnail = "";

        if (glbFile) {
            const glbBytes = Buffer.from(await glbFile.arrayBuffer());
            const glbDir = path.join(process.cwd(), "public/models");
            const glbPath = path.join(glbDir, glbFile.name);

            // Ensure folder exists
            if (!fs.existsSync(glbDir)) {
                fs.mkdirSync(glbDir, { recursive: true });
            }

            fs.writeFileSync(glbPath, glbBytes);
            modelPath = `/models/${glbFile.name}`;
        }

        // ✅ Save image file into /public/uploads
        if (imageFile) {
            const imageBytes = Buffer.from(await imageFile.arrayBuffer());
            const imageDir = path.join(process.cwd(), "public/uploads");
            const imagePath = path.join(imageDir, imageFile.name);

            // Ensure folder exists
            if (!fs.existsSync(imageDir)) {
                fs.mkdirSync(imageDir, { recursive: true });
            }

            fs.writeFileSync(imagePath, imageBytes);
            thumbnail = `/uploads/${imageFile.name}`;
        }

        const product = await prisma.product.create({
            data: { name, slug, price, description, modelPath, thumbnail, colors: [] },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (err: any) {
        console.error("Upload error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
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
