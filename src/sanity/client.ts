import { createClient, type SanityClient } from 'next-sanity'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const isSanityConfigured = () => {
  return !!projectId && projectId !== ''
}

// 仅在 projectId 存在时创建客户端，避免空值抛错
export const sanityClient: SanityClient | null = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-08-01',
      useCdn: true,
    })
  : null

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error('Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID.')
  return builder.image(source)
}
