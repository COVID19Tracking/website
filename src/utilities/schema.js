module.exports = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type CovidScreenshot implements Node {
      dateChecked: String
    }
    type allCovidStateDaily implements Node {
      date: String
    }
    type allCovidUsDaily implements Node {
      date: String
    }
    type CovidRaceDataSeparate implements Node {
      blackANHPIPosNotes: String
      blackANHPIDeathNotes: String
      blackPosNotes: String
      blackDeathNotes: String
      blackSpecialCaseNotes: String
      asianANHPIPosNotes: String
      asianANHPIDeathNotes: String
      asianPosNotes: String
      asianDeathNotes: String
      asianSpecialCaseNotes: String
      aianANHPIPosNotes: String
      aianANHPIDeathNotes: String
      aianPosNotes: String
      aianDeathNotes: String
      aianSpecialCaseNotes: String
      nhpiANHPIPosNotes: String
      nhpiANHPIDeathNotes: String
      nhpiPosNotes: String
      nhpiDeathNotes: String
      nhpiSpecialCaseNotes: String
      twoANHPIPosNotes: String
      twoANHPIDeathNotes: String
      twoPosNotes: String
      twoDeathNotes: String
      twoSpecialCaseNotes: String
      whiteANHPIPosNotes: String
      whiteANHPIDeathNotes: String
      whitePosNotes: String
      whiteDeathNotes: String
      whiteSpecialCaseNotes: String
      otherANHPIPosNotes: String
      otherANHPIDeathNotes: String
      otherPosNotes: String
      otherDeathNotes: String
      otherSpecialCaseNotes: String
      latinXANHPIPosNotes: String
      latinXANHPIDeathNotes: String
      latinXPosNotes: String
      latinXDeathNotes: String
      nonhispanicANHPIPosNotes: String
      nonhispanicANHPIDeathNotes: String
      nonhispanicPosNotes: String
      nonhispanicDeathNotes: String
      nonhispanicSpecialCaseNotes: String
    }

    type CovidRaceDataCombined implements Node {
      aianANHPIDeathNotes: String
      aianANHPIPosNotes: String
      aianDeathNotes: String
      aianPosNotes: String
      asianANHPIDeathNotes: String
      asianANHPIPosNotes: String
      asianDeathNotes: String
      asianPosNotes: String
      blackANHPIDeathNotes: String
      blackANHPIPosNotes: String
      blackDeathNotes: String
      blackPosNotes: String
      latinXANHPINotes: String
      latinXDeathNotes: String
      latinXPosNotes: String
      nhpiANHPIDeathNotes: String
      nhpiANHPIPosNotes: String
      nhpiDeathNotes: String
      nhpiPosNotes: String
      otherANHPIDeathNotes: String
      otherANHPIPosNotes: String
      otherDeathNotes: String
      otherPosNotes: String
      twoANHPIDeathNotes: String
      twoANHPIPosNotes: String
      twoDeathNotes: String
      twoPosNotes: String
      whiteANHPIDeathNotes: String
      whiteANHPIPosNotes: String
      whiteDeathNotes: String
      whitePosNotes: String
    }
  `
  createTypes(typeDefs)
}
