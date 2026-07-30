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
          ► 我是一个跨领域创作者，活跃在<b className="text-[#FFFF00]">文学</b>、
          <b className="text-[#FFFF00]">AIGC影像</b>、
          <b className="text-[#FFFF00]">网站设计</b>和
          <b className="text-[#FFFF00]">数字人文</b>四个领域。
        </p>
        <p className="font-mono text-sm text-[#00FF00]">
          ► 我的工作围绕文字、影像与代码展开，试图在不同媒介之间找到连接。
        </p>
        <p className="font-mono text-sm text-[#00FFFF]">
          ★ 数字工具不只是效率的手段，也可以是思考的方式。★
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
            ■ 内容优先于形式。一切设计服务于内容，而非相反。
          </p>
          <p className="font-mono text-xs text-[#00FF00]">
            ■ 在文学与代码之间寻找连接。写作与编程都是组织语言的活动。
          </p>
          <p className="font-mono text-xs text-[#00FF00]">
            ■ 保持对新方法的开放态度。重要的是问题本身。
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
