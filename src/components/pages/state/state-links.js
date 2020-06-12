import React from 'react'
import { UnstyledList } from '~components/common/lists'

export default ({ twitter, covid19Site, dataSource }) => (
  <UnstyledList>
    {twitter && (
      <li>
        <a href={`https://twitter.com/${twitter}`}>Official Twitter</a>
        {covid19Site || dataSource ? <span>{'\u2022'}</span> : ''}
      </li>
    )}
    {covid19Site && (
      <li>
        <a href={covid19Site}>Best Current Data Source</a>
        {dataSource ? <span>{'\u2022'}</span> : ''}
      </li>
    )}
    {dataSource && (
      <li>
        <a href={dataSource}>Data Source</a>
      </li>
    )}
  </UnstyledList>
)
