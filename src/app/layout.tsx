import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "★~ 我的创作空间 ~★ — 文学·影像·设计·数字人文",
  description: "个人创作主页 — GeoCities风格",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#000033] text-[#00FF00] font-mono text-sm stars-bg">
        <div className="max-w-4xl mx-auto px-4">
          <Navbar />
          <main className="py-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
