import { Handlers, PageProps } from "$fresh/server.ts";
import { client, urlFor } from "../utils/sanity.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    // 抓取数据
    const posts = await client.fetch(`*[_type == "post"]{title, slug, mainImage}`);
    return ctx.render(posts);
  },
};

export default function Home({ data }: PageProps) {
  return (
    <div class="min-h-screen bg-[#FBFBFB]">
      {/* 胶囊导航 */}
      <nav class="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <div class="flex gap-8 px-8 py-3 bg-white/70 backdrop-blur-md border border-gray-100 rounded-full shadow-lg text-sm font-medium">
          <a href="/" class="text-black">Work</a>
          <a href="/about" class="text-gray-400">About</a>
        </div>
      </nav>

      <main class="max-w-6xl mx-auto pt-40 px-6 pb-20">
        <h1 class="text-6xl font-bold tracking-tight mb-20 leading-tight">
          Zijie Song <br />
          <span class="text-gray-400">Digital Designer</span>
        </h1>

        {/* 还原 Figma 网格 */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.map((post: any) => (
            <div class="group">
              <div class="aspect-[4/3] rounded-[32px] overflow-hidden bg-gray-200 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).width(800).url()}
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <h3 class="mt-6 text-2xl font-medium">{post.title}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}