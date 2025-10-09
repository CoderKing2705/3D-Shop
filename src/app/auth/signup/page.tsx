"use client";

import AuthCard from "@/components/AuthCard";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
                // optionally redirect after success
                setTimeout(() => {
                    window.location.href = "/auth/login";
                }, 1500);
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };
    return (
        <AuthCard
            title="Create Account"
            footerText="Already have an account?"
            footerLinkText="Login"
            footerLinkHref="/auth/login"
        >
            <form onSubmit={handleSignup} className="space-y-4">
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
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 text-xl font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl 
            ${loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white active:scale-95 active:bg-purple-800"}`}
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>

            {/* Social login */}
            <div className="mt-6">
                <button className="w-full py-3 border rounded-xl hover:bg-gray-50 transition dark:hover:bg-gray-700 dark:border-gray-600 dark:text-white">
                    Continue with Google
                </button>
            </div>
        </AuthCard>
    );
}
