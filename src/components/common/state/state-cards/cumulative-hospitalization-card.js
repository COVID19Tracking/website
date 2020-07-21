import React from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { Statistic } from '~components/common/statistic'

export default ({
  stateSlug,
  hospitalizedCumulative,
  inIcuCumulative,
  onVentilatorCumulative,
}) => (
  <Card
    title="Cumulative Hospitalization"
    link={
      <Link to={`/data/state/${stateSlug}/hospitalization`}>
        Historical data
      </Link>
    }
  >
    <CardBody>
      <Statistic
        title="Cumulative hospitalized"
        value={hospitalizedCumulative}
      />
      <Statistic title="Cumulative in ICU" value={inIcuCumulative} />
      <Statistic
        title="Cumulative on ventilator"
        value={onVentilatorCumulative}
      />
    </CardBody>
  </Card>
)
