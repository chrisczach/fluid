import React from 'react'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'
import ImageBlurUp from '../image-blur-up'
import styles from './figure.module.css'
import Image from '../image'
function Figure(props) {
  return (
    <figure className={styles.root}>
      {props.asset && <Image asset={buildImageObj(props)} />}
      <figcaption className={styles.caption}>{props.caption}</figcaption>
    </figure>
  )
}

export default Figure
