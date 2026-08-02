import Link from "next/link";
import { getWorksByCategory } from "@/lib/data";

export default async function DigitalHumanitiesPage() {
  const works = await getWorksByCategory("digital-humanities");

  return (
    <main className="px-2 py-2">
      <h1 className="text-[#FFFF00] font-serif font-bold text-2xl mb-2">
        ★ 数字人文 ★
      </h1>
      <div className="rainbow-hr mb-2" />
      <p className="font-mono text-sm text-[#00FF00] mb-4">
        ► 数字技术与人文研究的交叉实践。我用计算方法重新查看文本与档案，同时保留对数据缺口和方法边界的警惕。
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
                  <Link href={`/digital-humanities/${w.slug.current}`} className="text-[#00FFFF] underline">► {w.title}</Link>
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
