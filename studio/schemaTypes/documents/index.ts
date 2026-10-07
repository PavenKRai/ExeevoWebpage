import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {CommentIcon} from '@sanity/icons/Comment'
import {DocumentIcon} from '@sanity/icons/Document'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {PlayIcon} from '@sanity/icons/Play'
import {StarIcon} from '@sanity/icons/Star'
import {TrendUpwardIcon} from '@sanity/icons/TrendUpward'
import {resource} from '../resource'

export const blogPost = resource({name: 'blogPost', title: 'Blog post', icon: DocumentTextIcon})

export const whitePaper = resource({
  name: 'whitePaper',
  title: 'White paper',
  icon: DocumentIcon,
  extra: [
    defineField({
      name: 'pdf',
      type: 'file',
      title: 'PDF to download',
      options: {accept: 'application/pdf'},
      description: 'Upload the white paper as a PDF.',
    }),
    defineField({
      name: 'pdfUrl',
      type: 'string',
      title: 'PDF address (old files)',
      description: 'Only for imported items that link to an existing file. Leave empty if you uploaded a PDF above.',
      hidden: ({value, document}) => !value && !!document?.pdf,
    }),
  ],
})

export const webinar = resource({
  name: 'webinar',
  title: 'Webinar',
  icon: PlayIcon,
  extra: [
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'Recording address',
      description: 'The YouTube or Vimeo link to the recording.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
  ],
})

export const pressRelease = resource({name: 'pressRelease', title: 'Press release', icon: CommentIcon})
export const caseStudy = resource({name: 'caseStudy', title: 'Case study', icon: StarIcon})
export const analystReport = resource({name: 'analystReport', title: 'Analyst report', icon: TrendUpwardIcon})

export const event = resource({
  name: 'event',
  title: 'Event',
  icon: CalendarIcon,
  extra: [
    defineField({name: 'startDate', type: 'datetime', title: 'Starts'}),
    defineField({name: 'endDate', type: 'datetime', title: 'Ends'}),
    defineField({name: 'location', type: 'string', title: 'Location', description: 'City and venue, or "Online".'}),
    defineField({name: 'registerUrl', type: 'url', title: 'Registration link'}),
  ],
})

export const glossaryTerm = resource({name: 'glossaryTerm', title: 'Glossary term', icon: BookIcon, noImage: true})

/** The fixed company pages (About, Partners, Careers, Privacy, Cookies). Edit only; they cannot be created or deleted. */
export const page = defineType({
  name: 'page',
  title: 'Company page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required()}),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      description: 'The first section is the main text. Further sections get their own heading.',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Heading', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'body', title: 'Text'}),
            defineField({
              name: 'legacyHtml',
              type: 'text',
              title: 'Imported text (old format)',
              readOnly: true,
              hidden: ({value}) => !value,
            }),
          ],
          preview: {select: {title: 'title'}},
        },
      ],
    }),
    defineField({name: 'seo', type: 'seo', title: 'Search and sharing'}),
  ],
  preview: {select: {title: 'title'}},
})
