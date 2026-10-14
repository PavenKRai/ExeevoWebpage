import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '5852jf8n',
    dataset: 'production'
  },
  studioHost: 'exeevo',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'o7yau3b4ejf7gmm2jgtyw9v4',
  },
})
