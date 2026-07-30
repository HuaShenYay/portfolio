---
name: brutalist-web
description: "Brutalist Web (网页粗野主义) design system for Tailwind CSS projects. Enforces raw early-90s HTML aesthetics: system fonts, blue underlined links, pure white backgrounds, zero decoration. Use when the user requests brutalist, 粗野主义, brutalist-web style, or references the brutalist-web style slug. Generates code with strict class constraints — no rounded corners, no shadows, no gradients, no animations."
---

# Brutalist Web (网页粗野主义) Design System

> 回归90年代早期互联网的原始HTML美学。内容优先于形式。

## 核心理念

- Content over decoration — 每个元素只服务于信息目的
- System fonts + monospace — 不需要自定义字体
- Unstyled HTML feel — 仿佛 CSS 几乎不存在
- Blue underlined links, purple visited — 经典浏览器默认
- Times New Roman / Georgia 标题，system monospace 正文
- 纯白背景黑字 — 最大可读性
- Thin 1px borders only — 无装饰框
- Minimal padding — 内容贴近边缘

---

## CSS 变量定义（可选）

如果项目需要通过 CSS 变量集中管理颜色（便于主题切换），可在 `:root` 中定义以下变量：

```css
:root {
  --color-bg: #ffffff;
  --color-bg-inverted: #000000;
  --color-text: #000000;
  --color-text-inverted: #ffffff;
  --color-text-muted: #374151;
  --color-border: #000000;
}
```

### 与 Tailwind Class 的对应关系

| CSS 变量 | Tailwind Class（默认） | CSS 变量写法（可选） |
|----------|----------------------|---------------------|
| `--color-bg` | `bg-white` | `bg-[var(--color-bg)]` |
| `--color-bg-inverted` | `bg-black` | `bg-[var(--color-bg-inverted)]` |
| `--color-text` | `text-black` | `text-[var(--color-text)]` |
| `--color-text-inverted` | `text-white` | `text-[var(--color-text-inverted)]` |
| `--color-text-muted` | `text-gray-700` | `text-[var(--color-text-muted)]` |
| `--color-border` | `border-black` | `border-[var(--color-border)]` |

> 默认使用 Tailwind 内置 class 即可。如果项目启用了 CSS 变量，可将对应 class 替换为 `bg-[var(--color-bg)]` 写法，效果完全一致。

---

## Token 字典

### 字体
```
标题: font-serif font-bold
正文: font-mono text-sm
```

### 字号
```
Hero:  text-3xl md:text-5xl
H1:    text-2xl md:text-4xl
H2:    text-xl md:text-2xl
H3:    text-lg md:text-xl
正文:  text-sm md:text-base
小字:  text-xs md:text-sm
```

### 颜色
```
背景:     bg-white
反转背景: bg-black
主文字:   text-black
反转文字: text-white
次要文字: text-gray-700
页脚次要文字: text-gray-400
边框:     border-black
```

### 边框
```
宽度: border
颜色: border-black
圆角: rounded-none
```

### 阴影
```
全部: shadow-none
偏移阴影(可选): shadow-[Xpx_Xpx_0px_0px_rgba(...)]
```

### 间距
```
Section: py-6 md:py-8
容器:    px-4
卡片:    p-4
```

### 交互
```
按钮 hover: hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
卡片 hover: hover:-translate-y-1
过渡: transition-none (默认)
```

---

## [FORBIDDEN] 绝对禁止

以下 class 绝对禁止使用，生成时必须检查并避免：

### 禁止的 Class
- `rounded-sm`, `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`
- `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`
- `backdrop-blur`, `backdrop-blur-sm`, `backdrop-blur-md`, `backdrop-blur-lg`
- `transition`, `transition-all`

### 禁止的模式
- `rounded-` (除 `rounded-none`)
- `shadow-` (除硬编码偏移阴影)
- `bg-gradient-`
- `backdrop-blur`
- `animate-`
- `transition-` / `duration-`

