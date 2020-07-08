import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import {
  RaceTable,
  EthnicityTable,
} from '~components/pages/race/dashboard/breakdown-tables'

const notes = {
  otherDeath: 'otherDeathNotes',
  otherPos: 'otherPosNotes',
  whiteDeath: 'whiteDeathNotes',
  whitePos: 'whitePosNotes',
  twoDeath: 'twoDeathNotes',
  twoPos: 'twoPosNotes',
  aianDeath: 'aianDeathNotes',
  aianPos: 'aianPosNotes',
  nhpiDeath: 'nhpiDeathNotes',
  nhpiPos: 'nhpiPosNotes',
  asianDeath: 'asianDeathNotes',
  asianPos: 'asianPosNotes',
  latinXDeath: 'latinXDeathNotes',
  latinXPos: 'latinXPosNotes',
  blackDeath: 'blackDeathNotes',
  blackPos: 'blackPosNotes',
}

const groupedNotes = [
  'blackPosNotes',
  'blackDeathNotes',
  'latinXPosNotes',
  'latinXDeathNotes',
  'asianPosNotes',
  'asianDeathNotes',
  'nhpiPosNotes',
  'nhpiDeathNotes',
  'aianPosNotes',
  'aianDeathNotes',
  'twoPosNotes',
  'twoDeathNotes',
  'whitePosNotes',
  'whiteDeathNotes',
  'otherPosNotes',
  'otherDeathNotes',
]

describe('Components : Pages : Race : Dashboard : Race Table', () => {
  it('renders correctly', () => {
    const data = {
      blackPctPop: 0.22,
      blackPosDispFlag: false,
      blackPosCaution: true,
      blackPctPos: 0.025,
      blackDeathDispFlag: false,
      blackDeathCaution: true,
      blackPctDeath: 'blackPctDeath',
      latinXPctPop: 0.745,
      latinXPosDispFlag: false,
      latinXPosCaution: true,
      latinXPctPos: 0.121,
      latinXDeathDispFlag: false,
      latinXPctDeath: 'latinXPctDeath',
      asianPctPop: 0.849,
      asianPosDispFlag: false,
      asianPosCaution: true,
      asianPctPos: 0.524,
      asianDeathDispFlag: false,
      asianDeathCaution: true,
      asianPctDeath: 'asianPctDeath',
      nhpiPctPop: 0.36,
      nhpiPosDispFlag: false,
      nhpiPosCaution: true,
      nhpiPctPos: 0.263,
      nhpiDeathDispFlag: false,
      nhpiDeathCaution: true,
      nhpiPctDeath: 'nhpiPctDeath',
      aianPctPop: 0.786,
      aianPosDispFlag: false,
      aianPosCaution: true,
      aianPctPos: 0.599,
      aianDeathDispFlag: false,
      aianDeathCaution: true,
      aianPctDeath: 'aianPctDeath',
      twoPctPop: 0.989,
      twoPosDispFlag: false,
      twoPosCaution: true,
      twoPctPos: 0.379,
      twoDeathDispFlag: false,
      twoDeathCaution: true,
      twoPctDeath: 'twoPctDeath',
      whitePctPop: 0.033,
      whitePosDispFlag: false,
      whitePosCaution: true,
      whitePctPos: 0.787,
      whiteDeathDispFlag: false,
      whiteDeathCaution: true,
      whitePctDeath: 'whitePctDeath',
      otherPctPop: 0.31,
      otherPosDispFlag: false,
      otherPosCaution: true,
      otherPctPos: 0.857,
      otherDeathDispFlag: false,
      otherDeathCaution: true,
      otherPctDeath: 'otherPctDeath',
    }
    const combinedTree = renderer
      .create(
        <RaceTable
          data={data}
          type={'Type'}
          notes={notes}
          groupedNotes={groupedNotes}
          noPositives={true}
          isCombined={true}
          noDeaths={true}
          isInEthnicityState={true}
        />,
      )
      .toJSON()
    expect(combinedTree).toMatchSnapshot()
    const uncombinedTree = renderer
      .create(
        <RaceTable
          data={data}
          type={'Type'}
          notes={notes}
          groupedNotes={groupedNotes}
          noPositives={true}
          isCombined={false}
          noDeaths={true}
          isInEthnicityState={true}
        />,
      )
      .toJSON()
    expect(uncombinedTree).toMatchSnapshot()
  })
})

describe('Components : Pages : Race : Dashboard : Ethnicity Table', () => {
  it('renders correctly', () => {
    const data = {
      latinXPctPop: 0.907,
      latinXPosDispFlag: false,
      latinXPctPos: 0.544,
      latinXDeathDispFlag: true,
      latinXPctDeath: 0.648,
      nonhispanicPctPop: 0.001,
      nonhispanicPosDispFlag: false,
      nonhispanicPctPos: 0.885,
      nonhispanicDeathDispFlag: true,
      nonhispanicPctDeath: 0.28,
    }

    const tree = renderer
      .create(
        <EthnicityTable
          data={data}
          type={'Type'}
          notes={notes}
          groupedNotes={groupedNotes}
          noPositives={true}
          isCombined={true}
          noDeaths={true}
          isInEthnicityState={true}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
