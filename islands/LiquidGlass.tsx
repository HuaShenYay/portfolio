import { JSX } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";

type Mode = "shader";

interface LiquidGlassProps {
  children: JSX.Element | JSX.Element[];
  class?: string;
  style?: JSX.CSSProperties;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  cornerRadius?: number;
  padding?: string;
  mode?: Mode;
}

type Vec2 = { x: number; y: number };

type ShaderOptions = {
  width: number;
  height: number;
  fragment: (uv: Vec2, mouse?: Vec2) => Vec2;
};

function smoothStep(a: number, b: number, t: number): number {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function length2(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

function roundedRectSDF(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): number {
  const qx = Math.abs(x) - width + radius;
  const qy = Math.abs(y) - height + radius;
  return Math.min(Math.max(qx, qy), 0) +
    length2(Math.max(qx, 0), Math.max(qy, 0)) - radius;
}

function texture(x: number, y: number): Vec2 {
  return { x, y };
}

const fragmentShaders = {
  liquidGlass: (uv: Vec2): Vec2 => {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);
    const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
    const scaled = smoothStep(0, 1, displacement);
    return texture(ix * scaled + 0.5, iy * scaled + 0.5);
  },
};

class ShaderDisplacementGenerator {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(private options: ShaderOptions) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = options.width;
    this.canvas.height = options.height;
    this.canvas.style.display = "none";

    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");
    this.context = ctx;
  }

  updateShader(): string {
    const w = this.options.width;
    const h = this.options.height;

    let maxScale = 1;
    const rawValues: number[] = [];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const uv: Vec2 = { x: x / w, y: y / h };
        const pos = this.options.fragment(uv);
        const dx = pos.x * w - x;
        const dy = pos.y * h - y;
        maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
        rawValues.push(dx, dy);
      }
    }

    const imageData = this.context.createImageData(w, h);
    const data = imageData.data;

    let rawIndex = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = rawValues[rawIndex++];
        const dy = rawValues[rawIndex++];

        const edgeDistance = Math.min(x, y, w - x - 1, h - y - 1);
        const edgeFactor = Math.min(1, edgeDistance / 2);

        const smoothedDx = dx * edgeFactor;
        const smoothedDy = dy * edgeFactor;

        const r = smoothedDx / maxScale + 0.5;
        const g = smoothedDy / maxScale + 0.5;

        const pixelIndex = (y * w + x) * 4;
        data[pixelIndex] = Math.max(0, Math.min(255, r * 255));
        data[pixelIndex + 1] = Math.max(0, Math.min(255, g * 255));
        data[pixelIndex + 2] = Math.max(0, Math.min(255, g * 255));
        data[pixelIndex + 3] = 255;
      }
    }

    this.context.putImageData(imageData, 0, 0);
    return this.canvas.toDataURL();
  }

  destroy() {
    this.canvas.remove();
  }
}

