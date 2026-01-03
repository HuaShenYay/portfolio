import { Handlers, PageProps } from "$fresh/server.ts";
import { client, urlFor } from "../../utils/sanity.ts";
import Navigation from "../../components/Navigation.tsx";

interface ArticleData {
  article: any;
}

export const handler: Handlers<ArticleData> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    try {
      // 抓取单篇文章详情
      const query = `*[_type == "post" && (slug.current == $slug || _id == $slug)][0]{
        title,
        _createdAt,
        mainImage,
        description,
        body,
        "authorName": "Author, Founder of Namedly", 
        slug
      }`;
      const article = await client.fetch(query, { slug });

      if (!article) return ctx.renderNotFound();
      
      return ctx.render({ article });
    } catch (err) {
      return ctx.renderNotFound();
    }
  },
};

interface TextChild {
  text?: string;
}

interface Block {
  _type: string;
  style?: string;
  children?: TextChild[];
}

function renderBlocks(blocks: Block[] = []) {
  return blocks
    .map((block, index) => {
      if (block?._type !== "block") return null;

      const text = block.children?.map((c) => c.text ?? "").join("") ?? "";

      if (block.style === "h3") {
        return (
          <h3 key={index} class="text-[22px] font-bold mt-12 mb-4 tracking-tight text-black">
            {text}
          </h3>
        );
      }

      if (block.style === "blockquote") {
        return (
          <div key={index} class="my-16 py-4 px-2">
            <h2 class="text-[32px] md:text-[40px] font-bold leading-[1.2] tracking-tighter text-black text-center italic">
              “{text}”
            </h2>
            <div class="mt-8 flex flex-col items-center">
              <div class="w-8 h-8 bg-[#FFE8D6] rounded-full mb-2" />
              <p class="text-[14px] font-bold">Full name</p>
              <p class="text-[12px] text-gray-400">Role at company</p>
            </div>
          </div>
        );
      }

      return (
        <p key={index} class="text-[#424245] text-[17px] leading-[1.7] mb-6 tracking-tight">
          {text}
        </p>
      );
    })
    .filter((el): el is preact.JSX.Element => el !== null);
}

export default function ArticlePage({ data }: PageProps<ArticleData>) {
  const { article } = data;

  return (
    <div class="min-h-screen bg-white font-sans antialiased text-black pb-32">
      {/* 1. 导航栏保持一致 */}
      <Navigation currentPage="portfolio" />

      <main class="max-w-[800px] mx-auto pt-48 px-6 md:px-0">
        {/* 2. 文章头部信息 */}
        <header class="text-center mb-16">
          <p class="text-[#86868B] text-[14px] font-medium mb-4 uppercase tracking-widest">
            {new Date(article._createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 class="text-[48px] md:text-[64px] font-bold tracking-tighter leading-[1.1] mb-4">
            {article.title}
          </h1>
          <p class="text-[#86868B] text-[16px] font-medium">
            {article.authorName}
          </p>
        </header>

        {/* 3. 主图（大幅展示） */}
        {article.mainImage && (
          <section class="mb-20">
            <div class="aspect-[16/10] bg-[#F5F5F7] rounded-[40px] overflow-hidden shadow-sm">
              <img 
                src={urlFor(article.mainImage).width(1200).url()} 
                class="w-full h-full object-cover"
              />
            </div>
          </section>
        )}

        {/* 4. 正文内容 */}
        <article class="max-w-[680px] mx-auto">
          {renderBlocks(article.body || [])}
        </article>
      </main>
    </div>
  );
}