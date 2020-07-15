import React from 'react'
import {
  CasesCard,
  TestsCard,
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

  return (
    <div className={summaryStyles.container}>
      {/* todo update 7 day value */}
      <CasesCard
        stateSlug={stateSlug}
        positive={data.positive}
        positiveIncrease={data.positiveIncrease}
        sevenDayIncrease={sevenDayPositiveIncrease}
      />
      <TestsCard
        stateSlug={data.stateSlug}
        negative={data.negative}
        positive={data.positive}
        pending={data.pending}
        posNeg={data.posNeg}
      />
      <CumulativeHospitalizationCard
        stateSlug={data.stateSlug}
        hospitalizedCumulative={data.hospitalizedCumulative}
        inIcuCumulative={data.inIcuCumulative}
        onVentilatorCumulative={data.onVentilatorCumulative}
      />
      <OutcomesCard
        stateSlug={data.stateSlug}
        deathsLabel={deathsLabel}
        death={data.death}
        deathConfirmed={data.deathConfirmed}
        deathProbable={data.deathProbable}
        recovered={data.recovered}
      />
      <RaceEthnicityCard stateSlug={data.stateSlug} raceData={raceData} />
      <CurrentHospitalizationCard
        stateSlug={data.stateSlug}
        hospitalizedCurrently={data.hospitalizedCurrently}
        inIcuCurrently={data.inIcuCurrently}
        onVentilatorCurrently={data.onVentilatorCurrently}
      />
    </div>
  )
}
