import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import OverviewWrapper from '~components/common/overview-wrapper'
import LongTermCareOverview from './overview'
import { Row, Col } from '~components/common/grid'
import { LargeStateGrade } from '~components/pages/state/state-grade'
import preambleStyle from '../preamble.module.scss'
import downloadDataStyles from '../download-data.module.scss'

const LongTermCarePreamble = ({ grade, facilities, overview }) => {
  const { contentfulSnippet } = useStaticQuery(
    graphql`
      query {
        contentfulSnippet(slug: { eq: "state-grades-preamble" }) {
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    `,
  )

  return (
    <OverviewWrapper>
      <h2 className="a11y-only">State overview</h2>
      <LongTermCareOverview facilities={facilities} overview={overview} />
      <Row>
        <Col width={[4, 3, 6]}>
          <h3 className={preambleStyle.header}>Download dataset</h3>
          <div className={downloadDataStyles.container}>
            <p>
              <a
                href="https://github.com/COVID19Tracking/long-term-care-data"
                className={downloadDataStyles.button}
              >
                State overview
              </a>
              <a
                href="https://github.com/COVID19Tracking/long-term-care-data"
                className={downloadDataStyles.button}
              >
                Facility data
              </a>
            </p>
          </div>
        </Col>
        <Col width={[4, 3, 6]}>
          <h3 className={preambleStyle.header}>Current data quality grade</h3>
          <div className={preambleStyle.gradeWrapper}>
            <div
              className={preambleStyle.gradeDescription}
              dangerouslySetInnerHTML={{
                __html: contentfulSnippet.content.childMarkdownRemark.html,
              }}
            />
            <LargeStateGrade letterGrade={grade} />
          </div>
        </Col>
      </Row>
    </OverviewWrapper>
  )
}

export default LongTermCarePreamble
