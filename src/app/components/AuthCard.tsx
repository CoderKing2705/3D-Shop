"use client";

import Link from "next/link";
import React from "react";

type AuthCardProps = {
    title: string;
    children: React.ReactNode;
    footerText: string;
    footerLinkText: string;
    footerLinkHref: string;
};

export default function AuthCard({
    title,
    children,
    footerText,
    footerLinkText,
    footerLinkHref,
}: AuthCardProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1c1c1e] via-[#2f2f33] to-[#0abfbc] bg-[length:800%_800%] animate-gradientAnimation">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
                    {title}
                </h1>
                {children}
                <p className="mt-6 text-center text-gray-700 text-sm">
                    {footerText}{" "}
                    <Link
                        href={footerLinkHref}
                        className="font-semibold text-purple-600 hover:text-purple-700"
                    >
                        {footerLinkText}
                    </Link>
                </p>
            </div>
        </div>
    );
}
