"use client";

import Link from "next/link";
import React from "react";

type AuthCardProps = {
    title: string;
    children: React.ReactNode;
    footerText?: string;
    footerLinkText?: string;
    footerLinkHref?: string;
};

export default function AuthCard({
    title,
    children,
    footerText,
    footerLinkText,
    footerLinkHref,
}: AuthCardProps) {
    return (
        <div className="flex min-h-screen items-center justify-center animate-gradientAnimation">
            <div className="relative bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-pink-500/20
                backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md overflow-hidden">
                {/* Main Content */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
                    {title}
                </h1>
                {children}

                {/* Footer: render only if all props exist */}
                {footerText && footerLinkText && footerLinkHref && (
                    <p className="mt-6 text-center text-gray-700 dark:text-gray-300 text-sm">
                        {footerText}{" "}
                        <Link
                            href={footerLinkHref}
                            className="font-semibold font-medium text-purple-600 hover:text-purple-700"
                        >
                            {footerLinkText}
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}
