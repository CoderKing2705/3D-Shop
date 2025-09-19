"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
    const { data: session } = useSession();
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-md">
            <Link href="/" className="text-xl font-bold text-purple-700">
                3D Store
            </Link>
            <div className="flex items-center gap-4">
                {!session ? (
                    <>
                        <Link
                            href="/auth/login"
                            className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="px-4 py-2 rounded-xl border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition"
                        >
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="text-gray-700">
                            Hi, {session.user?.name || "User"}
                        </span>
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
