import Link from "next/link";

const works = [
  { title: "机器之梦", description: "AI生成的实验短片，探索机器意识的边界。", year: "2024" },
  { title: "流动的城市", description: "用生成式AI重构城市景观的影像实验。", year: "2024" },
  { title: "数据之海", description: "海洋监测数据转译为视觉语言。", year: "2023" },
  { title: "回声", description: "声音与影像的AI协作创作。", year: "2023" },
];

export default function AIGCFilmsPage() {
  return (
    <main className="px-2 py-2">
      <h1 className="text-[#FFFF00] font-serif font-bold text-2xl mb-2">
        ► AIGC影片 ◄
      </h1>
      <div className="rainbow-hr mb-2" />
      <p className="font-mono text-sm text-[#00FF00] mb-4">
        ► 人工智能生成的影像作品与实验短片。在算法与叙事的交汇处，探索影像创作的新可能。
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
