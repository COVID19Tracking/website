/* eslint-disable react/no-array-index-key */
import React from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import classnames from 'classnames'
import stateLinksStyle from './state-links.module.scss'
import preambleStyle from './preamble.module.scss'

const StateLinks = ({
  twitter,
  stateName,
  stateSlug,
  links,
  fullWidth = false,
}) => {
  const getLink = type => {
    const currentLink = links && links.find(link => link.name === type)
    if (!currentLink) {
      return false
    }
    return currentLink.url
  }
  return (
    <div
      className={classnames(
        stateLinksStyle.container,
        fullWidth && stateLinksStyle.fullWidth,
      )}
    >
      {getLink('primary') && (
        <a href={getLink('primary')} className={stateLinksStyle.link}>
          <span>Best current data source</span>
        </a>
      )}
      {getLink('secondary') && (
        <a href={getLink('secondary')} className={stateLinksStyle.link}>
          <span>Secondary data source</span>
        </a>
      )}
      {getLink('tertiary') && (
        <a href={getLink('tertiary')} className={stateLinksStyle.link}>
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
      <a
        className={stateLinksStyle.link}
        href={`https://screenshots.covidtracking.com/${stateSlug}`}
      >
        <span>View screenshots</span>
      </a>
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
      stateName={state.name}
      stateSlug={state.childSlug.slug}
      links={state.links && state.links.childTacoYaml.links}
    />
  </DisclosurePanel>
)

const StateLinksDisclosure = ({
  stateLinksAreOpen,
  setStateLinksAreOpen,
  mobileOnly = false,
  children,
}) => (
  <div className={mobileOnly ? preambleStyle.mobileDisclosure : undefined}>
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
