import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'hsy-portfolio',
  deployment: {
    appId: 'et562ona02y4iqmr7sxhwnk8',
  },
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'mzz2m6c7',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
