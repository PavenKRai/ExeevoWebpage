import type {StructureResolver} from 'sanity/structure'
import {BookIcon} from '@sanity/icons/Book'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {CogIcon} from '@sanity/icons/Cog'
import {CommentIcon} from '@sanity/icons/Comment'
import {DocumentIcon} from '@sanity/icons/Document'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {PlayIcon} from '@sanity/icons/Play'
import {StarIcon} from '@sanity/icons/Star'
import {TagIcon} from '@sanity/icons/Tag'
import {TrendUpwardIcon} from '@sanity/icons/TrendUpward'

/** Company pages that exist as fixed documents (edit only). */
export const PAGE_IDS = ['about', 'partners', 'careers', 'privacy', 'cookies'] as const

const newestFirst = [{field: 'date', direction: 'desc' as const}]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Blog posts').icon(DocumentTextIcon).child(S.documentTypeList('blogPost').title('Blog posts').defaultOrdering(newestFirst)),
      S.listItem().title('White papers').icon(DocumentIcon).child(S.documentTypeList('whitePaper').title('White papers').defaultOrdering(newestFirst)),
      S.listItem().title('Webinars').icon(PlayIcon).child(S.documentTypeList('webinar').title('Webinars').defaultOrdering(newestFirst)),
      S.listItem().title('Events').icon(CalendarIcon).child(S.documentTypeList('event').title('Events').defaultOrdering(newestFirst)),
      S.listItem().title('Case studies').icon(StarIcon).child(S.documentTypeList('caseStudy').title('Case studies').defaultOrdering(newestFirst)),
      S.listItem().title('Press releases').icon(CommentIcon).child(S.documentTypeList('pressRelease').title('Press releases').defaultOrdering(newestFirst)),
      S.listItem().title('Analyst reports').icon(TrendUpwardIcon).child(S.documentTypeList('analystReport').title('Analyst reports').defaultOrdering(newestFirst)),
      S.listItem().title('Glossary').icon(BookIcon).child(S.documentTypeList('glossaryTerm').title('Glossary').defaultOrdering(newestFirst)),
      S.divider(),
      S.listItem().title('Topics').icon(TagIcon).child(S.documentTypeList('category').title('Topics')),
      S.listItem()
        .title('Company pages')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Company pages')
            .items(PAGE_IDS.map((id) => S.listItem().id(id).title(id[0].toUpperCase() + id.slice(1)).child(S.document().schemaType('page').documentId(id)))),
        ),
    ])
