import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import classnames from 'classnames'

import { Row, Col } from '~components/common/grid'
import {
  DownloadData,
  DownloadDataRow,
} from '~components/pages/state/download-data'
import { LargeStateGrade } from '~components/pages/state/state-grade'
import {
  StateLinks,
  StateLinksDisclosure,
  StateLinksDisclosureButton,
  StateLinksDisclosurePanel,
} from '~components/pages/state/state-links'
import preambleStyle from './preamble.module.scss'

const StatePreamble = ({ state, covidState }) => {
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
      <h2 className="a11y-only">State overview</h2>
      <Row>
        <Col width={[4, 3, 6]}>
          <div className={preambleStyle.largeDisclosure}>
            <h3 className={preambleStyle.header}>Where this data comes from</h3>
            <StateLinks
              twitter={state.twitter}
              covid19Site={state.covid19Site}
              covid19SiteSecondary={state.covid19SiteSecondary}
              covid19SiteTertiary={state.covid19SiteTertiary}
              stateName={state.name}
              stateSlug={state.childSlug.slug}
            />
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
            <LargeStateGrade letterGrade={covidState.dataQualityGrade} />
          </div>
        </Col>
      </Row>
      <DownloadDataRow
        slug={state.childSlug.slug}
        lastUpdateEt={covidState.dateModified}
      />
      <Row>
        <Col width={[0, 0, 6]}>
          <div className={preambleStyle.mobileDisclosure}>
            <Disclosure
              open={downloadDataIsOpen}
              onChange={() => setDownloadDataIsOpen(!downloadDataIsOpen)}
            >
              <DisclosureButton className={preambleStyle.button}>
                <h3
                  className={classnames(
                    preambleStyle.header,
                    preambleStyle.hiddenHeader,
                  )}
                >
                  Get the data{' '}
                  <span className={preambleStyle.toggle}>
                    {downloadDataIsOpen ? <>&#8593;</> : <>&#8595;</>}
                  </span>
                </h3>
              </DisclosureButton>
              <DisclosurePanel>
                <DownloadData state={state} hideLabel />
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

export default StatePreamble
