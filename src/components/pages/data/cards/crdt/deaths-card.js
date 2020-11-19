import React, { useContext } from 'react'
import { Card, CardBody, CardNote } from '~components/common/card'
import { DefinitionPanelContext } from '../definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

import LastUpdatedLabel from '../last-updated-label'

const perCapTo100k = value => {
  return Math.round(value * 100)
}

const createValuesList = raceData => {
  if (raceData === undefined) {
    return []
  }
  const values = []
  // perCap is *per 1,000*, multiply by 100 to get *per 100,000*
  if (raceData.aianDeathPerCap != null) {
    values.push({
      name: 'American Indian/Alaska Native',
      value: perCapTo100k(raceData.aianDeathPerCap),
      smallN: raceData.aianSmallN ? '*' : ' ',
    })
  }
  if (raceData.apiDeathPerCap != null) {
    values.push({
      name: 'Asian/Pacific Islander',
      value: perCapTo100k(raceData.apiDeathPerCap),
      smallN: raceData.apiSmallN ? '*' : ' ',
    })
  }
  if (raceData.asianDeathPerCap != null) {
    values.push({
      name: 'Asian',
      value: perCapTo100k(raceData.asianDeathPerCap),
      smallN: raceData.asianSmallN ? '*' : ' ',
    })
  }
  if (raceData.blackDeathPerCap != null) {
    values.push({
      name: 'Black/African American',
      value: perCapTo100k(raceData.blackDeathPerCap),
      smallN: raceData.blackSmallN ? '*' : ' ',
    })
  }
  if (raceData.latinXDeathPerCap != null) {
    values.push({
      name: 'Hispanic/Latino',
      value: perCapTo100k(raceData.latinXDeathPerCap),
      smallN: raceData.latinXSmallN ? '*' : ' ',
    })
  }
  if (raceData.nhpiDeathPerCap != null) {
    values.push({
      name: 'Native Hawaiian/Pacific Islander',
      value: perCapTo100k(raceData.nhpiDeathPerCap),
      smallN: raceData.nhpiSmallN ? '*' : ' ',
    })
  }
  if (raceData.whiteDeathPerCap != null) {
    values.push({
      name: 'White',
      value: perCapTo100k(raceData.whiteDeathPerCap),
      smallN: raceData.whiteSmallN ? '*' : ' ',
    })
  }

  values.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  return values
}

const CrdtCasesCard = ({ raceData }) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = ['crdt_deathsPer100k']

  const values = createValuesList(raceData)

  // todo stop using hardcoded date

  return (
    <Card title="Race & ethnicity deaths">
      <CardBody>
        <Statistic title="Deaths per 100,000 people" hideValue>
          <DefinitionLink
            label="Deaths per 100,000 people"
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'crdt_deathsPer100k',
              })
            }}
          />
        </Statistic>
        {values.map(category => (
          <Statistic
            key={category.name}
            title={category.name}
            value={category.value}
            suffix={category.smallN}
            subelement
            noDefinitionLink
            grey
          />
        ))}
        <CardNote>(All data on card are calculated)</CardNote>
        <CardNote>
          * Based on {'<'}10 deaths among members of this race/ethnicity.
          Interpret with caution.
        </CardNote>
        <LastUpdatedLabel date="09/12/20" />
      </CardBody>
    </Card>
  )
}

export default CrdtCasesCard
