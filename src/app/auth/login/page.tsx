"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import AuthCard from "@/components/AuthCard";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true); // toggle between login/signup
    const [name, setName] = useState(""); // only for signup
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
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

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Something went wrong");
            } else {
                toast.success("Account created successfully! You can now log in.");
                setIsLogin(true); // switch to login after signup
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Framer Motion variants
    const imageVariant = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    };

    const formVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
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

            {/* Right Side Form */}
            <motion.div
                className="col-span-12 md:col-span-4 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900"
                variants={formVariant}
                initial="hidden"
                animate="visible"
            >
                <div className="w-full max-w-md">
                    <AuthCard title={isLogin ? "Welcome Back" : "Create Account"}>
                        {isLogin ? (
                            // Login Form
                            <form onSubmit={handleLogin} className="space-y-6">
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

                                {/* Google Login */}
                                <button
                                    onClick={() => signIn("google", { callbackUrl: "/" })}
                                    type="button"
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-800 font-semibold rounded-2xl
                           shadow-md hover:shadow-lg transition-shadow duration-300
                           border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500
                           active:scale-95"
                                >
                                    <img src="/google_logo.svg" alt="Google Logo" className="w-5 h-5" />
                                    Continue with Google
                                </button>
                            </form>
                        ) : (
                            // Signup Form
                            <form onSubmit={handleSignup} className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-base font-medium text-gray-900 dark:text-white mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-4 text-lg bg-white/90 dark:bg-gray-800 dark:text-white"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                {/* Email */}
                                <div>
                                    <label className="block text-base font-medium text-gray-900 dark:text-white mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-4 text-lg bg-white/90 dark:bg-gray-800 dark:text-white"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                                {/* Password */}
                                <div>
                                    <label className="block text-base font-medium text-gray-900 dark:text-white mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-4 text-lg bg-white/90 dark:bg-gray-800 dark:text-white"
                                        placeholder="********"
                                        required
                                    />
                                </div>
                                {/* Sign Up Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 text-xl font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl 
                  ${loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white active:scale-95 active:bg-purple-800"}`}
                                >
                                    {loading ? "Signing up..." : "Sign Up"}
                                </button>

                                {/* Google Login */}
                                <div className="mt-6">
                                    <button
                                        onClick={() => signIn("google", { callbackUrl: "/" })}
                                        type="button"
                                        className="w-full py-3 border rounded-xl hover:bg-gray-50 transition dark:hover:bg-gray-700 dark:border-gray-600 dark:text-white flex items-center justify-center gap-2"
                                    >
                                        <img src="/google_logo.svg" alt="Google Logo" className="w-5 h-5" />
                                        Continue with Google
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Toggle Link */}
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="inline-block px-6 py-3 rounded-2xl border border-purple-500 text-purple-600 font-semibold
               bg-white dark:bg-gray-800 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900
               transition-colors duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {isLogin ? "Create an Account" : "Already have an account? Sign In"}
                            </button>
                        </div>
                    </AuthCard>
                </div>
            </motion.div>
        </div>
    );
}
