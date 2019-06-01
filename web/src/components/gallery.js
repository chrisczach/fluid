import React from 'react'
import ImageGallery from 'react-image-gallery'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'
import styles from './gallery.module.css'
import 'react-image-gallery/styles/css/image-gallery.css'
import typography from '../components/typography.module.css'

export default function Gallery ({ gallery }) {
  if (!gallery) return null
  let images
  let portrait = false
  try {
    portrait = window.innerHeight > window.innerWidth
    images = getUrls({
      width: window.innerWidth,
      height: portrait ? window.innerWidth : (window.innerWidth / 16) * 9
    })(gallery)
  } catch (err) {
    console.log(err)
  }

  return (
    <>
      <h1 className={typography.responsiveTitle1}>Gallery</h1>
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
        .height(height.toFixed(0))
        .url(),
      thumbnail: imageUrlFor(buildImageObj(slide))
        .width((width / 4).toFixed(0))
        .height((height / 4).toFixed(0))
        .url()
    }
  })
