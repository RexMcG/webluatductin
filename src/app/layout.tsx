import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://webluatductin.vercel.app"),
  title: {
    default: "Luật Đức Tín & Cộng Sự | Hãng Luật Hàng Đầu TP.HCM",
    template: "%s | Luật Đức Tín (DUC TIN & Partners)",
  },
  description:
    "Hãng Luật Đức Tín & Cộng Sự tại TP.HCM. Chuyên tư vấn đầu tư FDI, doanh nghiệp, BĐS, tranh tụng Tòa án và ứng dụng AI pháp lý chuyên sâu.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/img/Logo_website.png",
  },
  keywords: [
    "luật sư uy tín",
    "công ty luật đức tín",
    "luật sư phan đức tín",
    "luật sư tphcm",
    "tư vấn pháp luật",
    "tranh tụng tòa án",
    "luật sư doanh nghiệp",
    "tính lương gross net",
    "tính tạm ứng án phí",
    "biểu mẫu pháp luật ai",
    "luật sư hôn nhân gia đình",
    "luật đất đai nhà ở",
  ],
  authors: [{ name: "Luật sư Phan Đức Tín", url: "https://webluatductin.vercel.app" }],
  creator: "Công ty Luật TNHH Đức Tín & Cộng Sự",
  publisher: "Công ty Luật TNHH Đức Tín & Cộng Sự",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://webluatductin.vercel.app",
  },
  openGraph: {
    title: "Luật Đức Tín & Cộng Sự | Hãng Luật Hàng Đầu TP.HCM",
    description:
      "Hãng Luật Đức Tín & Cộng Sự tại TP.HCM. Chuyên tư vấn đầu tư FDI, doanh nghiệp, BĐS, tranh tụng Tòa án và ứng dụng AI pháp lý chuyên sâu.",
    url: "https://webluatductin.vercel.app",
    siteName: "Luật Đức Tín",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/img/herobanner.webp",
        width: 1200,
        height: 630,
        alt: "Công Ty Luật TNHH Đức Tín & Cộng Sự",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luật Đức Tín & Cộng Sự | Hãng Luật Hàng Đầu TP.HCM",
    description:
      "Hãng Luật Đức Tín & Cộng Sự tại TP.HCM. Chuyên tư vấn đầu tư FDI, doanh nghiệp, BĐS, tranh tụng Tòa án và ứng dụng AI pháp lý chuyên sâu.",
    images: ["/img/herobanner.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Công Ty Luật TNHH Đức Tín và Cộng Sự",
  alternateName: "DUC TIN & Partners Law Firm",
  url: "https://webluatductin.vercel.app",
  logo: "https://webluatductin.vercel.app/img/Logo_website.png",
  image: "https://webluatductin.vercel.app/img/herobanner.webp",
  description:
    "Công ty luật uy tín hàng đầu tại TP. Hồ Chí Minh do Luật sư Phan Đức Tín sáng lập và điều hành.",
  founder: {
    "@type": "Person",
    name: "Phan Đức Tín",
    jobTitle: "Luật sư Trưởng - Giám đốc Điều hành",
    image: "https://webluatductin.vercel.app/img/avatar1.webp",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Saigon Trade Center Tower, Quận 1",
    addressLocality: "Thành phố Hồ Chí Minh",
    addressRegion: "Hồ Chí Minh",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.7841667,
    longitude: 106.5754288,
  },
  telephone: "+84937863263",
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "12:00",
    },
  ],
};

import { Suspense } from "react";
import TopProgressBar from "@/components/common/TopProgressBar";
import GoogleAnalyticsTracker from "@/components/common/GoogleAnalyticsTracker";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={roboto.className}>
      <head>
        <link
          rel="preload"
          href="/fonts/material-symbols-outlined.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="/img/herobanner.webp" type="image/webp" fetchPriority="high" />
        <link rel="apple-touch-icon" href="/img/Logo_website.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased min-h-full flex flex-col font-sans">
        {/* Google Analytics 4 (GA4) */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            (function() {
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=G-WLB2R37XF3';
              document.head.appendChild(s);
              
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WLB2R37XF3', {
                page_path: window.location.pathname,
              });
            })();
          `}
        </Script>

        <Suspense fallback={null}>
          <TopProgressBar />
          <GoogleAnalyticsTracker gaId="G-WLB2R37XF3" />
        </Suspense>
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
