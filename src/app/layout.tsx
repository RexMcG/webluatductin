import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import LayoutShell from "@/components/layout/LayoutShell";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["vietnamese", "latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "DUC TIN & Partners - Hãng Luật Hàng Đầu Việt Nam",
  description: "Đội ngũ luật sư giàu kinh nghiệm, kết hợp công nghệ AI tiên tiến, mang đến giải pháp pháp lý tối ưu cho cá nhân và doanh nghiệp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`overflow-y-scroll ${roboto.className}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/img/herobanner.webp" type="image/webp" fetchPriority="high" />
      </head>
      <body className="bg-background text-text-primary antialiased min-h-full flex flex-col font-sans">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
