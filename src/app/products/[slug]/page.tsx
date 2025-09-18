"use client";

import ColorSwatches from "@/app/components/ColorSwatches";
import ProductViewer from "@/app/components/ProductViewer";
import { useState } from "react";

export default function ProductPage({ params }: { params: { slug: string } }) {
    // Default color for model material
    const [color, setColor] = useState("#ffffff");

    // Map slug to model path
    const modelPath = `/models/${params.slug}.glb`; // place model files in /public/models

    return (
        <main className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
                <ProductViewer modelPath={modelPath} color={color} />

                <div>
                    <h1 className="text-3xl font-bold capitalize">{params.slug}</h1>
                    <p className="mt-4 text-gray-600">
                        This is a 3D model of the product. Use the controls to rotate and zoom.
                    </p>

                    <ColorSwatches onSelect={setColor} selected={color} />

                    <button className="mt-6 px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-purple-700 transition">
                        Add to cart
                    </button>
                </div>
            </div>
        </main>
    );
}
