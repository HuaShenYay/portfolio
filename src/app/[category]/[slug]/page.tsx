import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkDetail from "@/components/WorkDetail";
import { getVisibleWorks, getWorkBySlug, getWorksByCategory } from "@/lib/data";
import { CATEGORY_LABELS, isCategory } from "@/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const works = await getVisibleWorks();

  return works.map((work) => ({
    category: work.category,
    slug: work.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isCategory(category)) return {};

  const work = await getWorkBySlug(slug, category);
  if (!work) return {};

  return {
    title: `${work.title} / ${CATEGORY_LABELS[work.category]} / HSY`,
    description: work.description,
  };
}

export default async function WorkPage({ params }: PageProps<"/[category]/[slug]">) {
  const { category, slug } = await params;
  if (!isCategory(category)) notFound();

  const [work, categoryWorks] = await Promise.all([
    getWorkBySlug(slug, category),
    getWorksByCategory(category),
  ]);

  if (!work || work.category !== category) notFound();

  const currentIndex = categoryWorks.findIndex((item) => item.slug.current === slug);
  const previousWork = currentIndex > 0 ? categoryWorks[currentIndex - 1] : undefined;
  const nextWork = currentIndex >= 0 && currentIndex < categoryWorks.length - 1
    ? categoryWorks[currentIndex + 1]
    : undefined;

  return <WorkDetail work={work} previousWork={previousWork} nextWork={nextWork} />;
}
