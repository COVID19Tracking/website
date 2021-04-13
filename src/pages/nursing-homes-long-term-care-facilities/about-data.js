import React from 'react'
import { graphql } from 'gatsby'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import TableauChart from '~components/charts/tableau'
import DetailText from '~components/common/detail-text'
import Layout from '~components/layout'

const LongTermCareAboutPage = ({ data }) => {
  const Snippet = ({ slug }) => {
    const item = data.contentfulSnippetCollection.snippets.find(
      snippet => snippet.slug === slug,
    )
    return (
      <ContentfulContent
        id={item.contentful_id}
        content={
          item.childContentfulSnippetContentTextNode.childMarkdownRemark.html
        }
      />
    )
  }

  return (
    <Layout
      title="About the Data"
      path="/nursing-homes-long-term-care-facilities/about-data"
      returnLinks={[{ link: '/nursing-homes-long-term-care-facilities' }]}
      description="To date, the Long-Term Care COVID Tracker is the most comprehensive dataset about COVID-19 in US long-term-care facilities."
    >
      <Container centered>
        <LongContent>
          <Snippet slug="ltc-2" />
        </LongContent>
      </Container>
      <TableauChart
        id="ltc-2"
        height={700}
        mobileHeight={450}
        viewUrl="https://public.tableau.com/views/LTCDataObservations/0_AllKeyssmall?:language=en&:retry=yes&:display_count=y&:origin=viz_share_link"
        viewUrlMobile="https://public.tableau.com/views/LTCDataObservations/0_AllKeyssmall_mob?:language=en&:display_count=y&:origin=viz_share_link"
      />
      <Container centered>
        <LongContent>
          <Snippet slug="ltc-definitions" />
        </LongContent>
      </Container>
      <Container centered>
        <DetailText small>
          <Snippet slug="ltc-table-notes" />
        </DetailText>
      </Container>
      <TableauChart
        id="ltc-3"
        height={1300}
        viewUrl="https://public.tableau.com/views/LTCDataObservations/web_SummaryTable?:language=en&:display_count=y&:origin=viz_share_link"
        viewUrlMobile="https://public.tableau.com/views/LTCDataObservations/mob_SummaryTable?:language=en&:display_count=y&:origin=viz_share_link"
      />
    </Layout>
  )
}

export default LongTermCareAboutPage

export const query = graphql`
  query {
    covidLtcWebsite {
      casesCumulative
      deathsCumulative
      facilitiesCumulative
    }
    contentfulSnippetCollection(slug: { eq: "long-term-care-landing-page" }) {
      snippets {
        contentful_id
        slug
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    lede: contentfulSnippet(slug: { eq: "ltc-lede" }) {
      content {
        content
      }
    }
  }
`
