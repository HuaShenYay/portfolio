import Link from "next/link";
import { getWorksByCategory } from "@/lib/data";

export default async function LiteraturePage() {
  const works = await getWorksByCategory("literature");

  return (
    <main className="px-2 py-2">
      <h1 className="text-[#FFFF00] font-serif font-bold text-2xl mb-2">
        ◆ 文学 ◆
      </h1>
      <div className="rainbow-hr mb-2" />
      <p className="font-mono text-sm text-[#00FF00] mb-4">
        ► 小说、诗歌、散文与批评写作。我在这里保存句子、人物、观察，以及还没有找到归处的片段。
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
              <tr key={w._id}>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs">
                  <Link href={`/literature/${w.slug.current}`} className="text-[#00FFFF] underline">► {w.title}</Link>
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
