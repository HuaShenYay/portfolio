import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <nav aria-label="页脚导航">
        <Link href="/">首页</Link>
        <Link href="/about">关于</Link>
        <Link href="/contact">联系</Link>
      </nav>
      <span>SANITY LINK: ACTIVE</span>
      <span>HSY PERSONAL ARCHIVE</span>
    </footer>
  );
}
