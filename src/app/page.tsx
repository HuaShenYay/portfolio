import Link from "next/link";

const categories = [
  {
    title: "文学",
    description: "小说、诗歌、散文与批评写作",
    detail: "以中文创作为主，涵盖短篇小说、散文、诗歌与文学批评。",
    href: "/literature",
    icon: "◆",
  },
  {
    title: "AIGC影片",
    description: "人工智能生成的影像作品与实验短片",
    detail: "使用生成式AI工具进行影像创作，探索算法与叙事的结合。",
    href: "/aigc-films",
    icon: "►",
  },
  {
    title: "网站设计",
    description: "网页界面设计与前端开发作品",
    detail: "技术栈以 Next.js、TypeScript、Tailwind CSS 为主。",
    href: "/web-design",
    icon: "■",
  },
  {
    title: "数字人文",
    description: "数字技术与人文研究的交叉实践",
    detail: "涉及文本挖掘、数据可视化、数字出版等方向。",
    href: "/digital-humanities",
    icon: "★",
  },
];

const latestWorks = [
  { title: "消失的信号", category: "文学", date: "2024", href: "/literature" },
  { title: "机器之梦", category: "AIGC影片", date: "2024", href: "/aigc-films" },
  { title: "数据花园", category: "数字人文", date: "2024", href: "/digital-humanities" },
  { title: "无界书店", category: "网站设计", date: "2023", href: "/web-design" },
];

export default function Home() {
  return (
    <main className="px-2 py-2">
      {/* Under Construction stripe */}
      <div className="construction-stripe mb-4">
        <p className="text-center text-xs text-black font-bold m-0 blink">
          🚧 本站正在建设中！UNDER CONSTRUCTION! 🚧
        </p>
      </div>

      {/* 简介 */}
      <section className="mb-4">
        <p className="font-mono text-sm text-[#00FF00]">
          ► 这是一个关于<b className="text-[#FFFF00]">文学</b>、
          <b className="text-[#FFFF00]">影像</b>、
          <b className="text-[#FFFF00]">设计</b>与
          <b className="text-[#FFFF00]">数字人文</b>的创作空间。
        </p>
        <p className="font-mono text-sm text-[#00FFFF]">
          ★ 在这里，文字与代码交汇，传统与实验共存！★
        </p>
      </section>

      <div className="rainbow-hr" />

      {/* 创作领域 */}
      <section className="my-4">
        <h2 className="text-[#FFFF00] font-serif font-bold text-xl mb-2">
          ★ 创作领域 ★
        </h2>
        <div className="rainbow-hr mb-2" />
        <table className="w-full border-collapse border border-[#00FFFF]">
          <thead>
            <tr>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">
                领域
              </th>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">
                简介
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.href}>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs">
                  <Link href={cat.href} className="text-[#00FFFF] underline">
                    {cat.icon} {cat.title}
                  </Link>
                </td>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FF00]">
                  {cat.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="rainbow-hr" />

      {/* 最新作品 */}
      <section className="my-4">
        <h2 className="text-[#FFFF00] font-serif font-bold text-xl mb-2">
          ★ 最新作品 ★
        </h2>
        <div className="rainbow-hr mb-2" />
        <table className="w-full border-collapse border border-[#00FFFF]">
          <thead>
            <tr>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">
                作品名
              </th>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">
                类别
              </th>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">
                年份
              </th>
            </tr>
          </thead>
          <tbody>
            {latestWorks.map((work) => (
              <tr key={work.title}>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs">
                  <Link href={work.href} className="text-[#00FFFF] underline">
                    ► {work.title}
                  </Link>
                </td>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FF00]">
                  {work.category}
                </td>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FF00]">
                  {work.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="rainbow-hr" />

      {/* 底部 */}
      <section className="mt-4">
        <p className="font-mono text-xs text-[#00FF00]">
          ► 更多详情请访问{" "}
          <Link href="/about" className="text-[#00FFFF] underline">
            关于页面
          </Link>
          。
        </p>
        <p className="font-mono text-xs text-[#FF00FF] blink mt-1">
          ★ 感谢您的来访！★
        </p>
      </section>
    </main>
  );
}
