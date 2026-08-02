import type { SanityImageSource } from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/types'

export type WorkCoverImage = SanityImageSource & {
  alt?: string
}

export interface MuxVideoAsset {
  playbackId?: string
  assetId?: string
  filename?: string
  status?: string
  thumbTime?: number
}

export interface MuxVideo {
  asset?: MuxVideoAsset
}

export interface Work {
  _id: string
  title: string
  slug: { current: string }
  description: string
  category: 'literature' | 'aigc-films' | 'web-design' | 'digital-humanities'
  year: string
  content?: PortableTextBlock[]
  coverImage?: WorkCoverImage
  video?: MuxVideo
  link?: string
  tags: string[]
  publishedAt?: string
}

export type Category = Work['category']

export const CATEGORY_LABELS: Record<Category, string> = {
  'literature': '文学',
  'aigc-films': 'AIGC影片',
  'web-design': '网站设计',
  'digital-humanities': '数字人文',
}

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[]

export function isCategory(value: string): value is Category {
  return CATEGORIES.includes(value as Category)
}
