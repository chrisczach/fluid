import { graphql } from 'gatsby'
import React from 'react'
import BlockContent from '../components/block-content'
import Button from '../components/button'
import Container from '../components/container'
import CoverImage from '../components/cover-image'
import GraphQLErrorList from '../components/graphql-error-list'
import SectionBackground from '../components/section-background'
import SEO from '../components/seo'
import { responsiveTitle1 } from '../components/typography.module.css'
import { filterOutDocsWithoutSlugs, mapEdgesToNodes } from '../lib/helpers'
import styles from './about.module.css'
import imdb from '../images/imdb.png'
import instagram from '../images/instagram.png'

export const query = graphql`
  query AboutPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)about/" }) {
      id
      _id
      title
      _rawBody
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
          metadata {
            lqip
          }
        }
        alt
      }
    }

    people: allSanityPerson {
      edges {
        node {
          id
          image {
            asset {
              _id
              metadata {
                lqip
              }
            }
          }
          name
          _rawBio
        }
      }
    }
  }
`

const AboutPage = props => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

  const page = data && data.page

  const personNodes =
    data && data.people && mapEdgesToNodes(data.people).filter(filterOutDocsWithoutSlugs)

  if (!page) {
    throw new Error(
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
    )
  }

  return (
    <>
      <SEO title={page.title} />

      <Container>
        <SectionBackground className={styles.sectionBackground}>
          <h1 className={responsiveTitle1}>{page.title}</h1>

          <div className={ styles.aboutText }>
            <div className={ styles.social }>
              Social:{ ' ' }
              <a
                className={ styles.socialLink }
                target='_blank'
                alt='Dave Eastwood IMDb Profile'
                href='https://www.imdb.com/name/nm0247750/'
                rel='noreferrer'
              >
                <img src={ imdb } className={ styles.socialLogo } alt='IMDb Logo' />
              </a>{ ' ' }
              <a
                className={ styles.socialLink }
                target='_blank'
                alt='Fluid Pictures Inc Instagram'
                href='https://www.instagram.com/fluidpicturesinc/'
                rel='noreferrer'
              >
                <img src={ instagram } className={ styles.socialLogo } alt='instagram logo' />
              </a>
            </div>
            <BlockContent blocks={page._rawBody || []} />
            <Button to='/contact' className={styles.alignButton}>
              contact us
            </Button>
          </div>
          {/* {personNodes && personNodes.length > 0 && <PeopleGrid items={personNodes} title='People' />} */}
        </SectionBackground>
        {page.mainImage && (
          <CoverImage fixed asset={page.mainImage} coverSize={1} className={styles.coverImage} />
        )}
      </Container>
    </>
  )
}

export default AboutPage
