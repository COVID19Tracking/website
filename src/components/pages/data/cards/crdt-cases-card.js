import React, { useContext } from 'react'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

const perCapTo100k = value => {
  return Math.round(value * 100)
}

const createValuesList = raceData => {
  if (raceData === undefined) {
    return []
  }
  const values = []

  // perCap is *per 1,000*, multiply by 100 to get *per 100,000*
  if (raceData.aianPosPerCap != null) {
    values.push({
      name: 'American Indian/Alaska Native',
      value: perCapTo100k(raceData.aianPosPerCap),
    })
  }
  if (raceData.apiPosPerCap != null) {
    values.push({
      name: 'Asian/Pacific Islander',
      value: perCapTo100k(raceData.apiPosPerCap),
    })
  }
  if (raceData.asianPosPerCap != null) {
    values.push({
      name: 'Asian',
      value: perCapTo100k(raceData.asianPosPerCap),
    })
  }
  if (raceData.blackPosPerCap != null) {
    values.push({
      name: 'Black/African American',
      value: perCapTo100k(raceData.blackPosPerCap),
    })
  }
  if (raceData.latinXPosPerCap != null) {
    values.push({
      name: 'Hispanic/Latino',
      value: perCapTo100k(raceData.latinXPosPerCap),
    })
  }
  if (raceData.nhpiPosPerCap != null) {
    values.push({
      name: 'Native Hawaiian/Pacific Islander',
      value: perCapTo100k(raceData.nhpiPosPerCap),
    })
  }
  if (raceData.whitePosPerCap != null) {
    values.push({
      name: 'White',
      value: perCapTo100k(raceData.whitePosPerCap),
    })
  }

  return values
}

const CrdtCasesCard = ({ raceData }) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = ['crdt_casesPer100k']

  const values = createValuesList(raceData)

  return (
    <Card title="Race & ethnicity cases">
      <CardBody>
        <Statistic title="Cases per 100,000 people" hideValue>
          <DefinitionLink
            label="Currently hospitalized"
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'crdt_casesPer100k',
              })
            }}
          />
        </Statistic>
        {values.map(category => (
          <Statistic title={category.name} subelement value={category.value} />
        ))}
      </CardBody>
    </Card>
  )
}

export default CrdtCasesCard
