"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingChatWidget from "@/components/common/FloatingChatWidget";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // Luôn cuộn lên đầu trang tức thì khi chuyển trang mới
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  if (isAdmin) {
    return <div className="min-h-screen flex flex-col bg-slate-100">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="pt-20 pb-section-padding page-fade-in flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingChatWidget />
    </>
  );
}
