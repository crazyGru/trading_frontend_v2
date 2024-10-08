import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/Navigation";
import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "total invest",
  description: "A professional cryptocurrency trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          <div className="bg-gradient-to-r from-gray-600 via-gray-800 to-gray-900 min-h-screen flex justify-center">
            <main className="bg-gray-900 w-full max-w-xl min-h-screen relative">
              {children}
              <Navigation />
            </main>
          </div>
          <Toaster />
        </ClientWrapper>
      </body>
    </html>
  );
}
