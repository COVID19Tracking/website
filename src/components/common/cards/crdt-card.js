import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { Statistic } from '~components/common/statistic'

export default ({ stateSlug, crdtData, population }) => {
  const getField = (field, type) => {
    if (field === 'all') {
      return null
    }
    if (!crdtData[field + type]) {
      return 0
    }
    return Math.round(
      (parseInt(crdtData[field + type], 10) /
        (parseFloat(crdtData[`${field}PctPop`]) * population)) *
        100000,
    )
  }

  const groups = [
    {
      label: 'Black',
      cases: getField('black', 'Positives'),
      deaths: getField('black', 'Deaths'),
    },
    {
      label: 'Hispanic/Latino',
      cases: getField('latinX', 'Positives'),
      deaths: getField('latinX', 'Deaths'),
    },
    {
      label: 'Asian',
      cases: getField('asian', 'Positives'),
      deaths: getField('asian', 'Deaths'),
    },
    {
      label: 'AIAN',
      cases: getField('aian', 'Positives'),
      deaths: getField('aian', 'Deaths'),
    },
    {
      label: 'White',
      cases: getField('white', 'Positives'),
      deaths: getField('white', 'Deaths'),
    },
    {
      label: 'NHPI',
      cases: getField('nhpi', 'Positives'),
      deaths: getField('nhpi', 'Deaths'),
    },
  ]

  return (
    <Card
      title="Race &amp; Ethnicity"
      link={
        <Link to={`/data/state/${stateSlug}/race-ethnicity`}>
          Complete data
        </Link>
      }
    >
      <CardBody>
        {groups.map(group => (
          <Fragment key={group.label}>
            <Statistic title={`${group.label} cases`} value={group.cases} />
            <Statistic title={`${group.label} deaths`} value={group.deaths} />
          </Fragment>
        ))}
      </CardBody>
    </Card>
  )
}
