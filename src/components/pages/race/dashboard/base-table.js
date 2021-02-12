import React from 'react'
import { StateTable, StateTableHeader, StateTableBody } from './table'

const BaseTable = ({
  data,
  type,
  noPositives,
  noDeaths,
  noTests,
  noHospitalizations,
  rows,
}) => {
  return (
    <StateTable>
      <StateTableHeader
        groupTitle={type}
        noPositives={noPositives}
        noDeaths={noDeaths}
        noTests={noTests}
        noHospitalizations={noHospitalizations}
      />
      <StateTableBody
        noPositives={noPositives}
        noDeaths={noDeaths}
        noTests={noTests}
        noHospitalizations={noHospitalizations}
        state={data.name}
        stateAbbr={data.state}
        type={type}
        rows={rows}
      />
    </StateTable>
  )
}

export default BaseTable
