"use client";
import { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";

export default function CartDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        const res = await fetch("/api/cart");
        const data = await res.json();
        setCart(data);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleQuantityChange = async (id: number, quantity: number) => {
        if (quantity < 1) return;
        setLoading(true);
        await fetch("/api/cart", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, quantity }),
        });
        await fetchCart();
        setLoading(false);
    };

    const handleRemove = async (id: number) => {
        setLoading(true);
        await fetch("/api/cart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        toast.success("Removed from cart");
        await fetchCart();
        setLoading(false);
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    return (
        <>
            <button
                className="fixed right-6 top-24 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition"
                onClick={() => setIsOpen(true)}
            >
                🛒 ({cart.length})
            </button>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <X size={24} className="text-gray-700 dark:text-white" />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-4 overflow-y-auto h-[calc(100%-160px)]">
                    {cart.length === 0 ? (
                        <p className="text-gray-700 dark:text-gray-300">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{item.product.name}</p>
                                    <p className="text-gray-700 dark:text-gray-300">Color: {item.color}</p>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        ${item.product.price} x {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex gap-1">
                                        <button
                                            className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400"
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            disabled={loading}
                                        >
                                            -
                                        </button>
                                        <span className="px-2 py-1">{item.quantity}</span>
                                        <button
                                            className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400"
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            disabled={loading}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button onClick={() => handleRemove(item.id)} disabled={loading}>
                                        <Trash2 size={20} className="text-red-500 hover:text-red-700" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-4">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Total: ${totalPrice.toFixed(2)}
                    </p>
                    <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition">
                        Checkout
                    </button>
                </div>
            </div>
        </>
    );
}
