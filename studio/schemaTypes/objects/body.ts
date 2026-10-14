import {defineArrayMember, defineField, defineType} from 'sanity'

/** Body text for articles and pages: only the formatting the website can display. */
export const body = defineType({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading', value: 'h2'},
        {title: 'Subheading', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullets', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'Web address',
                description: 'Use a full address (https://...) or a site path such as /platform',
                validation: (rule) =>
                  rule.required().uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Description of the image',
          description: 'Read aloud to people who cannot see the image. Describe what it shows.',
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'caption', type: 'string', title: 'Caption (optional)'}),
      ],
    }),
    defineArrayMember({
      name: 'videoEmbed',
      title: 'Video (YouTube or Vimeo)',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'Video address',
          description: 'Paste the normal YouTube or Vimeo link.',
          validation: (rule) =>
            rule.required().uri({scheme: ['https']}).custom((value) =>
              !value || /(youtube\.com|youtu\.be|vimeo\.com)/.test(value)
                ? true
                : 'Only YouTube and Vimeo links are supported.',
            ),
        }),
        defineField({name: 'title', type: 'string', title: 'Video title', validation: (rule) => rule.required()}),
      ],
      preview: {select: {title: 'title', subtitle: 'url'}},
    }),
    defineArrayMember({type: 'table'}),
  ],
})
