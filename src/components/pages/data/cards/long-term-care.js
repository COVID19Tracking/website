import React from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
/* import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic' */

export default ({ stateSlug }) => {
  return (
    <Card
      title="Long Term Care"
      link={
        <Link to={`/data/state/${stateSlug}/longtermcare`}>
          Historical data
        </Link>
      }
    >
      <CardBody>body</CardBody>
    </Card>
  )
}
