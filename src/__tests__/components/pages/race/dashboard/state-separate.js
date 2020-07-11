import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import StateSeparate from '~components/pages/race/dashboard/state-separate'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    disparityNote: {
      contentful_id: 'aNeWRaNdoMSTrinG',
      childContentfulSnippetContentTextNode: {
        childMarkdownRemark: {
          html: '<h2>Content</h2><p>More disparity snippet content</p>',
        },
      },
    },
    comparibleNote: {
      contentful_id: 'RaNdoMSTrinG',
      childContentfulSnippetContentTextNode: {
        childMarkdownRemark: {
          html: '<h2>Content</h2><p>More comparible snippet content</p>',
        },
      },
    },
  }))
})

describe('Components : Pages : Race : Dashboard : State Separate', () => {
  it('renders correctly', () => {
    const state = {
      aianDeathNotes: 'Race notes: aianDeath',
      aianPosNotes: 'Race notes: aianPos',
      aianSpecialCaseNotes: 'Race notes: aianSpecialCase',
      anyDeathData: true,
      anyPosData: true,
      asianDeathNotes: 'Race notes: asianDeath',
      asianPosNotes: 'Race notes: asianPos',
      asianSpecialCaseNotes: 'Race notes: asianSpecialCase',
      blackDeathNotes: 'Race notes: blackDeath',
      blackPosNotes: 'Race notes: blackPos',
      blackSpecialCaseNotes: 'Race notes: blackSpecialCase',
      deathEthData: false,
      deathRaceData: true,
      latinXDeathNotes: 'Race notes: latinXDeath',
      latinXPosNotes: 'Race notes: latinXPos',
      latinXSpecialCaseNotes: 'Race notes: latinXSpecialCase',
      name: 'Alabama',
      nhpiDeathNotes: 'Race notes: nhpiDeath',
      nhpiPctPop: 0.36,
      nhpiPctPos: 0.263,
      nhpiPosCaution: true,
      nhpiPosDispFlag: false,
      nhpiPosNotes: 'Race notes: nhpiPos',
      nhpiSpecialCaseNotes: 'Race notes: nhpiSpecialCase',
      nonhispanicDeathNotes: 'Race notes: nonhispanicDeath',
      nonhispanicPosNotes: 'Race notes: nonhispanicPos',
      nonhispanicSpecialCaseNotes: 'Race notes: nonhispanicSpecialCase',
      otherDeathCaution: true,
      otherDeathDispFlag: false,
      otherDeathNotes: 'Race notes: otherDeath',
      otherPctDeath: 0.123,
      otherPctPop: 0.31,
      otherPctPos: 0.857,
      otherPosCaution: true,
      otherPosDispFlag: false,
      otherPosNotes: 'Race notes: otherPos',
      otherSpecialCaseNotes: 'Race notes: otherSpecialCase',
      posEthData: true,
      posRaceData: false,
      state: 'AL',
      twoDeathCaution: true,
      twoDeathDispFlag: false,
      twoDeathNotes: 'Race notes: twoDeath',
      twoPctDeath: 'twoPctDeath',
      twoPctPop: 0.989,
      twoPctPos: 0.379,
      twoPosCaution: true,
      twoPosDispFlag: false,
      twoPosNotes: 'Race notes: twoPos',
      twoSpecialCaseNotes: 'Race notes: twoSpecialCase',
      whiteDeathCaution: true,
      whiteDeathDispFlag: false,
      whiteDeathNotes: 'Race notes: whiteDeath',
      whitePctDeath: 'whitePctDeath',
      whitePctPop: 0.033,
      whitePctPos: 0.787,
      whitePosCaution: true,
      whitePosDispFlag: false,
      whitePosNotes: 'Race notes: whitePos',
      whiteSpecialCaseNotes: 'Race notes: whiteSpecialCase',
    }
    const tree = renderer.create(<StateSeparate state={state} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly', () => {
    const state = {
      anyPosData: false,
      anyDeathData: false,
    }
    const noDataTree = renderer.create(<StateSeparate state={state} />).toJSON()
    expect(noDataTree).toMatchSnapshot()
  })
})
