const categories = ['nh', 'alf', 'lumpedother']

const getTotals = state => {
  let totalCases = null
  let totalDeath = null
  let totalFacilities = null
  categories.forEach(category => {
    if (state[`outbrkfac_${category}`]) {
      totalFacilities = state[`outbrkfac_${category}`]
    }
    if (
      state[`posresstaff_${category}`] ||
      state[`probposresstaff_${category}`]
    ) {
      if (state[`posresstaff_${category}`]) {
        totalCases += state[`posresstaff_${category}`]
      }
      if (state[`probposresstaff_${category}`]) {
        totalCases += state[`probposresstaff_${category}`]
      }
    } else {
      if (state[`posres_${category}`]) {
        totalCases += state[`posres_${category}`]
      }
      if (state[`probposres_${category}`]) {
        totalCases += state[`probposres_${category}`]
      }
      if (state[`posstaff_${category}`]) {
        totalCases += state[`posstaff_${category}`]
      }
      if (state[`probposstaff_${category}`]) {
        totalCases += state[`probposstaff_${category}`]
      }
    }
    if (
      state[`deathresstaff_${category}`] ||
      state[`probdeathresstaff_${category}`]
    ) {
      if (state[`deathresstaff_${category}`]) {
        totalDeath += state[`deathresstaff_${category}`]
      }
      if (state[`probdeathresstaff_${category}`]) {
        totalDeath += state[`probdeathresstaff_${category}`]
      }
    } else {
      if (state[`deathres_${category}`]) {
        totalDeath += state[`deathres_${category}`]
      }
      if (state[`probdeathres_${category}`]) {
        totalDeath += state[`probdeathres_${category}`]
      }
      if (state[`deathstaff_${category}`]) {
        totalDeath += state[`deathstaff_${category}`]
      }
      if (state[`probdeathstaff_${category}`]) {
        totalDeath += state[`probdeathstaff_${category}`]
      }
    }
  })

  return { totalCases, totalDeath, totalFacilities }
}

module.exports = getTotals
