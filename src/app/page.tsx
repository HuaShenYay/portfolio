import ArchiveInterface from "@/components/ArchiveInterface";
import { getLatestWorks } from "@/lib/data";

export default async function Home() {
  const latestWorks = await getLatestWorks();

  return <ArchiveInterface works={latestWorks.slice(0, 4)} />;
}
