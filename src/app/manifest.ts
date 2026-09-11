import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Công Ty Luật TNHH Đức Tín & Cộng Sự",
    short_name: "Luật Đức Tín",
    description: "Hãng Luật Hàng Đầu TP.HCM - Đồng hành pháp lý chiến lược",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#641D06",
    icons: [
      {
        src: "/icon.png?v=2",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png?v=2",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