function GlassFilter(
  { id, displacementScale, aberrationIntensity, width, height, shaderMapUrl }: {
    id: string;
    displacementScale: number;
    aberrationIntensity: number;
    width: number;
    height: number;
    shaderMapUrl: string;
  },
) {
  return (
    <svg style={{ position: "absolute", width, height }} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-edge-mask`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="black" stopOpacity="0" />
          <stop
            offset={`${Math.max(30, 80 - aberrationIntensity * 2)}%`}
            stopColor="black"
            stopOpacity="0"
          />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </radialGradient>

        <filter
          id={id}
          x="-35%"
          y="-35%"
          width="170%"
          height="170%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            x="0"
            y="0"
            width="100%"
            height="100%"
            result="DISPLACEMENT_MAP"
            href={shaderMapUrl}
            preserveAspectRatio="xMidYMid slice"
          />

          <feColorMatrix
            in="DISPLACEMENT_MAP"
            type="matrix"
            values="0.3 0.3 0.3 0 0
                   0.3 0.3 0.3 0 0
                   0.3 0.3 0.3 0 0
                   0 0 0 1 0"
            result="EDGE_INTENSITY"
          />

          <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
            <feFuncA
              type="discrete"
              tableValues={`0 ${aberrationIntensity * 0.05} 1`}
            />
          </feComponentTransfer>

          <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={displacementScale}
            xChannelSelector="R"
            yChannelSelector="B"
            result="RED_DISPLACED"
          />
          <feColorMatrix
            in="RED_DISPLACED"
            type="matrix"
            values="1 0 0 0 0
                   0 0 0 0 0
                   0 0 0 0 0
                   0 0 0 1 0"
            result="RED_CHANNEL"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={displacementScale - aberrationIntensity * 3}
            xChannelSelector="R"
            yChannelSelector="B"
            result="GREEN_DISPLACED"
          />
          <feColorMatrix
            in="GREEN_DISPLACED"
            type="matrix"
            values="0 0 0 0 0
                   0 1 0 0 0
                   0 0 0 0 0
                   0 0 0 1 0"
            result="GREEN_CHANNEL"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={displacementScale - aberrationIntensity * 6}
            xChannelSelector="R"
            yChannelSelector="B"
            result="BLUE_DISPLACED"
          />
          <feColorMatrix
            in="BLUE_DISPLACED"
            type="matrix"
            values="0 0 0 0 0
                   0 0 0 0 0
                   0 0 1 0 0
                   0 0 0 1 0"
            result="BLUE_CHANNEL"
          />

          <feBlend
            in="GREEN_CHANNEL"
            in2="BLUE_CHANNEL"
            mode="screen"
            result="GB_COMBINED"
          />
          <feBlend
            in="RED_CHANNEL"
            in2="GB_COMBINED"
            mode="screen"
            result="RGB_COMBINED"
          />

          <feGaussianBlur
            in="RGB_COMBINED"
            stdDeviation={Math.max(0.1, 0.5 - aberrationIntensity * 0.1)}
            result="ABERRATED_BLURRED"
          />
          <feComposite
            in="ABERRATED_BLURRED"
            in2="EDGE_MASK"
            operator="in"
            result="EDGE_ABERRATION"
          />

          <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feComposite
            in="CENTER_ORIGINAL"
            in2="INVERTED_MASK"
            operator="in"
            result="CENTER_CLEAN"
          />

          <feComposite
            in="EDGE_ABERRATION"
            in2="CENTER_CLEAN"
            operator="over"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default function LiquidGlass({
  children,
  class: className = "",
  style,
  displacementScale = 70,
  blurAmount = 0.08,
  saturation = 140,
  aberrationIntensity = 2,
  cornerRadius = 999,
  padding = "10px 14px",
  mode = "shader",
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);

  const id = useMemo(() => `lg-${Math.random().toString(36).slice(2)}`, []);
  const [shaderMapUrl, setShaderMapUrl] = useState<string>("");
  const [size, setSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(rect.height)),
      });
    };

    update();
    globalThis.addEventListener?.("resize", update);
    return () => globalThis.removeEventListener?.("resize", update);
  }, []);

  useEffect(() => {
    if (mode !== "shader") return;
    const w = Math.max(1, size.width);
    const h = Math.max(1, size.height);

    try {
      const gen = new ShaderDisplacementGenerator({
        width: w,
        height: h,
        fragment: fragmentShaders.liquidGlass,
      });
      const url = gen.updateShader();
      gen.destroy();
      setShaderMapUrl(url);
    } catch {
      setShaderMapUrl("");
    }
  }, [mode, size.width, size.height]);

  const backdropStyle: JSX.CSSProperties = {
    filter: shaderMapUrl ? `url(#${id})` : undefined,
    backdropFilter: `blur(${4 + blurAmount * 32}px) saturate(${saturation}%)`,
  };

  return (
    <div ref={ref} class={`relative ${className}`} style={style}>
      {shaderMapUrl && (
        <GlassFilter
          id={id}
          displacementScale={displacementScale}
          aberrationIntensity={aberrationIntensity}
          width={size.width}
          height={size.height}
          shaderMapUrl={shaderMapUrl}
        />
      )}

      <div
        class="relative inline-flex items-center"
        style={{
          borderRadius: `${cornerRadius}px`,
          padding,
          overflow: "hidden",
          boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.18)",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
        }}
      >
        <span
          class="absolute inset-0"
          style={{
            ...backdropStyle,
            position: "absolute",
            inset: 0,
          }}
        />

        <span
          class="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.45), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0))",
            opacity: 0.9,
          }}
        />

        <div class="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
