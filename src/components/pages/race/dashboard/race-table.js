import React from 'react'
import BaseTable from './base-table'

const RaceTable = ({
  data,
  type,
  notes,
  groupedNotes,
  noPositives,
  isCombined,
  noDeaths,
  isInEthnicityState,
}) => {
  const rows = [
    {
      group: 'Black or African American alone',
      population: data.blackPctPop,
      positive: {
        disparity: data.blackPosDispFlag,
        caution: data.blackPosCaution,
        value: data.blackPctPos,
        note: {
          value: notes.blackPos,
          index: groupedNotes.indexOf(notes.blackPos),
        },
      },
      hospitalization: {
        disparity: data.blackHospDispFlag,
        caution: data.blackHospCaution,
        value: data.blackPctHosp,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      test: {
        disparity: data.blackTestDispFlag,
        caution: data.blackTestCaution,
        value: data.blackPctTest,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      death: {
        disparity: data.blackDeathDispFlag,
        caution: data.blackDeathCaution,
        value: data.blackPctDeath,
        note: {
          value: notes.blackDeath,
          index: groupedNotes.indexOf(notes.blackDeath),
        },
      },
    },
    {
      group: `Hispanic or Latino ${isCombined ? '*' : ''}`,
      hideInEthnicityState: true,
      population: data.latinXPctPop,
      positive: {
        disparity: data.latinXPosDispFlag,
        caution: data.latinXPosCaution,
        value: data.latinXPctPos,
        note: {
          value: notes.latinXPos,
          index: groupedNotes.indexOf(notes.latinXPos),
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
      death: {
        disparity: data.latinXDeathDispFlag,
        caution: data.latinXPosCaution,
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
        caution: data.asianPosCaution,
        value: data.asianPctPos,
        note: {
          value: notes.asianPos,
          index: groupedNotes.indexOf(notes.asianPos),
        },
      },
      hospitalization: {
        disparity: data.asianHospDispFlag,
        caution: data.asianHospCaution,
        value: data.asianPctHosp,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      test: {
        disparity: data.asianTestDispFlag,
        caution: data.asianTestCaution,
        value: data.asianPctTest,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      death: {
        disparity: data.asianDeathDispFlag,
        caution: data.asianDeathCaution,
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
        caution: data.nhpiPosCaution,
        value: data.nhpiPctPos,
        note: {
          value: notes.nhpiPos,
          index: groupedNotes.indexOf(notes.nhpiPos),
        },
      },
      hospitalization: {
        disparity: data.nhpiHospDispFlag,
        caution: data.nhpiHospCaution,
        value: data.nhpiPctHosp,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      test: {
        disparity: data.nhpiTestDispFlag,
        caution: data.nhpiTestCaution,
        value: data.nhpiPctTest,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      death: {
        disparity: data.nhpiDeathDispFlag,
        caution: data.nhpiDeathCaution,
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
        caution: data.aianPosCaution,
        value: data.aianPctPos,
        note: {
          value: notes.aianPos,
          index: groupedNotes.indexOf(notes.aianPos),
        },
      },
      hospitalization: {
        disparity: data.aianHospDispFlag,
        caution: data.aianHospCaution,
        value: data.aianPctHosp,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      test: {
        disparity: data.aianTestDispFlag,
        caution: data.aianTestCaution,
        value: data.aianPctTest,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      death: {
        disparity: data.aianDeathDispFlag,
        caution: data.aianDeathCaution,
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
        caution: data.twoPosCaution,
        value: data.twoPctPos,
        note: {
          value: notes.twoPos,
          index: groupedNotes.indexOf(notes.twoPos),
        },
      },
      hospitalization: {
        disparity: data.twoHospDispFlag,
        caution: data.twoHospCaution,
        value: data.twoPctHosp,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      test: {
        disparity: data.twoTestDispFlag,
        caution: data.twoTestCaution,
        value: data.twoPctTest,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      death: {
        disparity: data.twoDeathDispFlag,
        caution: data.twoDeathCaution,
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
        caution: data.whitePosCaution,
        value: data.whitePctPos,
        note: {
          value: notes.whitePos,
          index: groupedNotes.indexOf(notes.whitePos),
        },
      },
      hospitalization: {
        disparity: data.whiteHospDispFlag,
        caution: data.whiteHospCaution,
        value: data.whitePctHosp,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      test: {
        disparity: data.whiteTestDispFlag,
        caution: data.whiteTestCaution,
        value: data.whitePctTest,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      death: {
        disparity: data.whiteDeathDispFlag,
        caution: data.whiteDeathCaution,
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
        caution: data.otherPosCaution,
        value: data.otherPctPos,
        note: {
          value: notes.otherPos,
          index: groupedNotes.indexOf(notes.otherPos),
        },
      },
      hospitalization: {
        disparity: data.otherHospDispFlag,
        caution: data.otherHospCaution,
        value: data.otherPctHosp,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      test: {
        disparity: data.otherTestDispFlag,
        caution: data.otherTestCaution,
        value: data.otherPctTest,
        note: {
          value: undefined,
          index: undefined,
        },
      },
      death: {
        disparity: data.otherDeathDispFlag,
        caution: data.otherDeathCaution,
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
      rows={rows.filter(
        row => !isInEthnicityState || !row.hideInEthnicityState,
      )}
      data={data}
      type={type}
      noPositives={noPositives}
      noDeaths={noDeaths}
      noTests={!data.anyTestData}
      noHospitalizations={!data.anyHospData}
    />
  )
}

export default RaceTable
