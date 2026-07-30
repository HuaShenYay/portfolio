import Link from "next/link";

const navItems = [
  { label: "首页", href: "/" },
  { label: "文学", href: "/literature" },
  { label: "AIGC影片", href: "/aigc-films" },
  { label: "网站设计", href: "/web-design" },
  { label: "数字人文", href: "/digital-humanities" },
  { label: "关于", href: "/about" },
  { label: "联系", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="pb-2 mb-2 pt-2">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <Link
          href="/"
          className="text-[#FFFF00] font-serif font-bold text-2xl no-underline"
        >
          ★~ 我的创作空间 ~★
        </Link>
        <span className="font-mono text-xs text-[#00FFFF] blink">NEW!</span>
      </div>

      {/* Marquee */}
      <div className="marquee-text my-2">
        <span className="text-[#FF00FF] text-xs">
          ★ 欢迎来到我的网络空间！★ 本站持续更新中 ★ 欢迎光临 ★ Welcome to my homepage! ★
        </span>
      </div>

      {/* Nav links */}
      <nav>
        <ul className="flex flex-wrap items-center gap-x-1 gap-y-1 font-mono text-sm list-none p-0 m-0">
          {navItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-x-1">
              {index > 0 && <span className="text-[#FF00FF] select-none">|</span>}
              <Link
                href={item.href}
                className="text-[#00FFFF] no-underline hover:text-[#FF0000] hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Rainbow divider */}
      <div className="rainbow-hr mt-2" />
    </header>
  );
}
