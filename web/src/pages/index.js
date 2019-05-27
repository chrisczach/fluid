import React from 'react'
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
import { responsiveTitle2 } from '../components/typography.module.css'
import SectionBackground from '../components/section-background'
import EquipmentCategories from '../components/equipment-categories'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }

    about: sanityPage(_id: { regex: "/(drafts.|)about/" }) {
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
  const about = data && data.about
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

  const categoryNodes =
    data && data.category && mapEdgesToNodes(data.category).filter(filterOutDocsWithoutSlugs)

  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <SectionBackground className={styles.aboutSection}>
          <h1 className={responsiveTitle2}>{about.title}</h1>
          <BlockContent blocks={about._rawBody || []} />
        </SectionBackground>

        {categoryNodes && categoryNodes.length > 0 && (
          <SectionBackground className={ styles.equipmentSection}>
            <h1 className={responsiveTitle2}>equipment</h1>
            <EquipmentCategories nodes={categoryNodes} />
          </SectionBackground>
        )}
        {/* {projectNodes && (
          <ProjectPreviewGrid
            title="Latest projects"
            nodes={projectNodes}
            browseMoreHref="/projects/"
          />
        )}
        {postNodes && (
          <BlogPostPreviewGrid
            title="Latest blog posts"
            nodes={postNodes}
            browseMoreHref="/blog/"
          />
        )} */}
      </Container>
    </>
  )
}

export default IndexPage
