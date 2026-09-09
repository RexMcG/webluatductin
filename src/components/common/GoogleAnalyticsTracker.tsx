"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GoogleAnalyticsTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function" && gaId) {
      const queryString = searchParams?.toString() ? `?${searchParams.toString()}` : "";
      const pageUrl = `${pathname}${queryString}`;

      window.gtag("config", gaId, {
        page_path: pageUrl,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams, gaId]);

  return null;
}
