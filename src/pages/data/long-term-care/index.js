import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import TableauChart from '~components/charts/tableau'
import Total from '~components/common/landing-page/total'
import { Col, Row } from '~components/common/grid'
import { FormatNumber } from '~components/utils/format'
import DetailText from '~components/common/detail-text'
import DownloadLinks from '~components/pages/data/long-term-care/download-links'
import Layout from '~components/layout'
import Paragraph from '~components/common/landing-page/paragraph'

const LongTermCarePage = ({ data }) => {
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
      title="The Long-Term Care COVID Tracker"
      path="/data/longtermcare"
      description="To date, the Long-Term Care COVID Tracker is the most comprehensive dataset about COVID-19 in US long-term care facilities."
    >
      <Paragraph>
        <span
          dangerouslySetInnerHTML={{
            __html: marked.inlineLexer(data.lede.content.content, []),
          }}
        />
      </Paragraph>
      <h3 className="no-margin-bottom">Cumulative</h3>
      <Row>
        <Col width={[4, 6, 4]}>
          <Total
            label="Total cases"
            number={
              <FormatNumber number={data.covidLtcWebsite.casesCumulative} />
            }
          />
        </Col>
        <Col width={[4, 6, 4]}>
          <Total
            label="Total deaths"
            number={
              <FormatNumber number={data.covidLtcWebsite.deathsCumulative} />
            }
          />
        </Col>
        <Col width={[4, 6, 4]}>
          <Total
            label="Total number of facilities affected"
            number={
              <FormatNumber
                number={data.covidLtcWebsite.facilitiesCumulative}
              />
            }
          />
        </Col>
      </Row>
      <DetailText small>
        <Snippet slug="ltc-top-notes" />
      </DetailText>
      <Container centered>
        <DownloadLinks />
        <LongContent>
          <Snippet slug="ltc-1" />
        </LongContent>
      </Container>
      <TableauChart
        id="ltc-1"
        height={520}
        mobileHeight={450}
        viewUrl="https://public.tableau.com/views/LTCDataObservations/web_FigMap?:language=en&:display_count=y&:origin=viz_share_link"
        viewUrlMobile="https://public.tableau.com/views/LTCDataObservations/mob_FigMap?:language=en&:display_count=y&:origin=viz_share_link"
      />
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
        viewUrlMobile="https://public.tableau.com/views/LTCDataObservations/0_AllKeyssmall?:language=en&:display_count=y&:origin=viz_share_link"
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
      <Container centered>
        <LongContent>
          <Snippet slug="ltc-thanks" />
        </LongContent>
      </Container>
    </Layout>
  )
}

export default LongTermCarePage

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
