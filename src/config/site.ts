/**
 * Centralized site configuration and canonical URL management
 * Supports custom domain ductin-partners.com with fallback to NEXT_PUBLIC_SITE_URL
 */
export const SITE_CONFIG = {
  name: "Luật Đức Tín & Cộng Sự",
  legalName: "Công Ty Luật TNHH Đức Tín & Cộng Sự",
  englishName: "DUC TIN & Partners Law Firm",
  domain: "www.ductin-partners.com",
  baseUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ductin-partners.com").replace(/\/$/, ""),
  hotline: "093 786 32 63",
  email: "khachhang@ductinlaw.vn",
};

export const getCanonicalUrl = (path = ""): string => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.baseUrl}${cleanPath === "/" ? "" : cleanPath}`;
};
