import { useEffect, useMemo, useRef, useState } from "preact/hooks";

type Page = "things" | "about" | "portfolio";

interface LiquidNavWebGLProps {
  currentPage?: Page;
}

type LinkItem = {
  href: string;
  label: string;
  page: Page;
};

export default function LiquidNavWebGL(
  { currentPage = "things" }: LiquidNavWebGLProps,
) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const [webglOk, setWebglOk] = useState(true);

  const links: LinkItem[] = useMemo(
    () => [
      { label: "Things", href: "/", page: "things" },
      { label: "About", href: "/about", page: "about" },
      { label: "Portfolio", href: "/portfolio", page: "portfolio" },
    ],
    [],
  );

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const wrapper = wrapperRef.current;
    const host = canvasHostRef.current;
    if (!wrapper) return;
    if (!host) return;

    let cancelled = false;
    let rafId = 0;
    let cleanupInner: (() => void) | null = null;

    const boot = async () => {
      try {
        const THREE = await import("three");

        if (cancelled) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const webglRenderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        webglRenderer.setPixelRatio(globalThis.devicePixelRatio || 1);
        // keep renderer local; cleanup handled in inner cleanup

        const uniforms = {
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2(0, 0) },
          u_res: { value: new THREE.Vector2(1, 1) },
        };

        const fragmentShader = `
        precision highp float;

        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_res;

        float blob(vec2 uv, vec2 pos, float size) {
          return size / max(0.0005, length(uv - pos));
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / u_res.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= u_res.x / u_res.y;

          float m = blob(uv, u_mouse, 0.16);
          m += blob(uv, vec2(sin(u_time * 0.55) * 0.55, 0.0), 0.12);
          m += blob(uv, vec2(cos(u_time * 0.80) * 0.35, sin(u_time * 0.35) * 0.22), 0.10);

          float threshold = smoothstep(0.42, 0.48, m);

          vec3 color = vec3(1.0);
          float alpha = threshold * 0.42;

          gl_FragColor = vec4(color, alpha);
        }
      `;

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
          fragmentShader,
          uniforms,
          transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const resize = () => {
          const rect = wrapper.getBoundingClientRect();
          const w = Math.max(1, Math.round(rect.width));
          const h = Math.max(1, Math.round(rect.height));

          webglRenderer.setSize(w, h, false);
          uniforms.u_res.value.set(w, h);
        };

        resize();
        host.appendChild(webglRenderer.domElement);
        webglRenderer.domElement.style.pointerEvents = "none";

        const onPointerMove = (e: PointerEvent) => {
          const rect = wrapper.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
          uniforms.u_mouse.value.set(x, y);
        };

        const onPointerLeave = () => {
          uniforms.u_mouse.value.set(0, 0);
        };

        wrapper.addEventListener("pointermove", onPointerMove);
        wrapper.addEventListener("pointerleave", onPointerLeave);
        globalThis.addEventListener?.("resize", resize);

        const tick = () => {
          rafId = globalThis.requestAnimationFrame(tick);
          uniforms.u_time.value += 0.04;
          webglRenderer.render(scene, camera);
        };

        tick();

        cleanupInner = () => {
          globalThis.cancelAnimationFrame(rafId);
          globalThis.removeEventListener?.("resize", resize);
          wrapper.removeEventListener("pointermove", onPointerMove);
          wrapper.removeEventListener("pointerleave", onPointerLeave);

          try {
            geometry.dispose();
            material.dispose();
            webglRenderer.dispose();
          } catch {
            // ignore
          }

          if (
            webglRenderer.domElement &&
            webglRenderer.domElement.parentNode === host
          ) {
            host.removeChild(webglRenderer.domElement);
          }
        };
      } catch {
        setWebglOk(false);
        return;
      }
    };

    void boot();

    return () => {
      cancelled = true;
      cleanupInner?.();
    };
  }, []);

  return (
    <nav class="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <div
        ref={wrapperRef}
        class="relative flex items-center gap-2 px-2 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-2xl overflow-hidden shadow-xl"
      >
        <div
          ref={canvasHostRef}
          class={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 ${
            webglOk ? "opacity-80" : "opacity-0"
          }`}
        />

        {links.map((link) => {
          const isActive = currentPage === link.page;
          return (
            <a
              key={link.href}
              href={link.href}
              class={`relative z-10 px-8 py-2 text-[15px] rounded-full transition-all duration-300 ${
                isActive
                  ? "text-black font-bold"
                  : "text-black/50 hover:text-black font-medium"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
