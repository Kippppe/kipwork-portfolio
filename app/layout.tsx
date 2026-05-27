import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, brand } from "./lib/content";
import CustomCursor from "./components/CustomCursor";
import LenisProvider from "./components/LenisProvider";

// 見出し・本文ともに Inter に統一（精密スケール：tracking で階層を作る）
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = `${brand.name} — ${brand.role}`;
const description =
  "ホテル特化の多言語サイト実装。Next.js × Schema.org Hotel × hreflang で、EN/JA/KO/簡体/繁体の多言語と検索・地図・AI 最適化を、ホテル現場運用の視点で実装します。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: brand.name,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <LenisProvider />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
