import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="header-copy">
        <span>我的创作空间</span>
        <span>PERSONAL WIRED ARCHIVE</span>
      </div>
      <Link href="/" className="site-mark" aria-label="返回首页">
        <span className="site-mark-orbit" aria-hidden="true" />
        <span className="site-mark-word"><b>HSY</b><i>.NETWORK</i></span>
        <small>PERSONAL NODE</small>
      </Link>
    </header>
  );
}
