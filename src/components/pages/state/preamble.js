import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import classnames from 'classnames'

import { Row, Col } from '~components/common/grid'
import DownloadData from '~components/pages/state/download-data'
import { LargeStateGrade } from '~components/pages/state/state-grade'
import {
  StateLinks,
  StateLinksDisclosure,
  StateLinksDisclosureButton,
  StateLinksDisclosurePanel,
} from '~components/pages/state/state-links'
import preambleStyle from './preamble.module.scss'

const Preamble = ({ state, covidState }) => {
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
  const [stateLinksAreOpen, setStateLinksAreOpen] = useState(false)
  const [downloadDataIsOpen, setDownloadDataIsOpen] = useState(false)
  // todo make state grade wrap as a circle with the grade description
  return (
    <div className={preambleStyle.wrapper}>
      <Row>
        <Col width={[4, 3, 6]}>
          <div className={preambleStyle.largeDisclosure}>
            <h4 className={preambleStyle.header}>Where this data comes from</h4>
            <StateLinks
              twitter={state.twitter}
              covid19Site={state.covid19Site}
              covid19SiteSecondary={state.covid19SiteSecondary}
              covid19SiteTertiary={state.covid19SiteTertiary}
              stateName={state.name}
            />
          </div>
        </Col>
        <Col width={[4, 3, 6]}>
          <h4 className={preambleStyle.header}>Current data quality grade</h4>
          <div className={preambleStyle.gradeWrapper}>
            <div
              className={preambleStyle.gradeDescription}
              dangerouslySetInnerHTML={{
                __html: contentfulSnippet.content.childMarkdownRemark.html,
              }}
            />
            <LargeStateGrade letterGrade={covidState.dataQualityGrade} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col width={[4, 6, 6]}>
          <div className={preambleStyle.lastUpdatedContainer}>
            <LastUpdated lastUpdatedEt={covidState.lastUpdateEt} />
          </div>
        </Col>
        <Col width={[4, 6, 6]}>
          <div className={preambleStyle.largeDisclosure}>
            <DownloadData state={state} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col width={[0, 0, 6]}>
          <div className={preambleStyle.mobileDisclosure}>
            <Disclosure
              open={downloadDataIsOpen}
              onChange={() => setDownloadDataIsOpen(!downloadDataIsOpen)}
            >
              <DisclosureButton className={preambleStyle.button}>
                <h4
                  className={classnames(
                    preambleStyle.header,
                    preambleStyle.hiddenHeader,
                  )}
                >
                  Get the data{' '}
                  <span className={preambleStyle.toggle}>
                    {downloadDataIsOpen ? <>&#8593;</> : <>&#8595;</>}
                  </span>
                </h4>
              </DisclosureButton>
              <DisclosurePanel>
                <DownloadData state={state} />
              </DisclosurePanel>
            </Disclosure>
          </div>
        </Col>
      </Row>
      <Row>
        <Col width={[0, 0, 6]}>
          <StateLinksDisclosure
            stateLinksAreOpen={stateLinksAreOpen}
            setStateLinksAreOpen={setStateLinksAreOpen}
            mobileOnly
          >
            <StateLinksDisclosureButton stateLinksAreOpen={stateLinksAreOpen} />
            <StateLinksDisclosurePanel state={state} />
          </StateLinksDisclosure>
        </Col>
      </Row>
    </div>
  )
}

const LastUpdated = ({ lastUpdatedEt }) => (
  <p className={preambleStyle.lastUpdated}>
    State’s last reported update time: {lastUpdatedEt} ET
  </p>
)

export default Preamble
export { Preamble, LastUpdated }
