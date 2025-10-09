"use client";

import ColorSwatches from "@/components/ColorSwatches";
import ProductViewer from "@/components/ProductViewer";
import { useState } from "react";

export default function ProductClient({ product }: { product: any }) {
    // ✅ Ensure colors is an array
    const colors = Array.isArray(product.colors)
        ? product.colors
        : product.colors
            ? JSON.parse(product.colors)
            : [];

    // ✅ Set initial color
    const [color, setColor] = useState(colors[0] || "#ffffff");

    return (
        <main className="max-w-7xl mx-auto p-6 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* LEFT: Product Info */}
                <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg text-gray-900">
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <p className="mt-2 text-2xl font-semibold text-purple-700">
                        ${product.price}
                    </p>

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
                    {colors.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Colors
                            </h2>
                            <ColorSwatches
                                colors={colors}
                                selected={color}
                                onSelect={setColor}
                            />
                        </div>
                    )}

                    <button className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl">
                        Add to Cart
                    </button>
                </div>

                {/* RIGHT: 3D Viewer */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden p-2">
                    <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
                        <ProductViewer modelPath={product.modelPath} color={color} />
                    </div>
                </div>
            </div>
        </main>
    );
}
