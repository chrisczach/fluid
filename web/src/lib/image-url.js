import imageUrlBuilder from '@sanity/image-url'

let sanityConfig

try {
  sanityConfig = require('../../../studio/sanity.json')
} catch (e) {
  sanityConfig = {
    api: {
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET
    }
  }
}

const builder = imageUrlBuilder(sanityConfig.api)

export function imageUrlFor(source) {
  return builder.image(source)
}
