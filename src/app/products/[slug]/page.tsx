"use client";

import ColorSwatches from "@/app/components/ColorSwatches";
import ProductViewer from "@/app/components/ProductViewer";
import { products } from "@/app/data/products";
import { notFound } from "next/navigation";
import { use, useState } from "react";

export default function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>; // params is now a Promise in Next.js 15+
}) {
    // ✅ unwrap the params promise
    const { slug } = use(params);

    // Find the product
    const product = products.find((p) => p.id === slug);
    if (!product) return notFound();

    // Client-side state for selected color
    const [color, setColor] = useState(product.colors[0]);

    return (
        <main className="max-w-7xl mx-auto p-6 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* 3D Viewer */}
                <div className="w-full h-[500px] md:h-[600px] rounded-2xl shadow-lg overflow-hidden bg-white">
                    <ProductViewer modelPath={product.modelPath} color={color} />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-6">
                    {/* Title & Price */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                        <p className="mt-2 text-2xl font-semibold text-purple-600">
                            ${product.price}
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Colors */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Colors</h2>
                        <ColorSwatches
                            colors={product.colors} // ✅ pass colors array
                            selected={color}
                            onSelect={setColor}
                        />
                    </div>

                    {/* Add to Cart */}
                    <button className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Optional Features / Details */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
                <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
                    <li>✔ High-quality materials</li>
                    <li>✔ Lightweight and durable</li>
                    <li>✔ Comfortable fit</li>
                    <li>✔ Available in multiple colors</li>
                    <li>✔ 3D interactive preview</li>
                </ul>
            </section>
        </main>
    );
}
