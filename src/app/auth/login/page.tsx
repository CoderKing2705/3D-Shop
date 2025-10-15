"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import AuthCard from "@/components/AuthCard";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/",
        });

        if (res?.error) {
            toast.error("Invalid credentials. Please try again!");
        } else {
            toast.success("Logged in successfully!");
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        }
    };

    // Framer Motion variants
    const imageVariant = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    };

    const formVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-12">
            {/* Left Side Image */}
            <motion.div
                className="hidden md:col-span-8 md:flex items-center justify-center relative"
                variants={imageVariant}
                initial="hidden"
                animate="visible"
            >
                <Image
                    src="/login_background.png"
                    alt="3D Store Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Right Side Login Form */}
            <motion.div
                className="col-span-12 md:col-span-4 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900"
                variants={formVariant}
                initial="hidden"
                animate="visible"
            >
                <div className="w-full max-w-md">
                    <AuthCard
                        title="Welcome Back"
                        footerText="Don’t have an account?"
                        footerLinkText="Sign Up"
                        footerLinkHref="/auth/signup"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-base font-medium text-gray-900 dark:text-white mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full rounded-2xl border border-gray-300 bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white 
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500 p-4 text-lg placeholder-gray-400 shadow-sm transition"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-base font-medium text-gray-900 dark:text-white mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-2xl border border-gray-300 bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white 
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500 p-4 text-lg placeholder-gray-400 shadow-sm transition"
                                />
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-semibold rounded-2xl 
                hover:from-purple-600 hover:to-pink-600 active:scale-95 transition-all shadow-lg hover:shadow-xl"
                            >
                                Sign In
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-2 my-4">
                                <hr className="flex-1 border-gray-300" />
                                <span className="text-gray-500 text-sm">OR</span>
                                <hr className="flex-1 border-gray-300" />
                            </div>

                            {/* Google Login */}
                            <button
                                onClick={() => signIn("google", { callbackUrl: "/" })}
                                type="button"
                                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-800 font-semibold rounded-2xl
                           shadow-md hover:shadow-lg transition-shadow duration-300
                           border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500
                           active:scale-95"
                            >
                                <img
                                    src="/google_logo.svg"
                                    alt="Google Logo"
                                    className="w-5 h-5"
                                />
                                Continue with Google
                            </button>
                        </form>
                    </AuthCard>
                </div>
            </motion.div>
        </div>
    );
}
