import React from 'react'
import ImageGallery from 'react-image-gallery'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'
import styles from './gallery.module.css'
import 'react-image-gallery/styles/css/image-gallery.css'
import typography from '../typography.module.css'

export default function Gallery ({ gallery }) {
  let images
  console.log((window.innerHeight / 4).toFixed(0))
  try {
    images = getUrls({ width: window.innerWidth, height: window.innerHeight })(gallery)
  } catch (err) {
    console.log(err)
  }

  return (
    <>
      <h1> className={typography.responsiveTitle1}Gallery</h1>
      <div className={styles.galleryWrapper}>
        <ImageGallery items={images} />
      </div>
    </>
  )
}

const getUrls = ({ width, height }) => gallery =>
  gallery.slides.map(slide => {
    return {
      original: imageUrlFor(buildImageObj(slide))
        .width(width)
        .height(height)
        .url(),
      thumbnail: imageUrlFor(buildImageObj(slide))
        .width((width / 4).toFixed(0))
        .height((height / 4).toFixed(0))
        .url()
    }
  })
