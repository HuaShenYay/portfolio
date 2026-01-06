import { animate } from "@motionone/dom";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import LiquidGlass from "./LiquidGlass.tsx";

type Page = "things" | "about" | "portfolio";

interface LiquidNavGlassProps {
  currentPage?: Page;
}

type LinkItem = {
  href: string;
  label: string;
  page: Page;
};

export default function LiquidNavGlass(
  { currentPage = "things" }: LiquidNavGlassProps,
) {
  const items: LinkItem[] = useMemo(
    () => [
      { href: "/", label: "Things", page: "things" },
      { href: "/about", label: "About", page: "about" },
      { href: "/portfolio", label: "Portfolio", page: "portfolio" },
    ],
    [],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const pillRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, items.findIndex((it) => it.page === currentPage)),
  );
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const updateToIndex = (index: number | null, visible: boolean) => {
    const root = containerRef.current;
    const pillEl = pillRef.current;
    if (!root || !pillEl) return;

    const i = index ?? activeIndex;
    const el = linkRefs.current[i];
    if (!el) return;

    const rootRect = root.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const pad = 8;
    const x = elRect.left - rootRect.left - pad;
    const w = elRect.width + pad * 2;

    pillEl.style.opacity = visible ? "1" : "0";
    const scale = visible ? 1 : 0.985;

    animate(
      pillEl,
      {
        transform: [`translateX(${x}px) scale(${scale})`],
        width: [`${w}px`],
      },
      { duration: 0.38, easing: [0.22, 1, 0.36, 1] },
    );
  };

  useEffect(() => {
    setActiveIndex(
      Math.max(0, items.findIndex((it) => it.page === currentPage)),
    );
  }, [currentPage, items]);

  useEffect(() => {
    updateToIndex(hoverIndex, hoverIndex !== null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoverIndex, activeIndex]);

  useEffect(() => {
    const onResize = () => updateToIndex(hoverIndex, hoverIndex !== null);
    globalThis.addEventListener?.("resize", onResize);
    return () => globalThis.removeEventListener?.("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoverIndex, activeIndex]);

  return (
    <nav class="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <LiquidGlass
        class=""
        displacementScale={72}
        blurAmount={0.085}
        saturation={145}
        aberrationIntensity={2.2}
        cornerRadius={999}
        padding="10px 14px"
      >
        <div
          ref={containerRef}
          class="relative flex items-center gap-2"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <div
            ref={pillRef}
            class="pointer-events-none absolute inset-y-1 rounded-full ring-1 ring-white/25 shadow-[0_10px_25px_-22px_rgba(0,0,0,0.45)] backdrop-blur-3xl will-change-transform"
            style={{
              opacity: 0,
              width: "0px",
              transform: "translateX(0px) scale(0.985)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.18))",
            }}
          />

          {items.map((it, idx) => {
            const isCurrent = it.page === currentPage;
            return (
              <a
                key={it.href}
                href={it.href}
                ref={(el) => (linkRefs.current[idx] = el)}
                onMouseEnter={() => setHoverIndex(idx)}
                class={`relative px-6 py-2 text-[15px] rounded-full transition-[color,opacity,transform] duration-250 ease-out hover:-translate-y-[0.5px] ${
                  isCurrent
                    ? "text-black font-semibold"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {it.label}
              </a>
            );
          })}
        </div>
      </LiquidGlass>
    </nav>
  );
}
