# Brutalist Web — Examples

## 正确 vs 错误对比

### 按钮

**错误**（圆角+阴影）：
```html
<button class="rounded-lg shadow-lg bg-blue-500 text-white px-4 py-2">点击我</button>
```

**正确**（硬边缘、无圆角、CSS 变量颜色）：
```html
<button class="rounded-none border border-[var(--color-border)] font-mono bg-[var(--color-bg)] px-4 py-2 md:px-6 md:py-3 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-none">点击我</button>
```

### 卡片

**错误**（渐变+圆角）：
```html
<div class="rounded-xl shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6">
  <h3 class="text-xl font-semibold">标题</h3>
</div>
```

**正确**（纯色、硬边缘、CSS 变量颜色）：
```html
<div class="rounded-none border border-[var(--color-border)] bg-[var(--color-bg)] p-4 md:p-6">
  <h3 class="font-serif font-bold text-lg md:text-xl">标题</h3>
</div>
```

### 输入框

**错误**（灰色边框、圆角）：
```html
<input class="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
```

**正确**（黑色边框、无圆角、CSS 变量颜色）：
```html
<input class="rounded-none border border-[var(--color-border)] font-mono bg-[var(--color-bg)] px-3 py-2 md:px-4 md:py-3" placeholder="请输入..." />
```

## 使用示例 Prompt

### 90年代个人主页
```
Use Brutalist Web style to create a personal homepage:
1. White background, no decoration
2. Large serif heading with the person's name
3. Horizontal rule separator
4. Monospace body text with a brief bio
5. Blue underlined links section
6. Simple 1px border table listing recent updates
7. No shadows, no rounded corners, no gradients, no animations
```

### 极简博客
```
Use Brutalist Web style to create a minimalist blog:
1. Site title in large serif font
2. Navigation as plain blue underlined links
3. Blog posts with serif titles, monospace dates
4. 1px black border separating posts
5. Maximum readability, zero decoration
```
