/*eslint-disable*/

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '~components/layout'

import Container from '~components/common/container'
import LongContent from '~components/common/long-content'

import BlogTeaserList from '~components/pages/blog/blog-teaser-list'

const ReportingPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCrdtArticle(
        sort: { fields: relatedState___code, order: ASC }
      ) {
        nodes {
          title
          slug
          relatedState {
            name
            code
          }
          authors {
            name
            twitterLink
            link
            headshot {
              file {
                fileName
              }
              resize(width: 100) {
                width
                height
                src
              }
            }
          }
          lede {
            lede
          }
        }
      }
    }
  `)

  data.allContentfulCrdtArticle.nodes.forEach(node => {
    node.categories = [
      {
        name: node.relatedState.name,
        slug: node.relatedState.code.toLowerCase(),
      },
    ]
  })

  const path = '/race/reports'

  return (
    <Layout
      title="State Reports"
      returnLinks={[{ link: '/race', title: 'Racial Data Tracker' }]}
      path={path}
      centered
    >
      <LongContent>
        <p>
          As 2020 comes to an end, we team up with student journalists at New
          York University led by{' '}
          <a href="https://twitter.com/merbroussard">Dr. Meredith Broussard</a>{' '}
          to investigate the ongoing racial inequities in testing and treatment
          across the country, using state-level data from the COVID Racial Data
          Tracker.
        </p>
      </LongContent>
      <Container>
        <BlogTeaserList
          items={data.allContentfulCrdtArticle.nodes}
          subPath={path}
          useCategoryLink={false}
        />
      </Container>
    </Layout>
  )
}

export default ReportingPage
