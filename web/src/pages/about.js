import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import PeopleGrid from '../components/people-grid'
import SEO from '../components/seo'
import styles from './about.module.css'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import { responsiveTitle1 } from '../components/typography.module.css'
import CoverImage from '../components/cover-image'
import Button from '../components/button'

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
        <div className={styles.sectionBackground}>
          {page.mainImage && <CoverImage asset={page.mainImage} coverSize={1} />}

          <h1 className={responsiveTitle1}>{page.title}</h1>
          <BlockContent blocks={page._rawBody || []} />
          <Button to='/contact' className={styles.alignButton}>
            contact us
          </Button>
          {/* {personNodes && personNodes.length > 0 && <PeopleGrid items={personNodes} title='People' />} */}
        </div>
      </Container>
    </>
  )
}

export default AboutPage
