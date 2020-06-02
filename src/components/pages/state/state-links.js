import React from 'react'
import { UnstyledList } from '~components/common/lists'

export default ({ name, twitter, covid19Site, dataSource }) => (
  <UnstyledList>
    {twitter && (
      <li>
        <a href={`https://twitter.com/${twitter}`}>{name} on Twitter</a>
      </li>
    )}
    {covid19Site && (
      <li>
        <a href={covid19Site}>Best current data source</a>
      </li>
    )}
    {dataSource && (
      <li>
        <a href={dataSource}>Data source</a>
      </li>
    )}
  </UnstyledList>
)
