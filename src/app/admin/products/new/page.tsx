"use client";
import { useState } from "react";

export default function NewProductForm() {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [glbFile, setGlbFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug);
        formData.append("price", price);
        formData.append("description", description);
        if (glbFile) formData.append("glbFile", glbFile);
        if (imageFile) formData.append("imageFile", imageFile);

        await fetch("/api/admin/products", {
            method: "POST",
            body: formData,
        });

        window.location.href = "/admin/products";
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/form_background.jpg')" }}>
            <form
                onSubmit={handleSubmit}
                className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 transform transition-transform hover:scale-105 duration-300"
                style={{marginBottom:"5%"}}
            >
                <h1 className="text-3xl font-extrabold text-gray-900 text-center">
                    Add Product
                </h1>

                {/* Name */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Name"
                        className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-900 placeholder-transparent transition-all"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label className="absolute left-0 -top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500">
                        Name
                    </label>
                </div>

                {/* Slug */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Slug"
                        className="peer w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2 text-gray-900 placeholder-transparent transition-all"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                    <label className="absolute left-0 -top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-500">
                        Slug
                    </label>
                </div>

                {/* Price */}
                <div className="relative">
                    <input
                        type="number"
                        placeholder="Price"
                        className="peer w-full border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2 text-gray-900 placeholder-transparent transition-all"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <label className="absolute left-0 -top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink-500">
                        Price
                    </label>
                </div>

                {/* Description */}
                <div className="relative">
                    <textarea
                        placeholder="Description"
                        className="peer w-full border-b-2 border-gray-300 focus:border-green-500 outline-none py-2 text-gray-900 placeholder-transparent transition-all resize-none h-24"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label className="absolute left-0 -top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-green-500">
                        Description
                    </label>
                </div>

                {/* GLB File */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        3D Model (.glb)
                    </label>
                    <input
                        type="file"
                        accept=".glb"
                        onChange={(e) => e.target.files && setGlbFile(e.target.files[0])}
                        className="w-full border rounded-md p-2 focus:ring-2 focus:ring-purple-400"
                        required
                    />
                </div>

                {/* Image File */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Product Image (.png, .jpg, .jpeg)
                    </label>
                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) =>
                            e.target.files && setImageFile(e.target.files[0])
                        }
                        className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-400"
                        required
                    />
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    Save Product
                </button>
            </form>
        </div>
    );
}
