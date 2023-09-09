import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comments',
  title: 'Comments',
  type: 'document',
  fields: [
    defineField({
      name: 'comment',
      title: 'Comments',
      type: 'string',
    }),
    defineField({
      name: 'users',
      title: 'Users',
      type: 'reference',
      to: [{type: 'users'}],
    }),
  ],
})
