"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PageLoader from "./PageLoader";

export default function ProductGrid({ products }: { products: any[] }) {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
    };

    return (
        <>
            {loading && <PageLoader />}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={handleClick}
                        className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/10 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
                    >
                        <div className="relative aspect-square w-full">
                            <Image
                                src={product.thumbnail}
                                alt={product.name}
                                fill
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>

                        <div className="p-4 flex flex-col justify-between flex-1 bg-white/5 dark:bg-gray-900/20">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                                {product.name}
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                                ${product.price}
                            </p>
                            <button className="mt-4 w-full py-3 bg-purple-600 text-white rounded-xl font-semibold text-base hover:bg-purple-700 transition">
                                View Product
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
