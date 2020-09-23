import React from 'react'
import { Link } from 'gatsby'
import { Card, CardBody, CardNote, CardHeading } from '~components/common/card'
// import { DefinitionPanelContext } from './definitions-panel'

export default ({ data, stateSlug }) => {
  return (
    <Card
      title="Long Term Care"
      link={
        <Link to={`/data/state/${stateSlug}/long-term-care`}>More data</Link>
      }
    >
      <CardBody>
        {data ? (
          <>
            <CardHeading>Current outbreaks</CardHeading>
          </>
        ) : (
          <CardNote>No long-term care data reported.</CardNote>
        )}
      </CardBody>
    </Card>
  )
}
