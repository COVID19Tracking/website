import React from 'react'
import HeaderSorter from './header-sorter'
import PercentageOverview from './percentage-overview'
import { StateTable, StateTableHeader, StateTableBody } from './table'
import stateStyle from './state.module.scss'

export default ({ state }) => (
  <div>
    <div className={stateStyle.stateOverview}>
      <div className={stateStyle.totals}>
        <PercentageOverview stateName={state.name} />
      </div>
      <div className={stateStyle.note}>
        <HeaderSorter stateName={state.name} stateReports="race/ethnicity" />
      </div>
    </div>
    <h3>Cases and deaths by race/ethnicity</h3>
    <StateTable>
      <StateTableHeader groupTitle="Race/Ethnicity" />
      <StateTableBody
        rows={[
          {
            group: 'Black or African American alone',
            population: state.blackPctPop,
            positive: state.blackPctPos,
            death: state.blackPctDeath,
          },
          {
            group: 'Hispanic or Latino *',
            population: state.latinXPctPop,
            positive: state.latinXPctPos,
            death: state.latinXPctDeath,
          },
          {
            group: 'Asian alone',
            population: state.asianPctPop,
            positive: state.asianPctPos,
            death: state.asianPctDeath,
          },
          {
            group: 'Native Hawaiian and Pacific Islander alone',
            population: state.nhpiPctPop,
            positive: state.nhpiPctPos,
            death: state.nhpiPctDeath,
          },
          {
            group: 'American Indian or Alaska Native alone',
            population: state.aianPctPop,
            positive: state.aianPctPos,
            death: state.aianPctDeath,
          },
          {
            group: 'Two or more races',
            population: state.twoPctPop,
            positive: state.twoPctPos,
            death: state.twoPctDeath,
          },
          {
            group: 'White alones',
            population: state.whitePctPop,
            positive: state.whitePctPos,
            death: state.whitePctDeath,
          },
          {
            group: 'Some other race alone',
            population: state.otherPctPop,
            positive: state.otherPctPos,
            death: state.otherPctDeath,
          },
        ]}
      />
    </StateTable>
  </div>
)
