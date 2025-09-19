"use client";

import AuthCard from "@/app/components/AuthCard";

export default function SignupPage() {
    return (
        <AuthCard
            title="Create Account"
            footerText="Already have an account?"
            footerLinkText="Login"
            footerLinkHref="/auth/login"
        >
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                        placeholder="********"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                    Sign Up
                </button>
            </form>

            {/* Social login */}
            <div className="mt-6">
                <button className="w-full py-3 border rounded-xl hover:bg-gray-50 transition">
                    Continue with Google
                </button>
            </div>
        </AuthCard>
    );
}
