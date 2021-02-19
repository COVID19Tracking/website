import React from 'react'
import State from './state-data'
import StateNavWrapper from './state-nav-wrapper'
import statesStyles from './states.module.scss'

const States = ({
  states,
  stateData,
  sevenDaysAgoList,
  stateMetadata,
  annotations,
  raceDataCombined,
  raceDataSeparate,
  hhsHospitalization,
  ltcFedVaccinations,
  hhsTesting,
  hhsTestingNotes,
}) => {
  const stateList = []

  // handle crdt data
  const combinedStates = raceDataCombined.map(node => node.state)
  states.forEach(node => {
    const state = node

    // handle crdt data
    const isCombinedState = combinedStates.indexOf(state.state) >= 0
    if (isCombinedState) {
      // combined: ethnicity and race are together
      raceDataCombined.forEach(data => {
        if (data.state === state.state) {
          state.raceData = data
          state.raceData.isCombined = true
        }
      })
    } else {
      // not combined: ethnicity and race are separate
      raceDataSeparate.forEach(data => {
        if (data.state === state.state) {
          state.raceData = data
          state.raceData.isCombined = false
        }
      })
    }

    stateData.forEach(data => {
      if (data.state === state.state) {
        state.stateData = data
      }
    })
    sevenDaysAgoList.forEach(data => {
      if (state.state === data.state) {
        state.sevenDaysAgo = data
      }
    })
    state.annotations = annotations.filter(
      annotation => annotation.state && annotation.state === state.state,
    )

    state.hhsHospitalization = hhsHospitalization
      ? hhsHospitalization.find(record => record.state === state.state)
      : false

    state.ltcFedVaccinations = ltcFedVaccinations
      ? ltcFedVaccinations.find(record => record.Location === state.state)
      : false
    state.hhsTesting = hhsTesting
      ? hhsTesting.find(record => record.state === state.state)
      : false
    state.hhsTestingNotes = hhsTestingNotes
      ? hhsTestingNotes.find(record => record.state === state.state)
      : false

    stateList.push(state)
  })

  return (
    <StateNavWrapper stateList={stateList}>
      {stateList.map(state => (
        <div
          key={`state-list-${state.state}`}
          id={`state-list-${state.state}`}
          className={statesStyles.item}
        >
          <State
            state={state}
            stateData={state.stateData}
            metadata={stateMetadata.find(item => item.code === state.state)}
          />
        </div>
      ))}
    </StateNavWrapper>
  )
}

export default States
