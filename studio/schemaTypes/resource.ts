import {defineArrayMember, defineField, defineType, type FieldDefinition} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

const today = () => new Date().toISOString().slice(0, 10)

type Options = {
  name: string
  title: string
  icon?: typeof DocumentTextIcon
  /** Fields only this type has (placed after the summary). */
  extra?: FieldDefinition[]
  /** Hide the featured image (glossary terms have none). */
  noImage?: boolean
}

/** One content type with the fields every resource shares, so managers see the same form everywhere. */
export function resource({name, title, icon = DocumentTextIcon, extra = [], noImage}: Options) {
  return defineType({
    name,
    title,
    type: 'document',
    icon,
    fields: [
      defineField({name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required().max(120)}),
      defineField({
        name: 'slug',
        type: 'slug',
        title: 'Web address ending',
        description: 'Created from the title. It cannot be changed once published, so links keep working.',
        options: {source: 'title', maxLength: 96},
        readOnly: ({document}) => !!document && !document._id.startsWith('drafts.'),
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'date',
        type: 'date',
        title: 'Publication date',
        initialValue: today,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'updatedOn',
        type: 'date',
        title: 'Last updated (optional)',
        description: 'Fill in only when you substantially update an older piece. The page then shows "Updated" with this date.',
      }),
      defineField({
        name: 'summary',
        type: 'text',
        rows: 3,
        title: 'Summary',
        description: 'One or two sentences shown on cards and in search results (up to 220 characters).',
        validation: (rule) => rule.required().max(220),
      }),
      defineField({
        name: 'categories',
        type: 'array',
        title: 'Topics',
        of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
        validation: (rule) => rule.unique(),
      }),
      ...(noImage
        ? []
        : [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Featured image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Description of the image',
                  description: 'Read aloud to people who cannot see the image. Describe what it shows.',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ]),
      ...extra,
      defineField({name: 'body', type: 'body', title: 'Body'}),
      defineField({
        name: 'legacyHtml',
        type: 'text',
        title: 'Imported text (old format)',
        description:
          'Only present on some imported items whose formatting could not be converted. It is shown on the page until the Body above is filled in.',
        readOnly: true,
        hidden: ({value}) => !value,
      }),
      defineField({name: 'seo', type: 'seo', title: 'Search and sharing'}),
    ],
    orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
    preview: {
      select: {title: 'title', subtitle: 'date', media: 'image'},
    },
  })
}
