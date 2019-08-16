let sanityConfig
if (process.env.PROJECT_PATH) {
  sanityConfig = {
    api: {
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET
    }
  }
} else {
  sanityConfig = require('../../../studio/sanity.json')
}

import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityConfig.api)

export function imageUrlFor(source) {
  return builder.image(source)
}
