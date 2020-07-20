import React, { useRef } from 'react'
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

  // todo get from API
  let definitions = [
    {
      name: 'Negative (People or Cases)',
      slug: 'negative',
      childContentfulDataDefinitionDefinitionTextNode: {
        childMarkdownRemark: {
          html:
            '<p>Individuals with a completed viral test that returned a negative result. For states / territories that do not report this number directly, we compute it using one of several methods, depending on which data points the state provides.</p>',
        },
      },
    },
    {
      name: 'Positive Cases (People, confirmed + probable)',
      slug: 'positive',
      childContentfulDataDefinitionDefinitionTextNode: {
        childMarkdownRemark: {
          html:
            '<p>Total number of <strong>people with confirmed OR probable COVID-19</strong> reported by the state or territory (per the expanded <a href="https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf">CSTE case definition</a> of April 5th, 2020 <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">approved by the CDC</a>). A <strong>confirmed case</strong> is a person who has a positive test result from an FDA approved diagnostic molecular test. A <strong>probable case</strong> is a person who either has <strong>presentable symptoms WITH epidemiological evidence</strong> or <strong>has BOTH a positive presumptive laboratory test AND also EITHER presentable symptoms OR epidemiological evidence</strong>. Epidemiological evidence refers either to close-proximity contact with a known case or travel history to an area with high disease incidence. According to the guidelines, FDA approved antibody and antigen tests are considered part of presumptive laboratory evidence.</p>',
        },
      },
    },
    {
      name: 'Cumulative on ventilator',
      slug: 'cumulative-on-ventilator',
      childContentfulDataDefinitionDefinitionTextNode: {
        childMarkdownRemark: {
          html:
            '<p>Total number of individuals who have <strong>ever been hospitalized under advanced ventilation with COVID-19</strong>. Definitions vary by state / territory. Where possible, we report patients on ventilation with confirmed or probable COVID-19 cases per the expanded <a href="https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf">CSTE case definition</a> of April 5th, 2020 <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">approved by the CDC</a>.</p>',
        },
      },
    },
  ]

  definitions = definitions.map(d => ({
    // avoid the markdownRemark nesting and naming
    name: d.name,
    slug: d.slug,
    ref: useRef(),
    content:
      d.childContentfulDataDefinitionDefinitionTextNode.childMarkdownRemark
        .html,
  }))

  definitions = definitions.reduce(
    // convert the list to an object with slugs as keys
    (obj, item) => ({
      ...obj,
      [item.slug]: item,
    }),
    {},
  )

  return (
    <>
      <div className={summaryStyles.container}>
        <CasesCard
          definitions={definitions}
          stateSlug={stateSlug}
          positive={data.positive}
          positiveIncrease={data.positiveIncrease}
          sevenDayIncrease={sevenDayPositiveIncrease}
        />
        <PCRTestsCard
          definitions={definitions}
          stateSlug={stateSlug}
          negative={data.negative}
          positive={data.positive}
          pending={data.pending}
          posNeg={data.posNeg}
        />
        <ViralTestsCard
          definitions={definitions}
          stateSlug={stateSlug}
          totalTestsViral={data.totalTestsViral}
          positiveTestsViral={data.positiveTestsViral}
          negativeTestsViral={data.negativeTestsViral}
        />
        <CumulativeHospitalizationCard
          definitions={definitions}
          stateSlug={stateSlug}
          hospitalizedCumulative={data.hospitalizedCumulative}
          inIcuCumulative={data.inIcuCumulative}
          onVentilatorCumulative={data.onVentilatorCumulative}
        />
        <OutcomesCard
          definitions={definitions}
          stateSlug={stateSlug}
          deathsLabel={deathsLabel}
          death={data.death}
          deathConfirmed={data.deathConfirmed}
          deathProbable={data.deathProbable}
          recovered={data.recovered}
        />
        <RaceEthnicityCard
          definitions={definitions}
          stateSlug={stateSlug}
          raceData={raceData}
        />
        <CurrentHospitalizationCard
          definitions={definitions}
          stateSlug={stateSlug}
          hospitalizedCurrently={data.hospitalizedCurrently}
          inIcuCurrently={data.inIcuCurrently}
          onVentilatorCurrently={data.onVentilatorCurrently}
        />
      </div>
    </>
  )
}
