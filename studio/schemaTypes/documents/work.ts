import {defineField, defineType} from 'sanity'

export const work = defineType({
  name: 'work',
  title: '作品',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: '类别',
      type: 'string',
      options: {
        list: [
          {title: '文学', value: 'literature'},
          {title: 'AIGC影片', value: 'aigc-films'},
          {title: '网站设计', value: 'web-design'},
          {title: '数字人文', value: 'digital-humanities'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: '年份',
      type: 'string',
      validation: (rule) => rule.required().regex(/^\d{4}$/, {name: 'four-digit year'}),
    }),
    defineField({
      name: 'content',
      title: '内容',
      type: 'blockContent',
    }),
    defineField({
      name: 'coverImage',
      title: '封面图片',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: '替代文字',
          type: 'string',
          description: '简要描述图片内容，供无法查看图片的读者使用。',
        }),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Mux 视频',
      type: 'mux.video',
      description: '上传后由 Mux 转码和自适应播放；请不要使用 Sanity 文件字段上传成片。',
    }),
    defineField({
      name: 'link',
      title: '外部链接',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'publishedAt',
      title: '发布日期',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      year: 'year',
      media: 'coverImage',
    },
    prepare({title, category, year, media}) {
      return {
        title,
        subtitle: [category, year].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
