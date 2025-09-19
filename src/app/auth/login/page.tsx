"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import AuthCard from "@/app/components/AuthCard";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/", // where to go after login
        });

        if (res?.error) {
            alert("Invalid credentials");
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-12">
            {/* Left Side Image */}
            <div className="hidden md:col-span-8 md:flex items-center justify-center bg-purple-100 relative">
                <Image
                    src="/login_background.png"
                    alt="3D Store Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Optional overlay for readability */}
            </div>


            {/* Right Side Login Form */}
            <div className="col-span-12 md:col-span-4 flex items-center justify-center p-6">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-gray-50 text-gray-900 
                 focus:border-purple-500 focus:ring-purple-500 p-3 placeholder-gray-400 shadow-sm"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-gray-50 text-gray-900 
                 focus:border-purple-500 focus:ring-purple-500 p-3 placeholder-gray-400 shadow-sm"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white text-lg font-semibold rounded-xl 
               hover:bg-purple-700 transition-all shadow-md hover:shadow-xl"
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
                                onClick={() => signIn("google")}
                                type="button"
                                className="w-full py-3 flex items-center justify-center gap-2 border border-gray-300 rounded-xl 
               bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm"
                            >
                                {/* <img src="/google-icon.svg" alt="Google" className="w-5 h-5" /> */}
                                Continue with Google
                            </button>
                        </form>

                    </AuthCard>
                </div>
            </div>
        </div>
    );
}
