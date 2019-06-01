import React from 'react'
import ImageGallery from 'react-image-gallery'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'
import Image from './image'

import 'react-image-gallery/styles/css/image-gallery.css'

export default function Gallery ({ gallery }) {


  const images = [
    {
      original: 'http://lorempixel.com/1000/600/nature/1/',
      thumbnail: 'http://lorempixel.com/250/150/nature/1/'
    },
    {
      original: 'http://lorempixel.com/1000/600/nature/2/',
      thumbnail: 'http://lorempixel.com/250/150/nature/2/'
    },
    {
      original: 'http://lorempixel.com/1000/600/nature/3/',
      thumbnail: 'http://lorempixel.com/250/150/nature/3/'
    }
  ]

  return <ImageGallery items={images} />
}

// const getUrl = ({ asset, args = null, fixed = true })=> {
//   const imageArgs = { width: 1200, height: Math.floor((9 / 16) * 1200) }

// return imageUrlFor(asset).width(args.width).height(args.height).url()
  
// }

