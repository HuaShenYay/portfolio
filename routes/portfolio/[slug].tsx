import { Handlers, PageProps } from "$fresh/server.ts";
import { client, urlFor } from "../../utils/sanity.ts";
import Navigation from "../../islands/LiquidNavGlass.tsx";
import Reveal from "../../islands/Reveal.tsx";
import Footer from "../../components/Footer.tsx";

interface Block {
  _type: string;
  style?: string;
  children?: TextChild[];
}

interface TextChild {
  text?: string;
}

interface Article {
  title: string;
  _createdAt: string;
  mainImage?: Record<string, unknown>;
  description?: string;
  body?: Block[];
  authorName: string;
  slug?: { current: string };
}

interface ArticleData {
  article: Article;
}

export const handler: Handlers<ArticleData> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    try {
      // 抓取单篇文章详情
      const query =
        `*[_type == "post" && (slug.current == $slug || _id == $slug) && "portfolio" in categories[]->title][0]{
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
    } catch (_err) {
      return ctx.renderNotFound();
    }
  },
};

function renderBlocks(blocks: Block[] = []) {
  return blocks
    .map((block, index) => {
      if (block?._type !== "block") return null;

      const text = block.children?.map((c) => c.text ?? "").join("") ?? "";

      if (block.style === "h3") {
        return (
          <h3
            key={index}
            class="text-[22px] font-bold mt-12 mb-4 tracking-tight text-black"
          >
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
        <p
          key={index}
          class="text-[#424245] text-[17px] leading-[1.7] mb-6 tracking-tight"
        >
          {text}
        </p>
      );
    })
    .filter((el): el is preact.JSX.Element => el !== null);
}

export default function ArticlePage({ data }: PageProps<ArticleData>) {
  const { article } = data;

  return (
    <div class="min-h-screen bg-white font-sans antialiased text-black pb-8">
      {/* 1. 导航栏保持一致 */}
      <Navigation currentPage="portfolio" />

      <main class="max-w-[800px] mx-auto pt-48 px-6 md:px-0">
        {/* 2. 文章头部信息 */}
        <Reveal>
          <header class="text-center mb-16">
            <p class="text-[#86868B] text-[14px] font-medium mb-4 uppercase tracking-widest">
              {new Date(article._createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <h1 class="text-[48px] md:text-[64px] font-bold tracking-tighter leading-[1.1] mb-4">
              {article.title}
            </h1>
            <p class="text-[#86868B] text-[16px] font-medium">
              {article.authorName}
            </p>
          </header>
        </Reveal>

        {/* 3. 主图（大幅展示） */}
        {article.mainImage && (
          <Reveal delay={0.04}>
            <section class="mb-20">
              <div class="aspect-[16/10] bg-[#F5F5F7] rounded-[40px] overflow-hidden ring-1 ring-black/5 shadow-[0_14px_40px_-26px_rgba(0,0,0,0.35)]">
                <img
                  src={urlFor(article.mainImage).width(1200).url()}
                  class="w-full h-full object-cover"
                />
              </div>
            </section>
          </Reveal>
        )}

        {/* 4. 正文内容 */}
        <Reveal delay={0.06}>
          <article class="max-w-[680px] mx-auto">
            {renderBlocks(article.body || [])}
          </article>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
