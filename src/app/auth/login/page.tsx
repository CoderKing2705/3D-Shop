"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import AuthCard from "@/app/components/AuthCard";

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
            window.location.href = "/"; // force redirect
        }
    };

    return (
        <AuthCard
            title="Welcome Back"
            footerText="Don’t have an account?"
            footerLinkText="Sign Up"
            footerLinkHref="/auth/signup"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                        placeholder="********"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                    Sign In
                </button>
            </form>

            {/* Social login (optional, like Google) */}
            <div className="mt-6">
                <button
                    onClick={() => signIn("google")}
                    className="w-full py-3 border rounded-xl hover:bg-gray-50 transition"
                >
                    Continue with Google
                </button>
            </div>
        </AuthCard>
    );
}
