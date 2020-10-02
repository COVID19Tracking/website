import React from 'react'
import { Link } from 'gatsby'
import { Card, CardBody, CardNote } from '~components/common/card'
import { Statistic } from '~components/common/statistic'

export default ({ data, stateSlug }) => {
  let totalDeath = 0
  let totalCases = 0
  const { overview } = data
  Object.keys(overview).forEach(key => {
    if (key.search(/posres|posstaff/) > -1) {
      totalCases += overview[key]
    }
    if (key.search(/deathres|deathstaff/) > -1) {
      totalDeath += overview[key]
    }
  })
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
            <Statistic title="Total cases" value={totalCases} />
            <Statistic title="Total deaths" value={totalDeath} />
            <Statistic title="Facilities tracked" value={data.facilities} />
          </>
        ) : (
          <CardNote>No long-term care data reported.</CardNote>
        )}
      </CardBody>
    </Card>
  )
}
