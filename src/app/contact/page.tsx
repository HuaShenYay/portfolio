import Link from "next/link";

const contacts = [
  {
    label: "GitHub",
    value: "github.com/HuaShenYay",
    href: "https://github.com/HuaShenYay",
  },
];

export default function ContactPage() {
  return (
    <main className="px-2 py-2">
      <h1 className="text-[#FFFF00] font-serif font-bold text-2xl mb-2">
        ★ 联系 ★
      </h1>
      <div className="rainbow-hr mb-4" />

      <div className="mb-4">
        <p className="font-mono text-sm text-[#00FF00] mb-2">
          ► 如果你想讨论作品、研究或合作，可以先从这个公开入口找到我。
        </p>
        <table className="border-collapse border border-[#00FFFF]">
          <thead>
            <tr>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">方式</th>
              <th className="border border-[#00FFFF] bg-[#000066] px-2 py-1 text-left font-mono text-xs text-[#FFFF00]">地址</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.label}>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs text-[#FFFF00]">{c.label}</td>
                <td className="border border-[#00FFFF] px-2 py-1 font-mono text-xs">
                  <a
                    href={c.href}
                    className="text-[#00FFFF] underline"
                    target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    {c.value}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rainbow-hr" />

      <section className="my-4 guestbook-offline">
        <h2 className="text-[#FFFF00] font-serif font-bold text-xl mb-2">
          ◆ 留言板 ◆
        </h2>
        <div className="rainbow-hr mb-2" />
        <div className="offline-message">
          <strong>[ GUESTBOOK OFFLINE ]</strong>
          <p>留言板暂时没有接入后端。现在提交的内容不会被保存，所以我把表单收了起来。</p>
          <a
            className="win95-btn"
            href="https://github.com/HuaShenYay"
            target="_blank"
            rel="noopener noreferrer"
          >
            前往 GitHub
          </a>
        </div>
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
