import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {muxInput} from 'sanity-plugin-mux-input'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'mzz2m6c7'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio CMS',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    muxInput({
      acceptedMimeTypes: ['video/*'],
      max_resolution_tier: '1080p',
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
