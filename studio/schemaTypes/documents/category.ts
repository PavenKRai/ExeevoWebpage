import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Topic',
  type: 'document',
  fields: [defineField({name: 'title', type: 'string', title: 'Name', validation: (rule) => rule.required()})],
})
