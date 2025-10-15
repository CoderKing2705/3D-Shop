import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// Get single product by ID
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const product = await prisma.product.findUnique({
        where: { id },
        include: { categories: true },
    });
    if (!product) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(product);
}

// Update existing product
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string;
        const price = Number(formData.get("price"));
        const description = formData.get("description") as string;
        const categoriesInput = formData.get("categories") as string;

        const imageFile = formData.get("imageFile") as File | null;
        const glbFile = formData.get("glbFile") as File | null;

        let thumbnail = undefined;
        let modelPath = undefined;

        if (imageFile) {
            const imageBytes = Buffer.from(await imageFile.arrayBuffer());
            const imageDir = path.join(process.cwd(), "public/uploads");
            if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });
            const imagePath = path.join(imageDir, imageFile.name);
            fs.writeFileSync(imagePath, imageBytes);
            thumbnail = `/uploads/${imageFile.name}`;
        }

        if (glbFile) {
            const glbBytes = Buffer.from(await glbFile.arrayBuffer());
            const modelDir = path.join(process.cwd(), "public/models");
            if (!fs.existsSync(modelDir)) fs.mkdirSync(modelDir, { recursive: true });
            const modelPathFull = path.join(modelDir, glbFile.name);
            fs.writeFileSync(modelPathFull, glbBytes);
            modelPath = `/models/${glbFile.name}`;
        }

        // handle categories
        const categoryNames = categoriesInput
            ? categoriesInput.split(",").map((c) => c.trim().toLowerCase())
            : [];

        const connectOrCreateCats = categoryNames.map((name) => ({
            where: { name },
            create: { name },
        }));

        const updated = await prisma.product.update({
            where: { id },
            data: {
                name,
                slug,
                price,
                description,
                ...(thumbnail && { thumbnail }),
                ...(modelPath && { modelPath }),
                categories: { connectOrCreate: connectOrCreateCats },
            },
            include: { categories: true },
        });

        return NextResponse.json(updated);
    } catch (err: any) {
        console.error("PUT error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // 🧹 Delete model file if exists
        if (product.modelPath) {
            const modelPath = path.join(process.cwd(), "public", product.modelPath);
            if (fs.existsSync(modelPath)) fs.unlinkSync(modelPath);
        }

        // 🧹 Delete thumbnail if exists
        if (product.thumbnail) {
            const thumbPath = path.join(process.cwd(), "public", product.thumbnail);
            if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
        }

        // 🗑️ Delete product from database
        await prisma.product.delete({ where: { id } });

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (err: any) {
        console.error("Delete Error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
