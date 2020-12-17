import React, { useContext } from 'react'
import { Card, CardBody, CardNote } from '~components/common/card'
import { DefinitionPanelContext } from '../definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

import LastUpdatedLabel from '../last-updated-label'
import NoDataReported from './no-data-reported'

const CrdtCasesCard = ({ raceData, stateAbbreviation }) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = ['crdt_casesPer100k']

  return (
    <Card title="Race & ethnicity: cases per capita">
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
        {raceData.hasCases ? (
          <>
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
          </>
        ) : (
          <NoDataReported stateAbbreviation={stateAbbreviation} />
        )}
        {raceData.hasCases && (
          <>
            <CardNote>(All data is calculated)</CardNote>
            <LastUpdatedLabel date={raceData.lastCheckDate} />
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default CrdtCasesCard
