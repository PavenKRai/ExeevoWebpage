import {body} from './objects/body'
import {seo} from './objects/seo'
import {category} from './documents/category'
import {
  analystReport,
  blogPost,
  caseStudy,
  event,
  glossaryTerm,
  page,
  pressRelease,
  webinar,
  whitePaper,
} from './documents'

export const schemaTypes = [
  body,
  seo,
  category,
  blogPost,
  whitePaper,
  webinar,
  pressRelease,
  caseStudy,
  analystReport,
  event,
  glossaryTerm,
  page,
]
