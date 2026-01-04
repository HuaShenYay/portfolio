import { Handlers, PageProps } from "$fresh/server.ts";
import { client, urlFor } from "../utils/sanity.ts";
import Navigation from "../islands/LiquidNavGlass.tsx";
import Reveal from "../islands/Reveal.tsx";

type SanityImage = Record<string, unknown> & {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

interface TextChild {
  text?: string;
}

interface Block {
  _type: string;
  children?: TextChild[];
}

interface SanityPost {
  _id: string;
  slug?: { current: string };
  title: string;
  _createdAt: string;
  mainImage?: SanityImage;
  body?: Block[];
}

interface Project {
  _id: string;
  title: string;
  year: string;
  mainImage?: SanityImage;
  description?: string;
  _createdAt: string;
  slug?: { current: string };
}

interface PortfolioData {
  projects: Project[];
}

export const handler: Handlers<PortfolioData> = {
  async GET(_req, ctx) {
    try {
      console.log("Fetching portfolio data with portfolio category...");
      
      // 获取带有 portfolio category 的文章
      const query = `*[_type == "post" && "portfolio" in categories[]->title] | order(_createdAt desc) {
        _id,
        slug,
        title,
        _createdAt,
        mainImage,
        body,
        categories[]->{
          _id,
          title
        }
      }`;
      const projects = await client.fetch(query);
      console.log("Portfolio projects fetched:", projects);
      console.log("Projects count:", projects?.length || 0);
      
      // 转换数据格式
      const formattedProjects = (projects as SanityPost[]).map((post) => ({
        slug: post.slug,
        _id: post._id,
        title: post.title,
        year: new Date(post._createdAt).getFullYear().toString(),
        mainImage: post.mainImage,
        description: post.body?.find((block) => block._type === "block")?.children?.[0]?.text || "",
        _createdAt: post._createdAt,
      }));
      
      return ctx.render({ projects: formattedProjects });
    } catch (err) {
      console.error("Portfolio fetch error:", err);
      return ctx.render({ projects: [] });
    }
  },
};

export default function PortfolioPage({ data }: PageProps<PortfolioData>) {
  const { projects = [] } = data || {};

  return (
    <div class="min-h-screen bg-white font-sans antialiased text-black">
      <Navigation currentPage="portfolio" />

      <main class="max-w-[1100px] mx-auto pt-56 px-8 md:px-16 pb-32">
        <Reveal>
          <h1 class="text-[48px] md:text-[64px] font-bold tracking-tighter mb-20">Portfolio</h1>
        </Reveal>

        {/* 统一的网格流：文字和图片混合排列 */}
        <Reveal delay={0.04}>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
            {projects.map((project, index) => {
              // 逻辑：每 3 个一组，第一个（最新的那个）永远是全宽大项
              const isLarge = index % 3 === 0;
              const mainImage = project.mainImage;
              const hasImage = !!mainImage;

              return (
                <a 
                  href={`/portfolio/${project.slug?.current || project._id}`}
                  key={project._id} 
                  class={`${isLarge ? 'md:col-span-2' : 'md:col-span-1'} group cursor-pointer transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[2px] active:translate-y-0`}
                >
                  {/* 封面区域 */}
                  <div class={`aspect-video rounded-[32px] overflow-hidden mb-6 ring-1 ring-black/5 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-500 ease-out group-hover:shadow-[0_16px_44px_-30px_rgba(0,0,0,0.40)]
                    ${!hasImage ? 'bg-[#F5F5F7] flex flex-col justify-center px-12 md:px-20' : ''}`}
                  >
                    {hasImage ? (
                      <img 
                        src={urlFor(mainImage).width(isLarge ? 1200 : 600).url()} 
                        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                        alt={project.title}
                      />
                    ) : (
                      /* 如果是纯文字作品，在封面位置显示标题和简介预览，防止视觉留白过多 */
                      <div class="max-w-2xl">
                        <p class="text-[14px] text-gray-400 font-medium mb-4 uppercase tracking-widest">Text Work</p>
                        <h3 class={`${isLarge ? 'text-[32px]' : 'text-[24px]'} font-bold leading-tight tracking-tight mb-4`}>
                          {project.title}
                        </h3>
                        {project.description && (
                          <p class="text-[#86868B] text-[17px] line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* 底部信息栏（仅在有图时显示，因为无图时信息已在色块内展示，或者为了统一风格也可以保留） */}
                  <div class="flex justify-between items-start px-2">
                    <span class="text-[15px] text-[#86868B] font-medium tabular-nums ml-auto">
                      {new Date(project._createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* 下方原本的文字作品区可以保留作为“归档”或者直接删掉 */}
        <div class="mt-40 w-full h-[1px] bg-gray-100"></div>
      </main>
    </div>
  );
}