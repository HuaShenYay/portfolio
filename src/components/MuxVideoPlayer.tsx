"use client";

import MuxPlayer from "@mux/mux-player-react";

interface MuxVideoPlayerProps {
  playbackId: string;
  title: string;
}

export default function MuxVideoPlayer({ playbackId, title }: MuxVideoPlayerProps) {
  return (
    <MuxPlayer
      className="work-detail-mux-player"
      playbackId={playbackId}
      streamType="on-demand"
      metadata={{ video_title: title }}
    />
  );
}
