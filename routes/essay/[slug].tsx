import { Handlers, PageProps } from "$fresh/server.ts";
import { client } from "../../utils/sanity.ts";
import Navigation from "../../islands/LiquidNavGlass.tsx";
import Reveal from "../../islands/Reveal.tsx";
import Footer from "../../components/Footer.tsx";

interface Block {
  _type: string;
  style?: string;
  children?: Array<{ text?: string }>;
}

interface EssayPost {
  _id: string;
  title?: string;
  _createdAt: string;
  body?: Block[];
  content?: Block[];
  slug?: { current: string };
  authorName?: string;
}

interface EssayData {
  post: EssayPost;
}

export const handler: Handlers<EssayData> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    try {
      const query =
        `*[_type == "post" && (slug.current == $slug || _id == $slug) && "essay" in categories[]->title][0]{
        _id,
        title,
        _createdAt,
        body,
        content,
        slug,
        "authorName": "Zijie Song",
        categories[]->{
          _id,
          title
        }
      }`;
      const post = await client.fetch(query, { slug });

      if (!post) return ctx.renderNotFound();

      return ctx.render({ post });
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
              "{text}"
            </h2>
            <div class="mt-8 flex flex-col items-center">
              <div class="w-8 h-8 bg-[#FFE8D6] rounded-full mb-2" />
              <p class="text-[14px] font-bold">Zijie Song</p>
              <p class="text-[12px] text-gray-400">Writer</p>
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

export default function EssayPage({ data }: PageProps<EssayData>) {
  const { post } = data;

  return (
    <div class="min-h-screen bg-white font-sans antialiased text-black pb-8">
      {/* 导航栏保持一致 */}
      <Navigation currentPage="things" />

      <main class="max-w-[800px] mx-auto pt-48 px-6 md:px-0">
        {/* 文章头部信息 */}
        <Reveal>
          <header class="text-center mb-16">
            <p class="text-[#86868B] text-[14px] font-medium mb-4 uppercase tracking-widest">
              {new Date(post._createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <h1 class="text-[48px] md:text-[64px] font-bold tracking-tighter leading-[1.1] mb-4">
              {post.title || "Untitled"}
            </h1>
            <p class="text-[#86868B] text-[16px] font-medium">
              {post.authorName || "Zijie Song"}
            </p>
          </header>
        </Reveal>

        {/* 正文内容 */}
        <Reveal delay={0.04}>
          <article class="max-w-[680px] mx-auto">
            {renderBlocks(post.body || post.content || [])}
          </article>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
