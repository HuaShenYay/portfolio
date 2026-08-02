import {defineArrayMember, defineType} from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: '内容块',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
    }),
  ],
})
