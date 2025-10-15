"use client";

import ColorSwatches from "@/components/ColorSwatches";
import Navbar from "@/components/Navbar";
import ProductViewer from "@/components/ProductViewer";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CartDrawer from "@/components/CartDrawer";

export default function ProductClient({ product }: { product: any }) {
    const colors = Array.isArray(product.colors)
        ? product.colors
        : product.colors
            ? JSON.parse(product.colors)
            : [];

    const [color, setColor] = useState(colors[0] || "#ffffff");

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        // Check if product already exists with the same color
        const existingIndex = cart.findIndex(
            (item: any) => item.id === product.id && item.color === color
        );

        if (existingIndex > -1) {
            // Increment quantity
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                color: color,
                quantity: 1,
                thumbnail: product.thumbnail,
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Added to cart!");
    };

    return (
        <>
            <Navbar />
            <CartDrawer />
            <main className="max-w-7xl mx-auto p-6 md:p-12 space-y-12">
                {/* Product Info & Viewer */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* LEFT: Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col space-y-6"
                    >
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            {product.name}
                        </h1>
                        <p className="text-3xl font-semibold text-purple-600">${product.price}</p>

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Description
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Colors */}
                        {colors.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Available Colors
                                </h2>
                                <ColorSwatches colors={colors} selected={color} onSelect={setColor} />
                            </div>
                        )}

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            className="mt-4 py-4 w-full bg-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:bg-purple-700 transition-all">
                            Add to Cart
                        </button>
                    </motion.div>

                    {/* RIGHT: 3D Viewer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden p-4 flex justify-center items-center"
                    >
                        <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
                            <ProductViewer modelPath={product.modelPath} color={color} />
                        </div>
                    </motion.div>
                </div>

                {/* Specifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg"
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                        Specifications
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-gray-700 dark:text-gray-300">
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr>
                                    <td className="py-3 font-medium">Material</td>
                                    <td className="py-3">This is static data</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-medium">Weight</td>
                                    <td className="py-3">This is static data</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-medium">Available Sizes</td>
                                    <td className="py-3">This is static data</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-medium">Warranty</td>
                                    <td className="py-3">This is static data</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Customer Reviews */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        Static reviews
                    </div>
                </motion.div>

                {/* FAQs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">FAQs</h2>
                    Statuic data
                </motion.div>
            </main>
        </>
    );
}
