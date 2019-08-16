import imageUrlBuilder from '@sanity/image-url'

let sanityConfig = {
  api: {
    projectId: 'pjkgqycs',
    dataset: 'production'
  }
}

const builder = imageUrlBuilder(sanityConfig.api)

export function imageUrlFor(source) {
  return builder.image(source)
}
