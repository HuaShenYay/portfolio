import { sanityClient } from '@/sanity/client'
import { queries } from '@/sanity/queries'
import type { QueryParams } from 'next-sanity'
import type { Work, Category } from './types'

// ─── Mock 数据（17个作品，覆盖四个类别）─────────────────────────────────────────

const mockWorks: Work[] = [
  // 文学（5）
  {
    _id: 'mock-lit-1',
    title: '消失的信号',
    slug: { current: 'xiao-shi-de-xin-hao' },
    description: '一部关于信息过载时代的短篇小说。',
    category: 'literature',
    year: '2024',
    tags: ['短篇小说', '科幻'],
    publishedAt: '2024-06-01',
  },
  {
    _id: 'mock-lit-2',
    title: '城市边缘',
    slug: { current: 'cheng-shi-bian-yuan' },
    description: '散文集，记录城市边缘地带的观察与思考。',
    category: 'literature',
    year: '2024',
    tags: ['散文'],
    publishedAt: '2024-03-15',
  },
  {
    _id: 'mock-lit-3',
    title: '午夜图书馆',
    slug: { current: 'wu-ye-tu-shu-guan' },
    description: '组诗，关于阅读、记忆与遗忘。',
    category: 'literature',
    year: '2023',
    tags: ['诗歌'],
    publishedAt: '2023-11-20',
  },
  {
    _id: 'mock-lit-4',
    title: '数字废墟',
    slug: { current: 'shu-zi-fei-xu' },
    description: '长篇科幻小说连载。',
    category: 'literature',
    year: '2023',
    tags: ['科幻小说', '连载'],
    publishedAt: '2023-05-10',
  },
  {
    _id: 'mock-lit-5',
    title: '致未来的信',
    slug: { current: 'zhi-wei-lai-de-xin' },
    description: '书信体散文。写给尚未出生的人。',
    category: 'literature',
    year: '2022',
    tags: ['散文', '书信体'],
    publishedAt: '2022-09-01',
  },

  // AIGC影片（4）
  {
    _id: 'mock-aigc-1',
    title: '机器之梦',
    slug: { current: 'ji-qi-zhi-meng' },
    description: 'AI生成的实验短片，探索机器意识的边界。',
    category: 'aigc-films',
    year: '2024',
    tags: ['AI', '实验短片'],
    publishedAt: '2024-05-20',
  },
  {
    _id: 'mock-aigc-2',
    title: '流动的城市',
    slug: { current: 'liu-dong-de-cheng-shi' },
    description: '用生成式AI重构城市景观的影像实验。',
    category: 'aigc-films',
    year: '2024',
    tags: ['AI', '城市影像'],
    publishedAt: '2024-02-10',
  },
  {
    _id: 'mock-aigc-3',
    title: '数据之海',
    slug: { current: 'shu-ju-zhi-hai' },
    description: '海洋监测数据转译为视觉语言。',
    category: 'aigc-films',
    year: '2023',
    tags: ['数据可视化', '影像'],
    publishedAt: '2023-08-15',
  },
  {
    _id: 'mock-aigc-4',
    title: '回声',
    slug: { current: 'hui-sheng' },
    description: '声音与影像的AI协作创作。',
    category: 'aigc-films',
    year: '2023',
    tags: ['AI', '声音艺术'],
    publishedAt: '2023-04-01',
  },

  // 网站设计（4）
  {
    _id: 'mock-web-1',
    title: '数据花园',
    slug: { current: 'shu-ju-hua-yuan' },
    description: '古典诗词可视化交互网站。',
    category: 'web-design',
    year: '2024',
    tags: ['数据可视化', '交互设计'],
    publishedAt: '2024-07-01',
  },
  {
    _id: 'mock-web-2',
    title: '无界书店',
    slug: { current: 'wu-jie-shu-dian' },
    description: '本地独立书店电商平台。',
    category: 'web-design',
    year: '2024',
    tags: ['电商', 'Next.js'],
    publishedAt: '2024-01-20',
  },
  {
    _id: 'mock-web-3',
    title: '社区档案',
    slug: { current: 'she-qu-dang-an' },
    description: '记录本地历史的数字档案网站。',
    category: 'web-design',
    year: '2023',
    tags: ['数字档案', '社区'],
    publishedAt: '2023-10-05',
  },
  {
    _id: 'mock-web-4',
    title: '极简阅读',
    slug: { current: 'ji-jian-yue-du' },
    description: '专注于长文阅读的网站模板。',
    category: 'web-design',
    year: '2023',
    tags: ['阅读', '模板'],
    publishedAt: '2023-06-18',
  },

  // 数字人文（4）
  {
    _id: 'mock-dh-1',
    title: '文学地图',
    slug: { current: 'wen-xue-di-tu' },
    description: '现代文学作品的地理空间可视化。',
    category: 'digital-humanities',
    year: '2024',
    tags: ['GIS', '文学研究'],
    publishedAt: '2024-04-12',
  },
  {
    _id: 'mock-dh-2',
    title: '语料镜像',
    slug: { current: 'yu-liao-jing-xiang' },
    description: '当代文学主题演变研究。',
    category: 'digital-humanities',
    year: '2023',
    tags: ['语料库', '文本挖掘'],
    publishedAt: '2023-09-22',
  },
  {
    _id: 'mock-dh-3',
    title: '声音档案',
    slug: { current: 'sheng-yin-dang-an' },
    description: '方言采集与数字化保存项目。',
    category: 'digital-humanities',
    year: '2023',
    tags: ['方言', '数字保存'],
    publishedAt: '2023-03-08',
  },
  {
    _id: 'mock-dh-4',
    title: '编码与解码',
    slug: { current: 'bian-ma-yu-jie-ma' },
    description: '数字出版工具的实验性开发。',
    category: 'digital-humanities',
    year: '2022',
    tags: ['数字出版', '工具开发'],
    publishedAt: '2022-11-30',
  },
]

// ─── 数据获取函数（Sanity 优先，fallback 到 mock）─────────────────────────────

async function fetchFromSanity<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch(query, params, {next: {revalidate: 60}})
  } catch {
    return null
  }
}

export async function getAllWorks(): Promise<Work[]> {
  const data = await fetchFromSanity<Work[]>(queries.getAllWorks)
  return data?.length ? data : mockWorks
}

export async function getWorksByCategory(category: Category): Promise<Work[]> {
  const data = await fetchFromSanity<Work[]>(queries.getWorksByCategory, { category })
  return data?.length ? data : mockWorks.filter((w) => w.category === category)
}

export async function getWorkBySlug(slug: string, category?: Category): Promise<Work | null> {
  const query = category ? queries.getWorkByCategoryAndSlug : queries.getWorkBySlug
  const params = category ? {slug, category} : {slug}
  const data = await fetchFromSanity<Work>(query, params)
  return data ?? mockWorks.find((w) => (
    w.slug.current === slug && (!category || w.category === category)
  )) ?? null
}

export async function getVisibleWorks(): Promise<Work[]> {
  const groups = await Promise.all([
    getWorksByCategory('literature'),
    getWorksByCategory('aigc-films'),
    getWorksByCategory('web-design'),
    getWorksByCategory('digital-humanities'),
  ])

  return groups.flat()
}

export async function getLatestWorks(limit = 4): Promise<Work[]> {
  const data = await fetchFromSanity<Work[]>(queries.getLatestWorks)
  if (data?.length) return data
  return [...mockWorks]
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
    .slice(0, limit)
}
