import React, { useContext } from 'react'
import { Card, CardBody, CardNote } from '~components/common/card'
import { DefinitionPanelContext } from '../definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

import LastUpdatedLabel from '../last-updated-label'
import NoDataReported from './no-data-reported'

const CrdtCasesCard = ({ raceData, stateAbbreviation }) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = ['crdt_deathsPer100k']

  return (
    <Card title="Race & ethnicity: deaths per capita">
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
        {raceData.hasDeaths ? (
          <>
            {raceData.values.map(category => (
              <Statistic
                key={category.name}
                title={category.name}
                value={category.deathsValue}
                asterisk={category.asterisk}
                subelement
                noDefinitionLink
                grey
              />
            ))}
          </>
        ) : (
          <NoDataReported stateAbbreviation={stateAbbreviation} />
        )}
        {raceData.hasDeaths && <CardNote>(All data is calculated)</CardNote>}
        {raceData.hasAsterisk && (
          <CardNote>
            * Based on {'<'}10 deaths among members of this race/ethnicity.
            Interpret with caution.
          </CardNote>
        )}
        {raceData.hasDeaths && (
          <>
            <LastUpdatedLabel date={raceData.lastCheckDate} />
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default CrdtCasesCard
