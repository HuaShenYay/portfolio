import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="px-2 py-2">
      <h1 className="text-[#FFFF00] font-serif font-bold text-2xl mb-2">
        ★ 关于 ★
      </h1>
      <div className="rainbow-hr mb-4" />

      <div className="space-y-3 mb-4">
        <p className="font-mono text-sm text-[#00FF00]">
          ► 我不太想只用一种媒介定义自己的工作。我在<b className="text-[#FFFF00]">文字</b>、
          <b className="text-[#FFFF00]">影像</b>与
          <b className="text-[#FFFF00]">代码</b>之间移动，也关心它们如何改变我们阅读和理解材料的方式。
        </p>
        <p className="font-mono text-sm text-[#00FF00]">
          ► 对我来说，这些目录不是彼此隔开的专业标签，而是处理同一个问题的不同入口。
        </p>
        <p className="font-mono text-sm text-[#00FFFF]">
          ★ 数字工具不只是快捷方式。它也会暴露材料里的结构、偏差和空白。
        </p>
      </div>

      <div className="rainbow-hr" />

      <section className="my-4">
        <h2 className="text-[#FFFF00] font-serif font-bold text-xl mb-2">
          ◆ 创作理念 ◆
        </h2>
        <div className="rainbow-hr mb-2" />
        <div className="space-y-2">
          <p className="font-mono text-xs text-[#00FF00]">
            ■ 先问材料需要什么，再决定它应该是一篇文章、一段影像，还是一个网页。
          </p>
          <p className="font-mono text-xs text-[#00FF00]">
            ■ 写作和编程都在设置规则，也都要知道什么时候打破规则。
          </p>
          <p className="font-mono text-xs text-[#00FF00]">
            ■ 新工具值得尝试，但工具不能替代判断。
          </p>
        </div>
      </section>

      <div className="rainbow-hr" />

      <section className="my-4">
        <h2 className="text-[#FFFF00] font-serif font-bold text-xl mb-2">
          ► 领域 ◄
        </h2>
        <div className="rainbow-hr mb-2" />
        <table className="w-full border-collapse border border-[#00FFFF]">
          <thead>
            <tr>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">领域</th>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FFFF]">◆ 文学</td>
              <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FF00]">小说、诗歌、散文与批评写作</td>
            </tr>
            <tr>
              <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FFFF]">► AIGC影片</td>
              <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FF00]">人工智能生成的影像作品</td>
            </tr>
            <tr>
              <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FFFF]">■ 网站设计</td>
              <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FF00]">网页界面设计与前端开发</td>
            </tr>
            <tr>
              <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FFFF]">★ 数字人文</td>
              <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#00FF00]">数字技术与人文研究的交叉实践</td>
            </tr>
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
