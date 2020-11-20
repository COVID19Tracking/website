import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody, CardNote } from '~components/common/card'
import {
  Statistic,
  DrillDown,
  DefinitionLink,
} from '~components/common/statistic'
import { DefinitionPanelContext } from './definitions-panel'
import { FormatDate, formatDateToString } from '~components/utils/format'

export default ({ data, stateName, stateDeaths, stateSlug }) => {
  const { current, last } = data
  let facilities = 0
  Object.keys(current).forEach(key => {
    if (key.search('outbrkfac') > -1) {
      facilities += current[key]
    }
  })
  const definitionContext = useContext(DefinitionPanelContext)
  const definitionFields = ['ltc_cases', 'ltc_deaths', 'ltc_facilities']
  const getChange = field => {
    if (!current[field] || !last[field]) {
      return 'N/A'
    }
    return `${Math.round(
      ((current[field] - last[field]) / last[field]) * 100 * 10,
    ) / 10}%`
  }

  const percentDeaths = () => {
    if (!current.total_death || !stateDeaths) {
      return 'N/A'
    }
    return `${Math.round((current.total_death / stateDeaths) * 100 * 10) / 10}%`
  }

  return (
    <Card
      title="Long-Term Care (LTC)"
      link={
        <Link to={`/data/state/${stateSlug}/long-term-care`}>
          <span className="a11y-only">{stateName} long-term care data </span>
          <span aria-hidden>More data</span>
        </Link>
      }
    >
      <CardBody>
        <Statistic title="Total cases" value={current.total_cases}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: definitionFields,
                highlight: 'ltc_cases',
              })
            }}
            label="Long-term care  cases"
          />
        </Statistic>
        <Statistic title="Total deaths" value={current.total_death}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: definitionFields,
                highlight: 'ltc_deaths',
              })
            }}
            label="Long-term care deaths"
          />
        </Statistic>
        <Statistic title="Number of facilities affected" value={facilities}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: definitionFields,
                highlight: 'ltc_facilities',
              })
            }}
            label="Long-term care facilities"
          />
        </Statistic>

        <DrillDown
          label={
            <>
              Percent of state deaths
              <br /> from LTC facilities
            </>
          }
          value={percentDeaths()}
          calculated
        />
        <DrillDown
          label={`New cases since ${formatDateToString(last.date, 'LLL d')}`}
          value={getChange('total_cases')}
          calculated
        />
        <DrillDown
          label={`New deaths since ${formatDateToString(last.date, 'LLL d')}`}
          value={getChange('total_death')}
          calculated
        />
        <CardNote>
          Data as of <FormatDate date={current.date} format="LLLL dd yyyy" />
        </CardNote>
      </CardBody>
    </Card>
  )
}
