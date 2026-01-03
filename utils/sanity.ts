import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "y6sc85uh", // 填写你在 Sanity 官网看到的 ID
  dataset: "production",
  useCdn: false, // 设为 false 以确保实时更新
  apiVersion: "2026-01-03",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);