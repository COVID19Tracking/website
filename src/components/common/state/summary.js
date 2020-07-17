import React, { useState } from 'react'
import {
  CasesCard,
  PCRTestsCard,
  ViralTestsCard,
  CumulativeHospitalizationCard,
  CurrentHospitalizationCard,
  RaceEthnicityCard,
  OutcomesCard,
} from './state-cards'
import summaryStyles from './summary.module.scss'

export default ({ stateSlug, data, raceData, sevenDaysAgo }) => {
  const deathsLabel =
    data.deathProbable || data.deathConfirmed ? 'Total deaths' : 'Deaths'
  const sevenDayPositiveIncrease =
    (data.positive - sevenDaysAgo.positive) / sevenDaysAgo.positive

  const [showDefinitions, setShowDefinitions] = useState(false)
  // const [currentDefinition, setCurrentDefinition] = useState(null)

  const definitionToggle = definition => {
    setShowDefinitions(true) // show definitions panel
    console.log(`jumping to: ${definition}`) // todo rm me
    // this is the definition to jump to in the panel
    // setCurrentDefinition(definition)
  }

  return (
    <>
      {showDefinitions && <DefinitionsPanel />}
      <div className={summaryStyles.container}>
        <CasesCard
          stateSlug={stateSlug}
          onDefinitionsToggle={definitionToggle}
          positive={data.positive}
          positiveIncrease={data.positiveIncrease}
          sevenDayIncrease={sevenDayPositiveIncrease}
        />
        <PCRTestsCard
          stateSlug={stateSlug}
          onDefinitionsToggle={definitionToggle}
          negative={data.negative}
          positive={data.positive}
          pending={data.pending}
          posNeg={data.posNeg}
        />
        <ViralTestsCard
          stateSlug={stateSlug}
          onDefinitionsToggle={definitionToggle}
          totalTestsViral={data.totalTestsViral}
          positiveTestsViral={data.positiveTestsViral}
          negativeTestsViral={data.negativeTestsViral}
        />
        <CumulativeHospitalizationCard
          stateSlug={stateSlug}
          onDefinitionsToggle={definitionToggle}
          hospitalizedCumulative={data.hospitalizedCumulative}
          inIcuCumulative={data.inIcuCumulative}
          onVentilatorCumulative={data.onVentilatorCumulative}
        />
        <OutcomesCard
          stateSlug={stateSlug}
          onDefinitionsToggle={definitionToggle}
          deathsLabel={deathsLabel}
          death={data.death}
          deathConfirmed={data.deathConfirmed}
          deathProbable={data.deathProbable}
          recovered={data.recovered}
        />
        <RaceEthnicityCard
          stateSlug={stateSlug}
          onDefinitionsToggle={definitionToggle}
          raceData={raceData}
        />
        <CurrentHospitalizationCard
          stateSlug={stateSlug}
          onDefinitionsToggle={definitionToggle}
          hospitalizedCurrently={data.hospitalizedCurrently}
          inIcuCurrently={data.inIcuCurrently}
          onVentilatorCurrently={data.onVentilatorCurrently}
        />
      </div>
    </>
  )
}

const DefinitionsPanel = () => (
  <div
    className={summaryStyles.definitionsPanel}
    role="dialog"
    aria-labelledby="definitionsDialogLabel"
  >
    <span id="definitionsDialogLabel" className="a11y-only">
      Data definitions
    </span>
    <h2>Definitions</h2>
  </div>
)
