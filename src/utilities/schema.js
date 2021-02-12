module.exports = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ltcCurrent implements Node {
      total_cases: Int
      total_death: Int
      outbrkfac_alf: Int
      outbrkfac_ltc: Int
      outbrkfac_other: Int
      outbrkfac_nh: Int
    }
    type CovidLtcFacilities implements Node {
      outbreak_resident_deaths: String
      outbreak_resident_positives: String
      outbreak_resident_probable: String
      outbreak_resident_probable_deaths: String
      outbreak_resident_staff_deaths: String
      outbreak_resident_staff_positives: String
      outbreak_residents_tested: String
      outbreak_staff_deaths: String
      outbreak_staff_positive: String
      outbreak_staff_probable: String
      resident_census: String
      resident_deaths: String
      resident_positives: String
      resident_probable: String
      resident_probable_deaths: String
      resident_staff_deaths: String
      resident_staff_positives: String
      resident_staff_probable_deaths: String
    }
    type CovidLtcStates implements Node {
      data_timestamp: String
      data_type: String
      posres_nh: Int
      probposres_nh: Int
      deathres_nh: Int
      probdeathres_nh: Int
      posstaff_nh: Int
      probposstaff_nh: Int
      deathstaff_nh: Int
      probdeathstaff_nh: Int
      posresstaff_nh: Int
      probposresstaff_nh: Int
      deathresstaff_nh: Int
      probdeathresstaff_nh: Int
      outbrkfac_nh: Int
      testedfac_nh: Int
      outrkfactestsconducted_nh: Int
      testedres_nh: Int
      testedstaff_nh: Int
      posres_alf: Int
      probposres_alf: Int
      deathres_alf: Int
      probdeathres_alf: Int
      posstaff_alf: Int
      probposstaff_alf: Int
      deathstaff_alf: Int
      probdeathstaff_alf: Int
      posresstaff_alf: Int
      probposresstaff_alf: Int
      deathresstaff_alf: Int
      probdeathresstaff_alf: Int
      outbrkfac_alf: Int
      testedfac_alf: Int
      outrkfactestsconducted_alf: Int
      testedres_alf: Int
      testedstaff_alf: Int
      posres_ltc: Int
      probposres_ltc: Int
      deathres_ltc: Int
      probdeathres_ltc: Int
      posstaff_ltc: Int
      probposstaff_ltc: Int
      deathstaff_ltc: Int
      probdeathstaff_ltc: Int
      posresstaff_ltc: Int
      probposresstaff_ltc: Int
      deathresstaff_ltc: Int
      probdeathresstaff_ltc: Int
      outbrkfac_ltc: Int
      testedfac_ltc: Int
      outrkfactestsconducted_ltc: Int
      testedres_ltc: Int
      testedstaff_ltc: Int
      posres_other: Int
      probposres_other: Int
      deathres_other: Int
      probdeathres_other: Int
      posstaff_other: Int
      probposstaff_other: Int
      deathstaff_other: Int
      probdeathstaff_other: Int
      posresstaff_other: Int
      probposresstaff_other: Int
      deathresstaff_other: Int
      probdeathresstaff_other: Int
      outbrkfac_other: Int
      testedfac_other: Int
      outrkfactestsconducted_other: Int
      testedres_other: Int
      testedstaff_other: String

    }
    type CovidScreenshot implements Node {
      dateChecked: String
    }
    type allCovidStateDaily implements Node {
      date: Date
    }
    type allCovidUsDaily implements Node {
      date: Date
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
    type CovidRaceHospTestDataSeparate implements Node {
      nhpiPctTest: Float
      twoPctTest: Float
      aianPctTest: Float
    }
  `
  createTypes(typeDefs)
}
