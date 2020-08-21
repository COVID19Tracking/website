import React from 'react'
import { Link } from 'gatsby'
import { Card, CardBody, CardNote, CardHeading } from '~components/common/card'
// import { DefinitionPanelContext } from './definitions-panel'
import { Statistic } from '~components/common/statistic'

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
            <Statistic title="Nursing home" value={data.outbrkFacil_nh} />
            <Statistic title="Assisted living" value={data.outbrkFacil_alf} />
            <Statistic title="Long-term care" value={data.outbrkFacil_ltc} />
            <Statistic title="Other" value={data.outbrkFacil_other} />
          </>
        ) : (
          <CardNote>No long-term care data reported.</CardNote>
        )}
      </CardBody>
    </Card>
  )
}
