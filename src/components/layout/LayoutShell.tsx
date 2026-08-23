"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingChatWidget from "@/components/common/FloatingChatWidget";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

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
