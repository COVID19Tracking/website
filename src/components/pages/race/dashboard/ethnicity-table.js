import React from 'react'
import BaseTable from './base-table'

const EthnicityTable = ({
  data,
  type,
  notes,
  groupedNotes,
  noPositives,
  noDeaths,
}) => {
  const rows = [
    {
      group: 'Hispanic or Latino',
      population: data.latinXPctPop,
      positive: {
        disparity: data.latinXPosDispFlag,
        value: data.latinXPctPos,
        note: {
          value: notes.latinXPos,
          index: groupedNotes.indexOf(notes.latinXPos),
        },
      },
      death: {
        disparity: data.latinXDeathDispFlag,
        value: data.latinXPctDeath,
        note: {
          value: notes.latinXDeath,
          index: groupedNotes.indexOf(notes.latinXDeath),
        },
      },
      hospitalization: {
        disparity: data.latinXHospDispFlag,
        caution: data.latinXHospCaution,
        value: data.latinXPctHosp,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      test: {
        disparity: data.latinXTestDispFlag,
        caution: data.latinXTestCaution,
        value: data.latinXPctTest,
        note: {
          value: undefined,
          index: undefined,
        },
      },
    },
    {
      group: 'Not Hispanic or Latino',
      population: data.nonhispanicPctPop,
      positive: {
        disparity: data.nonhispanicPosDispFlag,
        value: data.nonhispanicPctPos,
        note: {
          value: notes.nonhispanicPos,
          index: groupedNotes.indexOf(notes.nonhispanicPos),
        },
      },
      death: {
        disparity: data.nonhispanicDeathDispFlag,
        value: data.nonhispanicPctDeath,
        note: {
          value: notes.nonhispanicDeath,
          index: groupedNotes.indexOf(notes.nonhispanicDeath),
        },
      },
      hospitalization: {
        disparity: data.nonhispanicHospDispFlag,
        caution: data.nonhispanicHospCaution,
        value: data.nonhispanicPctHosp,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      test: {
        disparity: data.nonhispanicTestDispFlag,
        caution: data.nonhispanicTestCaution,
        value: data.nonhispanicPctTest,
        note: {
          value: undefined,
          index: undefined,
        },
      },
    },
  ]
  return (
    <BaseTable
      rows={rows}
      data={data}
      type={type}
      noPositives={noPositives}
      noDeaths={noDeaths}
      noTests={!data.anyTestData}
      noHospitalizations={!data.anyHospData}
    />
  )
}

export default EthnicityTable
