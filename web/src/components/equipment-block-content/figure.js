import React from 'react'
import { buildImageObj } from '../../lib/helpers'
import Image from '../image'
import styles from './figure.module.css'
function Figure(props) {
  return (
    <figure className={styles.root}>
      {props.asset && <Image asset={buildImageObj(props)} />}
      <figcaption className={styles.caption}>{props.caption}</figcaption>
    </figure>
  )
}

export default Figure
