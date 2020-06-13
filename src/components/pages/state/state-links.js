import React from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'
import { UnstyledList } from '~components/common/lists'

export default ({
  twitter,
  covid19Site,
  dataSource,
  stateName,
  historicalSlug,
}) => (
  <UnstyledList>
    {twitter && (
      <li>
        <a href={`https://twitter.com/${twitter}`}>
          <span className="a11y-only">{stateName}&apos;s </span>
          Official Twitter
        </a>
        {covid19Site || dataSource ? <span>{'\u2022'}</span> : ''}
      </li>
    )}
    {covid19Site && (
      <li>
        <a href={covid19Site}>
          <span className="a11y-only">{stateName}&apos;s </span>
          Best Current Data Source
        </a>
        {dataSource || historicalSlug ? <span>{'\u2022'}</span> : ''}
      </li>
    )}
    {dataSource && (
      <li>
        <a href={dataSource}>
          Data Source
          <span className="a11y-only"> for {stateName}</span>
        </a>
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
  </UnstyledList>
)
