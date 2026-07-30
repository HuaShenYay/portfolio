import Link from "next/link";

const works = [
  { title: "消失的信号", description: "一部关于信息过载时代的短篇小说。", year: "2024" },
  { title: "城市边缘", description: "散文集，记录城市边缘地带的观察与思考。", year: "2024" },
  { title: "午夜图书馆", description: "组诗，关于阅读、记忆与遗忘。", year: "2023" },
  { title: "数字废墟", description: "长篇科幻小说连载。", year: "2023" },
  { title: "致未来的信", description: "书信体散文。写给尚未出生的人。", year: "2022" },
];

export default function LiteraturePage() {
  return (
    <main className="px-2 py-2">
      <h1 className="text-[#FFFF00] font-serif font-bold text-2xl mb-2">
        ◆ 文学 ◆
      </h1>
      <div className="rainbow-hr mb-2" />
      <p className="font-mono text-sm text-[#00FF00] mb-4">
        ► 小说、诗歌、散文与批评写作。文字是时间的容器，语言是思想的边界。
      </p>

      <div className="rainbow-hr" />

      <section className="my-4">
        <table className="w-full border-collapse border border-[#00FFFF]">
          <thead>
            <tr>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">作品名</th>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">简介</th>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">年份</th>
            </tr>
          </thead>
          <tbody>
            {works.map((w) => (
              <tr key={w.title}>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs">
                  <Link href="#" className="text-[#00FFFF] underline">► {w.title}</Link>
                </td>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FF00]">{w.description}</td>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FF00]">{w.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="rainbow-hr" />

      <p className="mt-4">
        <Link href="/" className="text-[#00FFFF] underline font-mono text-xs">
          ← 返回首页
        </Link>
      </p>
    </main>
  );
}
