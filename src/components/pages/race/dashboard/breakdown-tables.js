import React from 'react'
import { StateTable, StateTableHeader, StateTableBody } from './table'

const RaceTable = ({
  data,
  type,
  notes,
  groupedNotes,
  noPositives,
  noDeaths,
}) => {
  const rows = [
    {
      group: 'Black or African American alone',
      population: data.blackPctPop,
      positive: {
        disparity: data.blackPosDispFlag,
        value: data.blackPctPos,
        note: {
          value: notes.blackPos,
          index: groupedNotes.indexOf(notes.blackPos),
        },
      },
      death: {
        disparity: data.blackDeathDispFlag,
        value: data.blackPctDeath,
        note: {
          value: notes.blackDeath,
          index: groupedNotes.indexOf(notes.blackDeath),
        },
      },
    },
    {
      group: 'Hispanic or Latino *',
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
    },
    {
      group: 'Asian alone',
      population: data.asianPctPop,
      positive: {
        disparity: data.asianPosDispFlag,
        value: data.asianPctPos,
        note: {
          value: notes.asianPos,
          index: groupedNotes.indexOf(notes.asianPos),
        },
      },
      death: {
        disparity: data.asianDeathDispFlag,
        value: data.asianPctDeath,
        note: {
          value: notes.asianDeath,
          index: groupedNotes.indexOf(notes.asianDeath),
        },
      },
    },
    {
      group: 'Native Hawaiian and Pacific Islander alone',
      population: data.nhpiPctPop,
      positive: {
        disparity: data.nhpiPosDispFlag,
        value: data.nhpiPctPos,
        note: {
          value: notes.nhpiPos,
          index: groupedNotes.indexOf(notes.nhpiPos),
        },
      },
      death: {
        disparity: data.nhpiDeathDispFlag,
        value: data.nhpiPctDeath,
        note: {
          value: notes.nhpiDeath,
          index: groupedNotes.indexOf(notes.nhpiDeath),
        },
      },
    },
    {
      group: 'American Indian or Alaska Native alone',
      population: data.aianPctPop,
      positive: {
        disparity: data.aianPosDispFlag,
        value: data.aianPctPos,
        note: {
          value: notes.aianPos,
          index: groupedNotes.indexOf(notes.aianPos),
        },
      },
      death: {
        disparity: data.aianDeathDispFlag,
        value: data.aianPctDeath,
        note: {
          value: notes.aianDeath,
          index: groupedNotes.indexOf(notes.aianDeath),
        },
      },
    },
    {
      group: 'Two or more races',
      population: data.twoPctPop,
      positive: {
        disparity: data.twoPosDispFlag,
        value: data.twoPctPos,
        note: {
          value: notes.twoPos,
          index: groupedNotes.indexOf(notes.twoPos),
        },
      },
      death: {
        disparity: data.twoDeathDispFlag,
        value: data.twoPctDeath,
        note: {
          value: notes.twoDeath,
          index: groupedNotes.indexOf(notes.twoDeath),
        },
      },
    },
    {
      group: 'White alone',
      population: data.whitePctPop,
      positive: {
        disparity: data.whitePosDispFlag,
        value: data.whitePctPos,
        note: {
          value: notes.whitePos,
          index: groupedNotes.indexOf(notes.whitePos),
        },
      },
      death: {
        disparity: data.whiteDeathDispFlag,
        value: data.whitePctDeath,
        note: {
          value: notes.whiteDeath,
          index: groupedNotes.indexOf(notes.whiteDeath),
        },
      },
    },
    {
      group: 'Some other race alone',
      population: data.otherPctPop,
      positive: {
        disparity: data.otherPosDispFlag,
        value: data.otherPctPos,
        note: {
          value: notes.otherPos,
          index: groupedNotes.indexOf(notes.otherPos),
        },
      },
      death: {
        disparity: data.otherDeathDispFlag,
        value: data.otherPctDeath,
        note: {
          value: notes.otherDeath,
          index: groupedNotes.indexOf(notes.otherDeath),
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
    />
  )
}

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
    },
  ]
  return (
    <BaseTable
      rows={rows}
      data={data}
      type={type}
      noPositives={noPositives}
      noDeaths={noDeaths}
    />
  )
}

const BaseTable = ({ data, type, noPositives, noDeaths, rows }) => {
  return (
    <StateTable>
      <StateTableHeader
        groupTitle={type}
        noPositives={noPositives}
        noDeaths={noDeaths}
      />
      <StateTableBody
        noPositives={noPositives}
        noDeaths={noDeaths}
        state={data.name}
        type={type}
        rows={rows}
      />
    </StateTable>
  )
}

export { RaceTable, EthnicityTable }
