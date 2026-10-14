import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Search and sharing',
  type: 'object',
  description: 'How this page appears in Google and when shared. Leave empty to use the title and summary.',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Search title',
      description: 'Up to 60 characters. Leave empty to use the title.',
      validation: (rule) => rule.max(60).warning('Longer titles may be cut off in Google.'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      title: 'Search description',
      description: 'Up to 155 characters. Leave empty to use the summary.',
      validation: (rule) => rule.max(155).warning('Longer descriptions may be cut off in Google.'),
    }),
  ],
})
