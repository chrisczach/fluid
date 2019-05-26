import React from 'react'
import Image from '../components/image'
import styles from './cover-image.module.css'

export default function CoverImage ({ asset, coverSize = 1, ...props }) {
  let width = 200
  let height = 100

  try {
    width = window.innerWidth
    height = window.innerHeight * coverSize
  } catch (err) {
    console.log('prevent build error')
  }
  return (
    <div className={styles.cover}>
      <Image fixed {...props} asset={asset} args={{ width: width, height: height }} />
    </div>
  )
}
