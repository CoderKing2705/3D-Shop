import { SessionProvider } from "next-auth/react";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./components/Providers";

export const metadata: Metadata = {
  title: "3D E-Commerce Viewer",
  description: "Interactive 3D product viewer built with Next.js and React Three Fiber",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 aqua-ext-enabled">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
