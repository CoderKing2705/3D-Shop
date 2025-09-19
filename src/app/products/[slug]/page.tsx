"use client";

import ColorSwatches from "@/app/components/ColorSwatches";
import ProductViewer from "@/app/components/ProductViewer";
import { products } from "@/app/data/products";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // ✅ unwrap the params promise (Next.js 15+)
    const { slug } = use(params);

    // Find the product
    const product = products.find((p) => p.id === slug);
    if (!product) return notFound();

    // Client-side state for selected color
    const [color, setColor] = useState(product.colors[0]);

    return (
        <main className="max-w-7xl mx-auto p-6 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* LEFT: Product Info */}
                <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg text-gray-900">
                    {/* Title & Price */}
                    <div>
                        <h1 className="text-4xl font-bold">{product.name}</h1>
                        <p className="mt-2 text-2xl font-semibold text-purple-700">
                            ${product.price}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Description
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Colors */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Colors</h2>
                        <ColorSwatches
                            colors={product.colors}
                            selected={color}
                            onSelect={setColor}
                        />
                    </div>

                    {/* Add to Cart */}
                    <button className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl">
                        Add to Cart
                    </button>

                    {/* Features */}
                    <section className="mt-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>✔ High-quality materials</li>
                            <li>✔ Lightweight and durable</li>
                            <li>✔ Comfortable fit</li>
                            <li>✔ Multiple color options</li>
                            <li>✔ 3D interactive preview</li>
                        </ul>
                    </section>
                </div>

                {/* RIGHT: 3D Viewer */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden p-2">
                    <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
                        <ProductViewer modelPath={product.modelPath} color={color} />
                    </div>
                </div>
            </div>

            {/* Specifications Section */}
            <section className="mt-16 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg text-gray-900">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-gray-700">
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="py-3 font-medium">Material</td>
                                <td className="py-3">Breathable mesh + cushioned sole</td>
                            </tr>
                            <tr>
                                <td className="py-3 font-medium">Weight</td>
                                <td className="py-3">250g per shoe</td>
                            </tr>
                            <tr>
                                <td className="py-3 font-medium">Available Sizes</td>
                                <td className="py-3">US 6–12</td>
                            </tr>
                            <tr>
                                <td className="py-3 font-medium">Warranty</td>
                                <td className="py-3">1 year</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg text-gray-900">
                        <p className="font-semibold text-gray-900">John D.</p>
                        <p className="text-yellow-400">★★★★★</p>
                        <p className="text-gray-700 mt-2">
                            Very comfortable and stylish, perfect for running!
                        </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-gray-900">
                        <p className="font-semibold text-gray-900">Emily R.</p>
                        <p className="text-yellow-400">★★★★☆</p>
                        <p className="text-gray-700 mt-2">
                            Love the color options. Shipping was super fast.
                        </p>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((related) => (
                        <Link
                            key={related.id}
                            href={`/products/${related.id}`}
                            className="group block bg-white/10 backdrop-blur-md shadow rounded-lg overflow-hidden hover:shadow-lg transition"
                        >
                            <div className="aspect-square relative">
                                <Image
                                    src={related.thumbnail}
                                    alt={related.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{related.name}</h2>
                                <p className="text-gray-500">${related.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* FAQs Section */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
                <div className="space-y-4">
                    <details className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                        <summary className="font-medium text-gray-900 cursor-pointer">
                            Is this shoe true to size?
                        </summary>
                        <p className="mt-2 text-gray-700">
                            Yes, the shoes fit true to size. We recommend ordering your usual
                            size.
                        </p>
                    </details>
                    <details className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                        <summary className="font-medium text-gray-900 cursor-pointer">
                            Can I return or exchange?
                        </summary>
                        <p className="mt-2 text-gray-700">
                            Absolutely — free returns within 30 days.
                        </p>
                    </details>
                </div>
            </section>
        </main>
    );
}
