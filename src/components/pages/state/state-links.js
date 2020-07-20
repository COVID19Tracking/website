/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'
import stateLinksStyle from './state-links.module.scss'

export default ({
  twitter,
  covid19Site,
  covid19SiteSecondary,
  covid19SiteTertiary,
  stateName,
  fathomGoal,
}) => {
  const trackClick = () => {
    if (!fathomGoal || typeof window.fathom === 'undefined') {
      return
    }
    window.fathom.trackGoal(fathomGoal, 0)
  }
  const links = []
  if (twitter) {
    links.push(
      <a href={`https://twitter.com/${twitter}`} onClick={trackClick}>
        <span className="a11y-only">{stateName}&apos;s </span>
        Official Twitter
      </a>,
    )
  }

  if (covid19Site) {
    links.push(
      <a href={covid19Site} onClick={trackClick}>
        <span className="a11y-only">{stateName}&apos;s </span>
        Best Current Data Source
      </a>,
    )
  }

  if (covid19SiteSecondary) {
    links.push(
      <a href={covid19SiteSecondary} onClick={trackClick}>
        Secondary Data Source
        <span className="a11y-only"> for {stateName}</span>
      </a>,
    )
  }

  if (covid19SiteTertiary) {
    links.push(
      <a href={covid19SiteTertiary} onClick={trackClick}>
        Tertiary Data Source
        <span className="a11y-only"> for {stateName}</span>
      </a>,
    )
  }

  links.push(
    <Link to={`/data/state/${slug(stateName)}/history`}>
      Historical Data
      <span className="a11y-only">for {stateName}</span>
    </Link>,
  )
  links.push(
    <Link to={`/data/state/${slug(stateName)}/screenshots`}>
      Screenshots
      <span className="a11y-only">for {stateName}</span>
    </Link>,
  )

  return (
    <ul className={stateLinksStyle.list}>
      {links.map((link, key) => (
        <li key={`state-links-${key}`}>
          {link}
          {links[key + 1] && <span>{'\u2022'}</span>}
        </li>
      ))}
    </ul>
  )
}
