import React from 'react'
import { graphql } from 'gatsby'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import TableauChart from '~components/charts/tableau'
import Total from '~components/common/landing-page/total'
import { Col, Row } from '~components/common/grid'
import { FormatNumber } from '~components/utils/format'
import DetailText from '~components/common/detail-text'
import DownloadLinks from '~components/pages/data/ltc/download-links'
import Layout from '~components/layout'
import Paragraph from '~components/common/landing-page/paragraph'

export default ({ data }) => (
  <Layout title="The Long-Term Care COVID Tracker" path="/data/longtermcare">
    <Paragraph narrow>
      <a href="https://www.cdc.gov/nchs/fastats/nursing-home-care.htm">
        Less than one percent
      </a>{' '}
      of America’s population lives in long-term care facilities, but as of
      August 6, 2020, this tiny fraction of the country accounts for 43% of US
      COVID-19 deaths.
    </Paragraph>
    <h2>Cumulative</h2>
    <Row>
      <Col width={[4, 6, 4]}>
        <Total label="Total cases" number={<FormatNumber number={345983} />} />
      </Col>
      <Col width={[4, 6, 4]}>
        <Total label="Total deaths" number={<FormatNumber number={65315} />} />
      </Col>
      <Col width={[4, 6, 4]}>
        <Total
          label="Total Number of Facilities Affected"
          number={<FormatNumber number={12824} />}
        />
      </Col>
    </Row>

    <h2>Active Outbreaks</h2>
    <Row>
      <Col width={[4, 6, 4]}>
        <Total label="Total cases" number={<FormatNumber number={101086} />} />
      </Col>
      <Col width={[4, 6, 4]}>
        <Total label="Total deaths" number={<FormatNumber number={10213} />} />
      </Col>
      <Col width={[4, 6, 4]}>
        <Total
          label="Total Number of Facilities Affected"
          number={<FormatNumber number={5954} />}
        />
      </Col>
    </Row>
    <p>
      <DetailText>
        Cumulative COVID-19 totals represents total cases, deaths and facilities
        as reported by states and territories. Active Outbreak COVID-19 totals
        represent current cases and deaths at facilities. States vary in their
        reported cumulative data start date and each state defines an active
        outbreak differently. Not all states and territories report long-term
        care data.
      </DetailText>
    </p>
    <DownloadLinks />
    <Container centered>
      <LongContent>
        <ContentfulContent
          id={data.content1.contentful_id}
          content={
            data.content1.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
        />
      </LongContent>
    </Container>
    <TableauChart
      id="ltc-1"
      height={700}
      mobileHeight={400}
      viewUrl="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCare/FigMap?:language=en&:display_count=y&publish=yes&:origin=viz_share_link"
      viewUrlMobile="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCaremobile/FigMap?:language=en&:display_count=y&publish=yes&:origin=viz_share_link"
    />
    <Container centered>
      <LongContent>
        <ContentfulContent
          id={data.content2.contentful_id}
          content={
            data.content2.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
        />
      </LongContent>
    </Container>
    <TableauChart
      id="ltc-2"
      height={1300}
      viewUrl="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCare/SummaryTable?:language=en&:display_count=y&:origin=viz_share_link"
      viewUrlMobile="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCaremobile/SummaryTable?:language=en&:display_count=y&:origin=viz_share_link"
    />
    <Container centered>
      <LongContent>
        <ContentfulContent
          id={data.contentThanks.contentful_id}
          content={
            data.contentThanks.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
        />
      </LongContent>
    </Container>
  </Layout>
)

export const query = graphql`
  query {
    lede: contentfulSnippet(slug: { eq: "ltc-lede" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    content1: contentfulSnippet(slug: { eq: "ltc-1" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    content2: contentfulSnippet(slug: { eq: "ltc-2" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    contentThanks: contentfulSnippet(slug: { eq: "ltc-thanks" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
