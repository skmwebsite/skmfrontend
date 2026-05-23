import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import QueryProvider from "../provider/QueryClientProvider";
import ProgressProvider from "../provider/ProgressProvider";
import IphoneViewportGuard from "../components/IphoneViewportGuard";
import { AuthProvider } from "../provider/AuthProvider";
import { absoluteBaseUrl } from "../utils/BaseUrl";
import { metaTagsApi } from "../api/meta-tags";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const metaTagDTO = await metaTagsApi.getGeneralTags();
  const seo = metaTagDTO;

  if (!seo) {
    return {
      title: "Shree Kakaji Masale Shop Now",
      description:
        "Shree Kakaji Masale delivers authentic, natural spices with a commitment to quality, sustainability, and trusted supply chain partnerships.",
      metadataBase: new URL(absoluteBaseUrl),
      robots: { index: true, follow: true },
    };
  }

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
    metadataBase: new URL(absoluteBaseUrl),
    alternates: {
      canonical: "/",
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased`}>
        <ProgressProvider>
          <QueryProvider>
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

        {/* Instagram in-app browser detection */}
        <Script id="instagram-browser-detect" strategy="afterInteractive">
          {`
            (function() {
              var ua = navigator.userAgent || '';
              var isInstagram = /Instagram|FBAN|FBAV/.test(ua);
              if (isInstagram) {
                var overlay = document.createElement('div');
                overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.92);color:#fff;z-index:99999;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:30px;text-align:center;font-family:sans-serif;';
                overlay.innerHTML = '<h2 style="margin-bottom:20px;">Open in your browser</h2>' +
                  '<p style="font-size:16px;line-height:1.5;margin-bottom:20px;">For the best shopping experience, please open this page in Safari or Chrome.</p>' +
                  '<p style="font-size:14px;opacity:0.8;">Tap the <b>⋯</b> menu (top right) → <b>Open in external browser</b></p>' +
                  '<button onclick="this.parentNode.remove()" style="margin-top:30px;padding:10px 24px;background:#fff;color:#000;border:none;border-radius:6px;font-size:14px;">Continue anyway</button>';
                document.body.appendChild(overlay);
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
