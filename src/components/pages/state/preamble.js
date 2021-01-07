import React, { useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import classnames from 'classnames'
import OverviewWrapper from '~components/common/overview-wrapper'
import { Row, Col } from '~components/common/grid'
import StateGrade from '~components/pages/state/state-grade'
import {
  DownloadData,
  DownloadDataRow,
} from '~components/pages/state/download-data'
import {
  StateLinks,
  StateLinksDisclosure,
  StateLinksDisclosureButton,
  StateLinksDisclosurePanel,
} from '~components/pages/state/state-links'
import preambleStyle from './preamble.module.scss'

const StatePreamble = ({ state, urls, covidState }) => {
  const [stateLinksAreOpen, setStateLinksAreOpen] = useState(false)
  const [downloadDataIsOpen, setDownloadDataIsOpen] = useState(false)
  const { links } = urls.childTacoYaml
  // todo make state grade wrap as a circle with the grade description
  return (
    <OverviewWrapper className={preambleStyle.preamble}>
      <h2 className="a11y-only">State overview</h2>
      <div className={preambleStyle.largeDisclosure}>
        <h3 className={preambleStyle.header}>Where this data comes from</h3>
        <StateLinks
          twitter={state.twitter}
          links={links}
          stateName={state.name}
          stateSlug={state.childSlug.slug}
          fullWidth
        />
      </div>
      <DownloadDataRow
        slug={state.childSlug.slug}
        lastUpdateEt={covidState.dateModified}
      >
        <StateGrade letterGrade={covidState.dataQualityGrade} />
      </DownloadDataRow>
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
                <DownloadData slug={state.childSlug.slug} hideLabel />
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
    </OverviewWrapper>
  )
}

export default StatePreamble
