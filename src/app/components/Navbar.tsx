"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // hamburger icons

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-bold text-purple-700">
          3D Store
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-purple-700 transition">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-purple-700 transition">
            Products
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-purple-700 transition">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-purple-700 transition">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-6 py-4 space-y-4">
          <Link href="/" className="block text-gray-700 hover:text-purple-700 transition">
            Home
          </Link>
          <Link href="/products" className="block text-gray-700 hover:text-purple-700 transition">
            Products
          </Link>
          <Link href="/about" className="block text-gray-700 hover:text-purple-700 transition">
            About
          </Link>
          <Link href="/contact" className="block text-gray-700 hover:text-purple-700 transition">
            Contact
          </Link>

          {/* Auth Buttons in mobile */}
          {!session ? (
            <div className="space-y-2">
              <Link
                href="/auth/login"
                className="block w-full text-center px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="block w-full text-center px-4 py-2 rounded-xl border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="block text-gray-700">
                Hi, {session.user?.name || "User"}
              </span>
              <button
                onClick={() => signOut()}
                className="w-full px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
