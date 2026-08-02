"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORY_LABELS, type Category, type Work } from "@/lib/types";

const bootSessionScript = `try {
  var root = document.documentElement;
  var key = "hsy-archive-booted";
  if (window.sessionStorage.getItem(key)) {
    root.dataset.hsyBoot = "skip";
  } else {
    window.sessionStorage.setItem(key, "1");
    root.dataset.hsyBoot = "play";
  }
} catch (error) {
  document.documentElement.dataset.hsyBoot = "play";
}`;

const channels = [
  { code: "WRD", title: "文学", href: "/literature", position: "node-words" },
  { code: "MOV", title: "AIGC影片", href: "/aigc-films", position: "node-movie" },
  { code: "WEB", title: "网站设计", href: "/web-design", position: "node-web" },
  { code: "DH", title: "数字人文", href: "/digital-humanities", position: "node-dh" },
];

export default function ArchiveInterface({ works }: { works: Work[] }) {
  const [activeChannel, setActiveChannel] = useState("NODE: SELECT");
  const currentWork = works[0];

  return (
    <main className="y2k-terminal is-booting">
      <script dangerouslySetInnerHTML={{ __html: bootSessionScript }} />
      <div className="boot-screen" aria-hidden="true">
        <div className="boot-mark">HSY</div>
        <div className="boot-copy">
          <span>PERSONAL ARCHIVE SYSTEM</span>
          <strong>LINKING 4 CREATIVE PRACTICES</strong>
          <div className="boot-track"><i /></div>
          <small>WRD · MOV · WEB · DH</small>
        </div>
      </div>

      <div className="terminal-ticker">
        <span>NOW TRANSMITTING</span>
        <strong>{currentWork?.title ?? "等待新的信号"}</strong>
        <span>{currentWork?.year ?? "----"}</span>
      </div>

      <section className="cyber-scene" aria-labelledby="terminal-title">
        <div className="perspective-rays" aria-hidden="true" />
        <div className="signal-beam beam-one" aria-hidden="true" />
        <div className="signal-beam beam-two" aria-hidden="true" />

        <div className="portrait-terminal" aria-hidden="true">
          <div className="portrait-noise" />
          <div className="wire-person">
            <span className="person-head" />
            <span className="person-body" />
            <span className="person-arm arm-left" />
            <span className="person-arm arm-right" />
            <span className="person-leg leg-left" />
            <span className="person-leg leg-right" />
          </div>
          <span className="portrait-code">user_hsy://connected</span>
        </div>

        <div className="memory-shard shard-one" aria-hidden="true"><span>REC</span></div>
        <div className="memory-shard shard-two" aria-hidden="true"><span>03</span></div>

        <div className="cable-bundle" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>

        <div className="scene-title">
          <p>WELCOME TO THE WIRED / 2003—∞</p>
          <h1 id="terminal-title">我的创作空间</h1>
          <span>四种媒介，共用一套感知系统。</span>
        </div>

        <nav className="honeycomb" aria-label="选择创作频道">
          <span className="decor-node ghost-one" aria-hidden="true" />
          <span className="decor-node ghost-two" aria-hidden="true" />
          <span className="decor-node ghost-three" aria-hidden="true" />
          <span className="decor-node ghost-four" aria-hidden="true" />
          <span className="node-shadow shadow-a" aria-hidden="true" />
          <span className="node-shadow shadow-b" aria-hidden="true" />
          <span className="node-shadow shadow-c" aria-hidden="true" />
          <span className="node-shadow shadow-d" aria-hidden="true" />
          <span className="node-core" aria-hidden="true">HSY</span>
          {channels.map((channel) => (
            <Link
              key={channel.href}
              href={channel.href}
              className={`hex-node ${channel.position}`}
              onPointerEnter={() => setActiveChannel(`${channel.code}: ${channel.title}`)}
              onPointerLeave={() => setActiveChannel("NODE: SELECT")}
              onFocus={() => setActiveChannel(`${channel.code}: ${channel.title}`)}
              onBlur={() => setActiveChannel("NODE: SELECT")}
            >
              <small>{channel.code}</small>
              <strong>{channel.title}</strong>
            </Link>
          ))}
        </nav>

        <div className="channel-readout" aria-live="polite">
          <span>{activeChannel}</span>
          <span>4 CHANNELS ONLINE</span>
        </div>

        {currentWork ? (
          <Link className="current-signal" href={`/${currentWork.category}`}>
            <span>CURRENT SIGNAL</span>
            <strong>{currentWork.title}</strong>
            <small>{CATEGORY_LABELS[currentWork.category as Category]}</small>
          </Link>
        ) : null}
      </section>

      <div className="terminal-commandbar" aria-hidden="true">
        <span>4 PRACTICES</span>
        <span>{works.length} SIGNAL{works.length === 1 ? "" : "S"} VISIBLE</span>
        <span>ARCHIVE LIVE</span>
        <b>CHN / UTF-8</b>
      </div>
    </main>
  );
}
