import React from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'
import stateLinksStyle from './state-links.module.scss'

export default ({
  twitter,
  covid19Site,
  covid19SiteSecondary,
  stateName,
  historicalSlug,
}) => (
  <ul className={stateLinksStyle.list}>
    {twitter && (
      <li>
        <a href={`https://twitter.com/${twitter}`}>
          <span className="a11y-only">{stateName}&apos;s </span>
          Official Twitter
        </a>
        {covid19Site || covid19SiteSecondary ? <span>{'\u2022'}</span> : ''}
      </li>
    )}
    {covid19Site && (
      <li>
        <a href={covid19Site}>
          <span className="a11y-only">{stateName}&apos;s </span>
          Best Current Data Source
        </a>
        {covid19SiteSecondary || historicalSlug ? <span>{'\u2022'}</span> : ''}
      </li>
    )}
    {covid19SiteSecondary && (
      <li>
        <a href={covid19SiteSecondary}>
          Secondary Data Source
          <span className="a11y-only"> for {stateName}</span>
        </a>
        {historicalSlug ? <span>{'\u2022'}</span> : ''}
      </li>
    )}
    {historicalSlug && (
      <li>
        <Link to={`/data/state/${slug(historicalSlug)}#historical`}>
          Historical Data
          <span className="a11y-only">for {stateName}</span>
        </Link>
      </li>
    )}
  </ul>
)
