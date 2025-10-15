"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [glbFile, setGlbFile] = useState<File | null>(null);

    // Fetch existing product details
    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(`/api/admin/products/${id}`);
            const data = await res.json();
            if (res.ok) {
                setName(data.name);
                setSlug(data.slug);
                setPrice(data.price);
                setDescription(data.description);
                setCategories(data.categories?.map((c: any) => c.name).join(", ") || "");
            } else {
                alert("Failed to load product.");
            }
        }
        fetchProduct();
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("categories", categories);
        if (glbFile) formData.append("glbFile", glbFile);
        if (imageFile) formData.append("imageFile", imageFile);

        const res = await fetch(`/api/admin/products/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (res.ok) {
            alert("Product updated successfully!");
            router.push("/admin/products");
        } else {
            alert("Failed to update product.");
        }
    }

    return (
        <main className="min-h-screen p-8 bg-black/70 text-white">
            <h1 className="text-4xl font-bold mb-8 text-purple-400">Edit Product</h1>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                <div>
                    <label className="block mb-1 text-gray-300">Name</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-300">Slug</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-300">Price</label>
                    <input
                        type="number"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-300">Description</label>
                    <textarea
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-1 text-gray-300">Categories (comma separated)</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 text-gray-300">Thumbnail Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-gray-300">GLB Model</label>
                        <input type="file" accept=".glb" onChange={(e) => setGlbFile(e.target.files?.[0] || null)} />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:scale-105 transition-transform"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/admin/products")}
                        className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}
