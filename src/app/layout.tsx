import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';
import type { Metadata } from "next";
import Providers from "../components/Providers";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "../../context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "3D E-Commerce",
  description: "Interactive 3D product viewer built with Next.js and React Three Fiber",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 aqua-ext-enabled">
        {/* Wrap inside Providers (NextAuth, Theme, etc.) */}
        <Providers>
          {/* ✅ Wrap CartProvider so all pages can access cart */}
          <CartProvider>
            {children}
            <CartDrawer />
            {/* Global Toaster for notifications */}
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: "12px",
                  background: "#4f46e5",
                  color: "#fff",
                  padding: "12px 16px",
                  fontWeight: 500,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                },
                success: {
                  iconTheme: {
                    primary: "#4ade80",
                    secondary: "#1e1e2f",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#f87171",
                    secondary: "#1e1e2f",
                  },
                },
              }}
            />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
