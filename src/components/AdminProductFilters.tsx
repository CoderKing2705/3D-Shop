"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [sort, setSort] = useState(searchParams.get("sort") || "");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        // Fetch categories dynamically
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch(() => console.error("Failed to load categories"));
    }, []);

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (query) params.set("q", query);
        if (category) params.set("category", category);
        if (sort) params.set("sort", sort);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);

        startTransition(() => {
            router.replace(`/admin/products?${params.toString()}`);
        });
    };

    const clearFilters = () => {
        setQuery("");
        setCategory("");
        setSort("");
        setMinPrice("");
        setMaxPrice("");
        startTransition(() => {
            router.replace(`/admin/products`);
        });
    };

    return (
        <div className="flex flex-wrap gap-4 mb-8 bg-white/5 p-4 rounded-xl border border-gray-700">
            {/* Search */}
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-4 py-2 w-64 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
            />

            {/* Category */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white"
            >
                <option value="">All Categories</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                        {c.name}
                    </option>
                ))}
            </select>

            {/* Price Range */}
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-24 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
                />
                <span className="text-gray-400">–</span>
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-24 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
                />
            </div>

            {/* Sort */}
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white"
            >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
            </select>

            {/* Buttons */}
            <button
                onClick={applyFilters}
                disabled={isPending}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
            >
                {isPending ? "Applying..." : "Apply"}
            </button>

            <button
                onClick={clearFilters}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
                Clear
            </button>
        </div>
    );
}
