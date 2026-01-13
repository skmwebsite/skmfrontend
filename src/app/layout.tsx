import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../provider/QueryClientProvider";
import ProgressProvider from "../provider/ProgressProvider";
import IphoneViewportGuard from "../components/IphoneViewportGuard";
import { AuthProvider } from "../provider/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shree Kakaji Masale Shop Now",
  description:
    "Shree Kakaji Masale delivers authentic, natural spices with a commitment to quality, sustainability, and trusted supply chain partnerships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter  antialiased `}>
        <ProgressProvider>
          <QueryProvider>
            {" "}
            <AuthProvider>
              <IphoneViewportGuard />
              <Toaster
                containerClassName="mt-4 fixed z-[200]"
                position="top-center"
              />

              {children}
            </AuthProvider>
          </QueryProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
