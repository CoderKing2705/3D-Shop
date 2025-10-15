"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";

export default function CartDrawer() {
    const { isOpen, toggleCart, cartItems, updateQuantity, removeFromCart } = useCart();

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={toggleCart}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold">Your Cart</h2>
                            <button onClick={toggleCart}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <p className="text-gray-500 text-center mt-10">
                                    Your cart is empty
                                </p>
                            ) : (
                                cartItems.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                    >
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                ${item.price.toFixed(2)}
                                            </p>
                                            <div className="flex items-center mt-2 space-x-2">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t p-4">
                                <div className="flex justify-between font-semibold mb-3">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                                    Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
