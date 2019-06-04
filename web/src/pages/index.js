import { graphql } from 'gatsby'
import React, { useState } from 'react'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import CoverImage from '../components/cover-image'
import EquipmentCategories from '../components/equipment-categories'
import GraphQLErrorList from '../components/graphql-error-list'
import SectionBackground from '../components/section-background'
import SEO from '../components/seo'
import { brandedTitle1 } from '../components/typography.module.css'
import { filterOutDocsWithoutSlugs, mapEdgesToNodes } from '../lib/helpers'
import styles from './index.module.css'
import Loadable from 'react-loadable'
import HeroVideo from '../components/hero-video'

const LazyContact = Loadable({
  loader: () => import('../components/contact-inner'),
  loading: () => <div>Loading</div>
})

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      heroVideo {
        videoURL
        excerpt
        speed
      }
      logo {
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
        }
        alt
      }
      background {
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

    contact: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
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

    home: sanityPage(_id: { regex: "/(drafts.|)home/" }) {
      _rawBody
    }

    equipment: sanityPage(_id: { regex: "/(drafts.|)equipment/" }) {
      title
    }

    category: allSanityCategory(sort: { fields: [sort], order: ASC }) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          excerpt
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
      }
    }

    equipmentItems: allSanityEquipment {
      edges {
        node {
          slug {
            current
          }
          categories {
            id
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const { data, errors } = props
  const contact = data && data.contact
  const home = data && data.home
  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

  const site = (data || {}).site
  // const postNodes = (data || {}).posts
  //   ? mapEdgesToNodes(data.posts).filter(filterOutDocsWithoutSlugs)
  //   : []
  // const projectNodes = (data || {}).projects
  //   ? mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
  //   : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }
  const [showSplash, setSplash] = useState(true)
  const stopSplashHandler = () => setSplash(false)

  const categoryNodes =
    data && data.category && mapEdgesToNodes(data.category).filter(filterOutDocsWithoutSlugs)

  const equipmentItems = data && data.equipmentItems

  const getCategoryItemCount = ({ edges }) => {
    const counts = {}
    edges.forEach(({ node: { slug: { current }, categories: { id } } }) => {
      if (counts[id] && counts[id].length > 0) {
        counts[id].push(current)
      } else {
        counts[id] = [current]
      }
    })
    return counts
  }

  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <HeroVideo
        {...site.heroVideo}
        logo={site.logo}
        showSplash={showSplash}
        stopSplashHandler={stopSplashHandler}
      />

      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <SectionBackground className={styles.equipmentSection}>
          <BlockContent blocks={home._rawBody || []} />
          {categoryNodes && categoryNodes.length > 0 && (
            <>
              <h1 className={brandedTitle1}>{data.equipment.title.toLowerCase()}</h1>
              <EquipmentCategories
                slug={`equipment/`}
                nodes={categoryNodes}
                categoryCounts={getCategoryItemCount(equipmentItems)}
              />
            </>
          )}
        </SectionBackground>
        <LazyContact data={{ contact: contact }} />
      </Container>
      {site.background && (
        <CoverImage fixed asset={site.background} coverSize={1} className={styles.coverImage} />
      )}
    </>
  )
}

export default IndexPage
