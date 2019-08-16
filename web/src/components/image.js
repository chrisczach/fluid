import Img from 'gatsby-image'
import { getFixedGatsbyImage, getFluidGatsbyImage } from 'gatsby-source-sanity'
import React from 'react'
import { imageUrlFor } from '../lib/image-url'
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

export default function Image({
  asset,
  args,
  fixed = false,
  urlOnly = false,
  aspectFixed = false,
  ...props
}) {
  const imageArgs =
    args || (fixed ? { width: 1200, height: Math.floor((9 / 16) * 1200) } : { maxWidth: 1200 })

  const imgProps = fixed
    ? getFixedGatsbyImage(asset, imageArgs, sanityConfig.api)
    : getFluidGatsbyImage(asset, imageArgs, sanityConfig.api)

  try {
    imgProps.base64 = asset.asset.metadata.lqip
  } catch (err) {
    null
  }
  let processedImg = imageUrlFor(asset)
  if (fixed) {
    processedImg = processedImg.width(args.width).height(args.height)
    processedImg = processedImg.url()
  } else {
    processedImg = processedImg.width(imageArgs.maxWidth)

    // if (!imageArgs.maxHeight) {
    //   imageArgs.maxHeight = imageArgs.maxWidth * imageArgs.aspectRatio
    // }
    processedImg = processedImg.height(imageArgs.maxHeight)
    processedImg = processedImg.url()
  }

  if (!aspectFixed) {
    const url = processedImg.split('?')[0] + '?'

    const urlWithRect = processedImg.split('&')[0] + '&'

    const addRect = srcToAddRect => srcToAddRect.split(url).join(urlWithRect)
    imgProps.src = addRect(imgProps.src)

    // these props are resolving to null??? fix it later
    imgProps.srcSet = imgProps.srcSet && addRect(imgProps.srcSet)
    imgProps.srcWebp = imgProps.srcWebp && addRect(imgProps.srcWebp)
    imgProps.srcSetWebp = imgProps.srcSetWebp && addRect(imgProps.srcSetWebp)
  }
  if (fixed) {
    return <Img fixed={{ ...imgProps }} alt={asset.alt} {...props} />
  } else {
    if (imageArgs.maxWidth && imageArgs.maxHeight) {
      imgProps.aspectRatio = imageArgs.maxWidth / imageArgs.maxHeight
    }
    return <Img fluid={{ ...imgProps }} alt={asset.alt} {...props} />
  }
}
