import {defineQuery} from 'next-sanity'

export const queries = {
  getAllWorks: defineQuery(`*[_type == "work"] | order(publishedAt desc) {
    _id, title, slug, description, category, year, coverImage, link,
    "tags": coalesce(tags, []), publishedAt
  }`),
  getWorksByCategory: defineQuery(`*[_type == "work" && category == $category] | order(publishedAt desc) {
    _id, title, slug, description, category, year, coverImage, link,
    "tags": coalesce(tags, []), publishedAt
  }`),
  getWorkBySlug: defineQuery(`*[_type == "work" && slug.current == $slug][0] {
    _id, title, slug, description, category, year,
    "content": coalesce(content, []), coverImage,
    video { asset->{playbackId, assetId, filename, status, thumbTime} }, link,
    "tags": coalesce(tags, []), publishedAt
  }`),
  getWorkByCategoryAndSlug: defineQuery(`*[
    _type == "work" && category == $category && slug.current == $slug
  ][0] {
    _id, title, slug, description, category, year,
    "content": coalesce(content, []), coverImage,
    video { asset->{playbackId, assetId, filename, status, thumbTime} }, link,
    "tags": coalesce(tags, []), publishedAt
  }`),
  getLatestWorks: defineQuery(`*[_type == "work"] | order(publishedAt desc)[0...4] {
    _id, title, slug, description, category, year, coverImage, link,
    "tags": coalesce(tags, []), publishedAt
  }`),
}
