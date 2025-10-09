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

// small helper to create safe, unique filenames
function makeUniqueFilename(originalName: string) {
    const timestamp = Date.now();
    // sanitize original name (remove spaces / weird chars)
    const safe = originalName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9\-\._]/g, "");
    return `${timestamp}-${safe}`;
}

// small helper to slugify (if user doesn't provide slug)
function slugify(text = "") {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}


// ✅ CREATE product
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Basic fields
        const name = (formData.get("name") as string | null) || "";
        let slug = (formData.get("slug") as string | null) || "";
        const priceRaw = formData.get("price");
        const description = (formData.get("description") as string | null) || "";
        const categoriesRaw = (formData.get("categories") as string | null) || ""; // CSV or JSON

        // Validate required
        if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
        const price = Number(priceRaw ?? 0);
        if (Number.isNaN(price)) return NextResponse.json({ error: "Price must be a number" }, { status: 400 });

        // parse categories: accept JSON array or comma-separated string
        let categories: string[] = [];
        if (categoriesRaw) {
            try {
                const maybeJson = JSON.parse(categoriesRaw);
                if (Array.isArray(maybeJson)) categories = maybeJson.map((s) => String(s).trim()).filter(Boolean);
                else if (typeof maybeJson === "string") categories = [maybeJson.trim()];
            } catch {
                // not JSON — treat as CSV
                categories = categoriesRaw.split(",").map((s) => s.trim()).filter(Boolean);
            }
        }

        const normalizedSet = new Set<string>();
        const normalizedToDisplay = new Map<string, string>(); // normalized -> displayName (optional)
        for (const c of categories) {
            const norm = c.toLowerCase();
            if (!normalizedSet.has(norm)) {
                normalizedSet.add(norm);
                // optional: store a nicer display name, e.g. title-case
                const display = c
                    .toLowerCase()
                    .split(" ")
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ");
                normalizedToDisplay.set(norm, display);
            }
        }
        const normalizedCategories = Array.from(normalizedSet);

        // Files
        const glbFile = formData.get("glbFile") as File | null;
        const imageFile = formData.get("imageFile") as File | null;

        let modelPath = "";
        let thumbnail = "";

        // Save GLB into public/models with unique filename
        if (glbFile) {
            const glbBytes = Buffer.from(await glbFile.arrayBuffer());
            const glbDir = path.join(process.cwd(), "public", "models");
            if (!fs.existsSync(glbDir)) fs.mkdirSync(glbDir, { recursive: true });
            const glbName = makeUniqueFilename(glbFile.name);
            const glbDestination = path.join(glbDir, glbName);
            fs.writeFileSync(glbDestination, glbBytes);
            modelPath = `/models/${glbName}`;
        }

        // Save image into public/uploads with unique filename
        if (imageFile) {
            const imageBytes = Buffer.from(await imageFile.arrayBuffer());
            const imageDir = path.join(process.cwd(), "public", "uploads");
            if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });
            const imgName = makeUniqueFilename(imageFile.name);
            const imgDestination = path.join(imageDir, imgName);
            fs.writeFileSync(imgDestination, imageBytes);
            thumbnail = `/uploads/${imgName}`;
        }

        // if no slug provided, auto-generate from name
        if (!slug) slug = slugify(name);

        const connectCats: { id: number }[] = [];
        for (const normName of normalizedCategories) {
            // Try find by lowercase name - we assume you either stored lowercase names already,
            // or you want to search case-insensitively. For case-insensitive find, use a case-insensitive filter:
            let cat = await prisma.category.findFirst({
                where: { name: { equals: normName, mode: "insensitive" } }, // 'mode' works on Postgres, MySQL (if supported)
            });

            if (!cat) {
                // create with display name (title-case) or normalized name
                cat = await prisma.category.create({
                    data: { name: normName }, // or data: { name: normalizedToDisplay.get(normName) || normName }
                });
            }

            connectCats.push({ id: cat.id });
        }

        // When creating product:
        const product = await prisma.product.create({
            data: {
                name,
                slug,
                price,
                description,
                modelPath,
                thumbnail,
                colors: [],
                ...(connectCats.length ? { categories: { connect: connectCats } } : {}),
            },
            include: { categories: true },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (err: any) {
        console.error("POST /api/admin/products error:", err);
        // handle unique constraint errors (slug already exists)
        if (err?.code === "P2002" && err?.meta?.target?.includes("slug")) {
            return NextResponse.json({ error: "Slug already exists; choose another slug." }, { status: 409 });
        }
        return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
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
