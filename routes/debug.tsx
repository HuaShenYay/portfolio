import { Handlers, PageProps } from "$fresh/server.ts";
import { client } from "../utils/sanity.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    try {
      // 获取特定文章的详细内容
      const post = await client.fetch(`
        *[_type == "post" && slug.current == "2026-2"][0]{
          _id,
          title,
          body,
          content,
          slug
        }
      `);
      
      return new Response(JSON.stringify(post, null, 2), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  },
};
