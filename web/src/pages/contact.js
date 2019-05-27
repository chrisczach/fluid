import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import styles from './contact.module.css'
import { responsiveTitle1 } from '../components/typography.module.css'
import CoverImage from '../components/cover-image'
import SectionBackground from '../components/section-background'

export const query = graphql`
  query ContactPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
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
  }
`

const ContactPage = props => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

  const page = data.page

  if (!page) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
    )
  }

  return (
    <>
      <SEO title={page.title} />
      <Container>
        {page.mainImage && <CoverImage fixed asset={page.mainImage} coverSize={1} />}
        <SectionBackground className={styles.sectionBackground}>
          <h1 className={responsiveTitle1}>{page.title}</h1>
          <div className={styles.contactText}>
            <BlockContent blocks={page._rawBody || []} />
          </div>
        </SectionBackground>
      </Container>
    </>
  )
}
ContactPage.defaultProps = {
  data: {
    page: {
      title: 'No title'
    }
  }
}
export default ContactPage
