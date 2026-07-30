import Link from "next/link";
import Button from "@/components/Button";

const contacts = [
  { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { label: "GitHub", value: "github.com/username", href: "https://github.com/username" },
  { label: "Twitter", value: "@username", href: "https://twitter.com/username" },
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
          ► 欢迎通过以下方式与我联系！
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

      <section className="my-4">
        <h2 className="text-[#FFFF00] font-serif font-bold text-xl mb-2">
          ◆ 留言板 ◆
        </h2>
        <div className="rainbow-hr mb-2" />
        <form className="space-y-3 max-w-md">
          <div>
            <label className="block font-mono text-xs text-[#FFFF00] mb-1">► 姓名</label>
            <input
              type="text"
              className="w-full border border-[#00FFFF] bg-[#000066] font-mono text-xs text-[#00FF00] p-2 focus:outline-none focus:border-[#FF00FF]"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-[#FFFF00] mb-1">► 邮箱</label>
            <input
              type="email"
              className="w-full border border-[#00FFFF] bg-[#000066] font-mono text-xs text-[#00FF00] p-2 focus:outline-none focus:border-[#FF00FF]"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-[#FFFF00] mb-1">► 留言</label>
            <textarea
              rows={5}
              className="w-full border border-[#00FFFF] bg-[#000066] font-mono text-xs text-[#00FF00] p-2 focus:outline-none focus:border-[#FF00FF] resize-y"
            />
          </div>
          <div>
            <Button type="submit">提交留言</Button>
          </div>
        </form>
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
