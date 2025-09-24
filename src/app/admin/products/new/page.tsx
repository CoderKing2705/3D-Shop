"use client";
import { useState } from "react";

export default function NewProductForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [slug, setSlug] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await fetch("/api/admin/products", {
            method: "POST",
            body: JSON.stringify({ name, price: parseFloat(price), slug }),
        });
        window.location.href = "/admin/products";
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">Add Product</h1>
            <input
                type="text"
                placeholder="Name"
                className="w-full border p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Slug"
                className="w-full border p-2"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                className="w-full border p-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Save
            </button>
        </form>
    );
}
