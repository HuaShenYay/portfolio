import Link from "next/link";

const works = [
  { title: "文学地图", description: "现代文学作品的地理空间可视化。", year: "2024" },
  { title: "语料镜像", description: "当代文学主题演变研究。", year: "2023" },
  { title: "声音档案", description: "方言采集与数字化保存项目。", year: "2023" },
  { title: "编码与解码", description: "数字出版工具的实验性开发。", year: "2022" },
];

export default function DigitalHumanitiesPage() {
  return (
    <main className="px-2 py-2">
      <h1 className="text-[#FFFF00] font-serif font-bold text-2xl mb-2">
        ★ 数字人文 ★
      </h1>
      <div className="rainbow-hr mb-2" />
      <p className="font-mono text-sm text-[#00FF00] mb-4">
        ► 数字技术与人文研究的交叉实践。将计算方法引入人文领域的问题意识，试图在技术与人文之间建立有意义的对话。
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
