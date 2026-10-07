import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {table} from '@sanity/table'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

/** Fixed company pages: editable, but never created, duplicated, unpublished or deleted by hand. */
const fixedTypes = new Set(['page'])

export default defineConfig({
  name: 'default',
  title: 'Exeevo',

  projectId: '5852jf8n',
  dataset: 'production',

  plugins: [structureTool({structure}), table(), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !fixedTypes.has(schemaType)),
  },

  document: {
    newDocumentOptions: (prev) => prev.filter((item) => !fixedTypes.has(item.templateId)),
    actions: (prev, {schemaType}) =>
      fixedTypes.has(schemaType)
        ? prev.filter(({action}) => action && !['delete', 'duplicate', 'unpublish'].includes(action))
        : prev,
  },
})
