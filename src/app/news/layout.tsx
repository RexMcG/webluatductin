import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bài Viết",
  description: "Chuyên mục Bài viết phân tích quy định thực tiễn từ đội ngũ Luật sư Công ty Luật TNHH Đức Tín & Cộng sự.",
  openGraph: {
    title: "Bài Viết | Luật Đức Tín",
    description: "Giải đáp các thắc mắc pháp lý thực tế và bài viết chuyên sâu từ Luật sư Đức Tín.",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
