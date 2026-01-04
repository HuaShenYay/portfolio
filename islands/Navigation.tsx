import { animate } from "@motionone/dom";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";

type Page = "things" | "about" | "portfolio";

interface NavigationProps {
  currentPage?: Page;
}

type LinkItem = {
  href: string;
  label: string;
  page: Page;
};

export default function Navigation({ currentPage = "things" }: NavigationProps) {
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
  const pillStateRef = useRef({ x: 0, w: 0, o: 0 });

  const updateToIndex = (index: number | null, visible: boolean) => {
    const root = containerRef.current;
    const pillEl = pillRef.current;
    if (!root) return;

    const i = index ?? activeIndex;
    const el = linkRefs.current[i];
    if (!el) return;

    const rootRect = root.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const pad = 8;
    const x = elRect.left - rootRect.left - pad;
    const w = elRect.width + pad * 2;

    const next = { x, w, o: visible ? 1 : 0 };
    pillStateRef.current = next;

    if (pillEl) {
      const scale = visible ? 1 : 0.985;
      pillEl.style.opacity = String(next.o);
      animate(
        pillEl,
        {
          transform: [`translateX(${x}px) scale(${scale})`],
          width: [`${w}px`],
        },
        { duration: 0.38, easing: [0.22, 1, 0.36, 1] },
      );
    }
  };

  useEffect(() => {
    setActiveIndex(Math.max(0, items.findIndex((it) => it.page === currentPage)));
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

  useEffect(() => {
    const pillEl = pillRef.current;
    if (!pillEl) return;
    const s = pillStateRef.current;
    pillEl.style.opacity = String(s.o);
    pillEl.style.width = `${s.w}px`;
    pillEl.style.transform = `translateX(${s.x}px) scale(0.985)`;
  }, []);

  return (
    <nav class="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <div
        ref={containerRef}
        class="relative flex items-center gap-10 px-10 py-3 rounded-full bg-white/70 backdrop-blur-3xl border border-white/55 ring-1 ring-black/5 shadow-[0_14px_40px_-22px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,background-color] duration-300 ease-out hover:shadow-[0_18px_46px_-26px_rgba(0,0,0,0.40)] active:scale-[0.995] liquid-glass"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <div class="pointer-events-none absolute inset-0 rounded-full liquid-glass__highlight" />
        <div class="pointer-events-none absolute inset-0 rounded-full liquid-glass__noise" />

        <div
          ref={pillRef}
          class="pointer-events-none absolute inset-y-1 rounded-full ring-1 ring-black/5 shadow-[0_10px_25px_-20px_rgba(0,0,0,0.40)] backdrop-blur-3xl transition-opacity duration-200 ease-out will-change-transform liquid-pill"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.40))",
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
              class={`relative text-[15px] font-medium transition-[color,opacity,transform] duration-250 ease-out hover:-translate-y-[0.5px] ${
                isCurrent ? "text-black font-semibold" : "text-black/55 hover:text-black"
              }`}
            >
              <span class="relative">
                {it.label}
                {isCurrent && (
                  <span class="pointer-events-none absolute -bottom-1 left-0 h-[1.5px] w-full origin-left bg-black/90 transition-transform duration-300 ease-out" />
                )}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
