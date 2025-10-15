// app/cart/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function CartPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
                <p className="text-xl mb-4">Please log in to view your cart.</p>
                <Link
                    href="/auth/login"
                    className="bg-purple-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-purple-700 transition-all"
                >
                    Go to Login
                </Link>
            </div>
        );
    }

    const user = await prisma.users.findUnique({
        where: { email: session.user.email },
    });

    const cartItems = await prisma.cartItem.findMany({
        where: { userId: user?.id },
        include: { product: true },
    });

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <>
            <Navbar />
            <main className="max-w-6xl mx-auto p-6 md:p-12">
                <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <p className="text-gray-300 text-lg">Your cart is empty.</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left Section - Items */}
                        <div className="md:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl shadow-lg hover:bg-white/20 transition-all"
                                >
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">
                                            {item.product.name}
                                        </h2>
                                        <p className="text-gray-300">
                                            Quantity: {item.quantity}
                                        </p>
                                        <p className="text-gray-400">
                                            Color: <span style={{ color: item.color }}>{item.color}</span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg text-white font-semibold">
                                            ${item.product.price * item.quantity}
                                        </p>
                                        <button className="text-sm text-red-400 hover:text-red-500 mt-2">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Section - Summary */}
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-white shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-4">
                                <p>Subtotal</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between mb-4">
                                <p>Shipping</p>
                                <p>Free</p>
                            </div>
                            <div className="border-t border-white/20 my-4"></div>
                            <div className="flex justify-between font-bold text-xl mb-6">
                                <p>Total</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <button className="w-full py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all font-semibold">
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
