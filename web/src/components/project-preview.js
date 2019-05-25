import { Link } from 'gatsby'
import React from 'react'
import { cn, buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'
import Image from './image'
import styles from './project-preview.module.css'
import { responsiveTitle3 } from './typography.module.css'

function ProjectPreview(props) {
  return (
    <Link className={styles.root} to={`/project/${props.slug.current}`}>
      {props.mainImage && props.mainImage.asset && (
        <Image
          asset={props.mainImage}
          args={{ maxWidth: 600, maxHeight: Math.floor((9 / 16) * 600) }}
        />
      )}
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
    </Link>
  )
}

export default ProjectPreview
