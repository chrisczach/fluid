import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'
import BlogPostPreviewGrid from '../components/blog-post-preview-grid'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import BlockContent from '../components/block-content'
import Button from '../components/button'
import styles from './index.module.css'
import { brandedTitle1 } from '../components/typography.module.css'
import SectionBackground from '../components/section-background'
import EquipmentCategories from '../components/equipment-categories'
import CoverImage from '../components/cover-image'
import { ContactPageInner } from './contact'
import HeroVideo from '../components/hero-video'
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
  }
`

const IndexPage = props => {
  const { data, errors } = props
  const contact = data && data.contact
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

        {categoryNodes && categoryNodes.length > 0 && (
          <SectionBackground className={styles.equipmentSection}>
            <h1 className={brandedTitle1}>{data.equipment.title.toLowerCase()}</h1>
            <EquipmentCategories slug={`equipment/`} nodes={categoryNodes} />
          </SectionBackground>
        )}
        <ContactPageInner data={{ contact: contact }} />
      </Container>
      {site.background && (
        <CoverImage fixed asset={site.background} coverSize={1} className={styles.coverImage} />
      )}
    </>
  )
}

export default IndexPage
