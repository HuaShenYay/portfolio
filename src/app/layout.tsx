import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HSY / 我的创作空间",
  description: "文学、影像、网站设计与数字人文组成的个人创作档案。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">
          跳到主要内容
        </a>
        <div className="space-shell">
          <div className="interface-frame">
            <Navbar />
            <div id="main-content">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
