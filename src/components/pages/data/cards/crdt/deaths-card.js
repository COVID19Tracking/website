import React, { useContext } from 'react'
import { Card, CardBody, CardNote } from '~components/common/card'
import { DefinitionPanelContext } from '../definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

import LastUpdatedLabel from '../last-updated-label'

const CrdtCasesCard = ({ raceData }) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = ['crdt_deathsPer100k']

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
        {raceData.values.map(category => (
          <Statistic
            key={category.name}
            title={category.name}
            value={category.deathsValue}
            suffix={category.suffix}
            subelement
            noDefinitionLink
            grey
          />
        ))}
        <CardNote>(All data on card are calculated)</CardNote>
        {raceData.hasAsterisk && (
          <CardNote>
            * Based on {'<'}10 deaths among members of this race/ethnicity.
            Interpret with caution.
          </CardNote>
        )}
        <LastUpdatedLabel date="09/12/20" />
      </CardBody>
    </Card>
  )
}

export default CrdtCasesCard
