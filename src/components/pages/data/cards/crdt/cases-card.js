import React, { useContext } from 'react'
import { Card, CardBody, CardNote } from '~components/common/card'
import { DefinitionPanelContext } from '../definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

import LastUpdatedLabel from '../last-updated-label'

const CrdtCasesCard = ({ raceData }) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = ['crdt_casesPer100k']

  // todo stop using hardcoded date

  return (
    <Card title="Race & ethnicity cases">
      <CardBody>
        <Statistic title="Cases per 100,000 people" hideValue>
          <DefinitionLink
            label="Cases per 100,000 people"
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'crdt_casesPer100k',
              })
            }}
          />
        </Statistic>
        {raceData.values.map(category => (
          <Statistic
            key={category.name}
            title={category.name}
            value={category.casesValue}
            subelement
            noDefinitionLink
            grey
          />
        ))}
        <CardNote>(All data on card are calculated)</CardNote>
        <LastUpdatedLabel date="09/12/20" />
      </CardBody>
    </Card>
  )
}

export default CrdtCasesCard
