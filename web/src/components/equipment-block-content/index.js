import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import Figure from './figure'
import Slideshow from './slideshow'
import YoutubeVideo from './youtube-video'
import typography from '../typography.module.css'
import styles from './index.module.css'

const serializers = {
  types: {
    block(props) {
      switch (props.node.style) {
        case 'h1':
          return <h1 className={styles.h1Style}>{props.children}</h1>

        case 'h2':
          return <h2 className={styles.h2Style}>{props.children}</h2>

        case 'h3':
          return <h3 className={typography.responsiveTitle3}>{props.children}</h3>

        case 'h4':
          return <h4 className={typography.responsiveTitle4}>{props.children}</h4>

        case 'blockquote':
          return <blockquote className={typography.blockQuote}>{props.children}</blockquote>

        default:
          return <p className={typography.paragraph}>{props.children}</p>
      }
    },
    figure(props) {
      return <Figure {...props.node} />
    },
    slideshow(props) {
      return <Slideshow {...props.node} />
    },
    youtube(props) {
      return <YoutubeVideo {...props.node} />
    }
  }
}

const BlockContent = ({ blocks }) => (
  <BaseBlockContent className={styles.root} blocks={blocks} serializers={serializers} />
)

export default BlockContent
