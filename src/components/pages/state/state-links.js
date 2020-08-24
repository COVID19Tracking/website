/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Link } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import stateLinksStyle from './state-links.module.scss'
import preambleStyle from './preamble.module.scss'

const StateLinks = ({
  twitter,
  covid19Site,
  covid19SiteSecondary,
  covid19SiteTertiary,
  stateName,
  stateSlug,
}) => {
  return (
    <div className={stateLinksStyle.container}>
      {covid19Site && (
        <a href={covid19Site} className={stateLinksStyle.link}>
          <span>Best current data source</span>
        </a>
      )}
      {covid19SiteSecondary && (
        <a href={covid19SiteSecondary} className={stateLinksStyle.link}>
          <span>Secondary data source</span>
        </a>
      )}
      {covid19SiteTertiary && (
        <a href={covid19SiteTertiary} className={stateLinksStyle.link}>
          <span>Tertiary data source</span>
        </a>
      )}
      {twitter && (
        <a
          href={`https://twitter.com/${twitter}`}
          className={stateLinksStyle.link}
        >
          <span className="a11y-only">{stateName}&apos;s </span>
          Official Twitter
        </a>
      )}
      <Link
        to={`/data/state/${stateSlug}/history`}
        className={stateLinksStyle.link}
      >
        Full history
      </Link>
      <Link
        className={stateLinksStyle.link}
        to={`/data/state/${stateSlug}/screenshots`}
      >
        <span>View screenshots</span>
      </Link>
    </div>
  )
}

const StateLinksDisclosureButton = ({ stateLinksAreOpen }) => (
  <DisclosureButton className={preambleStyle.button}>
    <h4 className={preambleStyle.header}>
      Where this data comes from{' '}
      <span className={preambleStyle.toggle}>
        {stateLinksAreOpen ? <>&#8593;</> : <>&#8595;</>}
      </span>
    </h4>
  </DisclosureButton>
)

const StateLinksDisclosurePanel = ({ state }) => (
  <DisclosurePanel>
    <StateLinks
      twitter={state.twitter}
      covid19Site={state.covid19Site}
      covid19SiteSecondary={state.covid19SiteSecondary}
      covid19SiteTertiary={state.covid19SiteTertiary}
      stateName={state.name}
      stateSlug={state.childSlug.slug}
    />
  </DisclosurePanel>
)

const StateLinksDisclosure = ({
  stateLinksAreOpen,
  setStateLinksAreOpen,
  mobileOnly = false,
  children,
}) => (
  <div className={mobileOnly && preambleStyle.mobileDisclosure}>
    <Disclosure
      open={stateLinksAreOpen}
      onChange={() => setStateLinksAreOpen(!stateLinksAreOpen)}
    >
      {children}
    </Disclosure>
  </div>
)

export default StateLinks

export {
  StateLinks,
  StateLinksDisclosure,
  StateLinksDisclosureButton,
  StateLinksDisclosurePanel,
}
