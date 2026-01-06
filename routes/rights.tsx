import Navigation from "../islands/LiquidNavGlass.tsx";
import Footer from "../components/Footer.tsx";

export default function RightsPage() {
  return (
    <div class="min-h-screen bg-white font-sans antialiased text-black selection:bg-black selection:text-white">
      <Navigation />

      <main class="max-w-[1100px] mx-auto pt-56 px-4 sm:px-8 md:px-16 pb-8">
        <h1 class="text-[40px] md:text-[56px] font-bold tracking-tighter mb-10">
          权益与版权声明
        </h1>

        <section class="max-w-3xl text-[17px] leading-[1.8] text-[#424245]">
          <p class="mb-6">
            本网站（含文字、图片、视频、设计、代码及其组合呈现方式）除特别注明外，均为作者原创或
            已获合法授权。未经许可，禁止复制、转载、抓取后再发布、镜像站点、用于训练用途或任何商业
            使用。
          </p>

          <h2 class="text-[22px] font-bold tracking-tight text-black mt-12 mb-4">
            1. 版权归属
          </h2>
          <p class="mb-6">
            网站内容的著作权及相关权利归“宋子杰”或权利人所有。第三方素材会在可行范围内标注来源与
            权利信息。
          </p>

          <h2 class="text-[22px] font-bold tracking-tight text-black mt-12 mb-4">
            2. 合理使用
          </h2>
          <p class="mb-6">
            如需引用（例如学术/媒体报道），请遵循“必要、适度、署名、链接到原文”的原则，并避免对
            原意造成误导。
          </p>

          <h2 class="text-[22px] font-bold tracking-tight text-black mt-12 mb-4">
            3. 内容保护措施说明
          </h2>
          <p class="mb-6">
            为保护内容与用户安全，本站可能启用基础安全响应头、限制跨站资源策略、并通过
            robots 文件约束抓取范围（不保证对所有爬虫生效）。
          </p>

          <p class="mt-12 text-[#86868B] text-[14px]">
            最后更新：{new Date().toLocaleDateString("zh-CN")}
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
