import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import StateCombined from '~components/pages/race/dashboard/state-combined'

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

describe('Components : Pages : Race : Dashboard : State Combined', () => {
  it('renders correctly', () => {
    const state = {
      aianDeathCaution: true,
      aianDeathDispFlag: false,
      aianDeathNotes: 'Sample Sample aianDeath notes.',
      aianPctDeath: 'aianPctDeath',
      aianPctPop: 0.786,
      aianPctPos: 0.599,
      aianPosCaution: true,
      aianPosDispFlag: false,
      aianPosNotes: 'Sample Sample aianPos notes.',
      anyDeathData: true,
      anyPosData: true,
      asianDeathCaution: true,
      asianDeathDispFlag: false,
      asianDeathNotes: null,
      asianPctDeath: 'asianPctDeath',
      asianPctPop: 0.849,
      asianPctPos: 0.524,
      asianPosCaution: true,
      asianPosDispFlag: false,
      asianPosNotes: 'Sample Sample asianPos notes.',
      blackDeathCaution: true,
      blackDeathDispFlag: false,
      blackDeathNotes: null,
      blackPctDeath: 'blackPctDeath',
      blackPctPop: 0.22,
      blackPctPos: 0.025,
      blackPosCaution: true,
      blackPosDispFlag: false,
      blackPosNotes: 'Sample Sample blackPos notes.',
      latinXDeathDispFlag: false,
      latinXDeathNotes: 'Sample Sample latinXDeath notes.',
      latinXPctDeath: 'latinXPctDeath',
      latinXPctPop: 0.745,
      latinXPctPos: 0.121,
      latinXPosCaution: true,
      latinXPosDispFlag: false,
      latinXPosNotes: 'Sample Sample latinXPos notes.',
      name: 'Alabama',
      nhpiDeathCaution: true,
      nhpiDeathDispFlag: false,
      nhpiDeathNotes: 'Sample Sample nhpiDeath notes.',
      nhpiPctDeath: 'nhpiPctDeath',
      nhpiPctPop: 0.36,
      nhpiPctPos: 0.263,
      nhpiPosCaution: true,
      nhpiPosDispFlag: false,
      nhpiPosNotes: 'Sample Sample nhpiPos notes.',
      otherDeathCaution: true,
      otherDeathDispFlag: false,
      otherDeathNotes: 'Sample Sample otherDeath notes.',
      otherPctDeath: 0.123,
      otherPctPop: 0.31,
      otherPctPos: 0.857,
      otherPosCaution: true,
      otherPosDispFlag: false,
      otherPosNotes: 'Sample Sample otherPos notes.',
      state: 'AL',
      twoDeathCaution: true,
      twoDeathDispFlag: false,
      twoDeathNotes: 'Sample Sample twoDeath notes.',
      twoPctDeath: 'twoPctDeath',
      twoPctPop: 0.989,
      twoPctPos: 0.379,
      twoPosCaution: true,
      twoPosDispFlag: false,
      twoPosNotes: 'Sample Sample twoPos notes.',
      whiteDeathCaution: true,
      whiteDeathDispFlag: false,
      whiteDeathNotes: null,
      whitePctDeath: 'whitePctDeath',
      whitePctPop: 0.033,
      whitePctPos: 0.787,
      whitePosCaution: true,
      whitePosDispFlag: false,
      whitePosNotes: 'Sample Sample whitePos notes.',
    }
    const tree = renderer.create(<StateCombined state={state} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