### 禁止的模式（设计层面）
- 自定义 Web 字体（Inter, Roboto, Geist 等）
- 非白/非黑背景色（除 Hero 等特定强调区块）
- 大内边距 / 过多留白
- 嵌套卡片（卡片里套卡片）
- 渐变文字（background-clip: text）
- 玻璃态（glassmorphism）
- Tiny uppercase tracked eyebrow 放在每个 section 标题上
- 单侧粗边框装饰（border-left/right accent stripe）
- Bounce / elastic 缓动曲线

---

## [REQUIRED] 必须包含

### 按钮
```
rounded-none border border-black font-mono bg-white
```

### 卡片
```
rounded-none border border-black bg-white
```

### 输入框
```
rounded-none border border-black font-mono bg-white
```

---

## [TEMPLATES] 页面骨架

### 导航栏
```html
<nav class="bg-white border-b-2 md:border-b-4 border-black px-4 md:px-8 py-3 md:py-4">
  <div class="flex items-center justify-between max-w-6xl mx-auto">
    <a href="/" class="font-black text-xl md:text-2xl tracking-wider">{LOGO_TEXT}</a>
    <div class="flex gap-4 md:gap-8 font-mono text-sm md:text-base">
      {NAV_LINKS}
    </div>
  </div>
</nav>
```

### Hero 区块
```html
<section class="min-h-[60vh] md:min-h-[80vh] flex items-center px-4 md:px-8 py-12 md:py-0 bg-white border-b-2 md:border-b-4 border-black">
  <div class="max-w-4xl mx-auto">
    <h1 class="font-black text-4xl md:text-6xl lg:text-8xl leading-tight tracking-tight mb-4 md:mb-6">{HEADLINE}</h1>
    <p class="font-mono text-base md:text-xl max-w-xl mb-6 md:mb-8 text-gray-700">{SUBHEADLINE}</p>
    <button class="bg-black text-white font-black px-6 py-3 md:px-8 md:py-4 border-2 md:border-4 border-black rounded-none hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-none text-sm md:text-base">{CTA_TEXT}</button>
  </div>
</section>
```

### 卡片网格
```html
<section class="py-6 md:py-8 px-4">
  <div class="max-w-6xl mx-auto">
    <h2 class="font-black text-2xl md:text-4xl mb-8 md:mb-12">{SECTION_TITLE}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div class="bg-white border-2 md:border-4 border-black rounded-none p-4 md:p-6 hover:-translate-y-1 transition-none">
        <h3 class="font-black text-lg md:text-xl mb-2">{CARD_TITLE}</h3>
        <p class="font-mono text-sm md:text-base text-gray-700">{CARD_DESCRIPTION}</p>
      </div>
    </div>
  </div>
</section>
```

### 页脚
```html
<footer class="bg-black text-white py-12 md:py-16 px-4 md:px-8 border-t-2 md:border-t-4 border-black">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <span class="font-black text-xl md:text-2xl">{LOGO_TEXT}</span>
        <p class="font-mono text-sm mt-4 text-gray-400">{TAGLINE}</p>
      </div>
    </div>
  </div>
</footer>
```

---

## [CHECKLIST] 生成后自检

每次生成代码后，逐项验证：

1. **圆角检查**: 搜索 `rounded-`，确认只有 `rounded-none`
2. **阴影检查**: 搜索 `shadow-`，确认只有 `shadow-none` 或 `shadow-[Xpx...]` 格式
3. **边框检查**: 确认边框颜色为 `border-black`，无 `border-gray-*`
4. **交互检查**: 按钮有 hover 位移效果，无 transition/animate
5. **响应式检查**: 边框 `border-2 md:border-4`，间距 `p-4 md:p-6`，字号 `text-sm md:text-base`
6. **字体检查**: 标题 `font-black`/`font-serif`，正文 `font-mono`
7. **禁止项检查**: 无渐变、无自定义字体、无动画、无玻璃态、无嵌套卡片

> 如果任何一项不通过，修正后重新生成。
