import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import LayoutShell from "@/components/layout/LayoutShell";

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
    <html lang="vi" className="overflow-y-scroll">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,700&display=swap&subset=vietnamese"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-text-primary antialiased min-h-full flex flex-col">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
