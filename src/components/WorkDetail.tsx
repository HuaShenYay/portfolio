import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import MuxVideoPlayer from "@/components/MuxVideoPlayer";
import { urlFor } from "@/sanity/client";
import { CATEGORY_LABELS, type Work } from "@/lib/types";

const CATEGORY_CODES: Record<Work["category"], string> = {
  literature: "WRD",
  "aigc-films": "MOV",
  "web-design": "WEB",
  "digital-humanities": "DH",
};

interface WorkDetailProps {
  work: Work;
  previousWork?: Work;
  nextWork?: Work;
}

export default function WorkDetail({ work, previousWork, nextWork }: WorkDetailProps) {
  const categoryLabel = CATEGORY_LABELS[work.category];
  const categoryCode = CATEGORY_CODES[work.category];
  const hasContent = Boolean(work.content?.length);
  const muxAsset = work.video?.asset;
  const playbackId = muxAsset?.playbackId;
  const coverUrl = work.coverImage
    ? urlFor(work.coverImage).width(1600).height(1000).fit("crop").auto("format").url()
    : null;

  return (
    <main className={`work-detail work-detail--${work.category}`}>
      <article className="work-detail-shell">
        <header className="work-detail-status">
          <span>ARCHIVE OBJECT / {categoryCode}</span>
          <span>{categoryLabel}</span>
          <span>{work.year}</span>
          <b>TRANSMISSION READY</b>
        </header>

        <section className="work-detail-copy" aria-labelledby="work-title">
          <p className="work-detail-kicker">{categoryCode}://{work.slug.current}</p>
          <h1 id="work-title">{work.title}</h1>
          <p className="work-detail-description">{work.description}</p>

          {work.tags?.length ? (
            <ul className="work-detail-tags" aria-label="作品标签">
              {work.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          ) : null}

          <dl className="work-detail-meta">
            <div><dt>类别</dt><dd>{categoryLabel}</dd></div>
            <div><dt>年份</dt><dd>{work.year}</dd></div>
            <div><dt>状态</dt><dd>{hasContent ? "正文已接入" : "档案已建立"}</dd></div>
          </dl>

          {work.link ? (
            <a className="work-detail-external" href={work.link} target="_blank" rel="noreferrer">
              打开作品原址 ↗
            </a>
          ) : null}
        </section>

        <section className="work-detail-viewport" aria-label="作品展示区域">
          <div className="work-detail-grid" aria-hidden="true" />
          {playbackId ? (
            <MuxVideoPlayer playbackId={playbackId} title={work.title} />
          ) : coverUrl ? (
            <Image
              className="work-detail-cover"
              src={coverUrl}
              alt={work.coverImage?.alt ?? work.title}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 62vw"
            />
          ) : (
            <div className="work-detail-signal" aria-hidden="true">
              <span>{categoryCode}</span>
              <strong>{work.title}</strong>
              <i /><i /><i />
            </div>
          )}

          {hasContent ? (
            <div className="work-detail-transcript">
              <span className="work-detail-transcript-label">DOCUMENT TEXT</span>
              <PortableText value={work.content!} />
            </div>
          ) : (
            <div className="work-detail-empty">
              <span>CONTENT STATUS</span>
              <strong>{muxAsset ? "VIDEO PROCESSING" : "VISUAL RECORD ONLINE"}</strong>
              <small>{muxAsset ? "Mux 正在处理视频，完成后会自动显示播放器。" : "完整正文或媒体将在档案更新后显示。"}</small>
            </div>
          )}
        </section>

        <footer className="work-detail-nav">
          <Link href={`/${work.category}`}>← 返回{categoryLabel}</Link>
          <div>
            {previousWork ? (
              <Link href={`/${previousWork.category}/${previousWork.slug.current}`}>
                <small>上一件</small><span>{previousWork.title}</span>
              </Link>
            ) : <span className="work-detail-nav-empty">档案起点</span>}
            {nextWork ? (
              <Link href={`/${nextWork.category}/${nextWork.slug.current}`}>
                <small>下一件</small><span>{nextWork.title}</span>
              </Link>
            ) : <span className="work-detail-nav-empty">档案终点</span>}
          </div>
        </footer>
      </article>
    </main>
  );
}
