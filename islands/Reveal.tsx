import { animate } from "@motionone/dom";
import { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";

interface RevealProps {
  children: JSX.Element | JSX.Element[];
  class?: string;
  delay?: number;
  y?: number;
}

export default function Reveal(
  { children, class: className, delay = 0, y = 10 }: RevealProps,
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = globalThis.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0px)";
      el.style.filter = "none";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.filter = "blur(2px)";

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        const animation = animate(
          el,
          {
            opacity: [0, 1],
            transform: [`translateY(${y}px)`, "translateY(0px)"],
            filter: ["blur(2px)", "blur(0px)"],
          },
          {
            duration: 0.55,
            delay,
            easing: [0.22, 1, 0.36, 1],
          },
        );

        animation.finished.then(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0px)";
          el.style.filter = "blur(0px)";
        }).catch(() => {
          // ignore
        });
        io.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, y]);

  return (
    <div ref={ref} class={className}>
      {children}
    </div>
  );
}
