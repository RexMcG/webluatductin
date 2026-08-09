import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-text-primary antialiased min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="pt-20 pb-section-padding page-fade-in flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
