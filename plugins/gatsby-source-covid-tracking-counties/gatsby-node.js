const fs = require('fs')
const crypto = require('crypto')
const parse = require('csv-parse/lib/sync')

exports.sourceNodes = ({ actions, createNodeId, reporter }, configOptions) => {
  return new Promise((resolve, reject) => {
    const { createNode } = actions
    const countyResults = {}
    const demographics = require(configOptions.demographics)
    const counties = JSON.parse(fs.readFileSync(configOptions.counties))
    counties.forEach(county => {
      const fipsKey =
        !county.fips && county.county === 'New York City' ? 'nyc' : county.fips
      if (typeof countyResults[fipsKey] === 'undefined') {
        countyResults[fipsKey] = {
          name: county.county,
          state: county.state,
          fips: fipsKey,
          current: county,
          demographics: demographics.find(element => element.fips === fipsKey),
        }
      }
    })
    Object.keys(countyResults).forEach(fips => {
      const county = countyResults[fips]
      const digest = crypto
        .createHash('md5')
        .update(JSON.stringify(county))
        .digest('hex')
      const nodeTemplate = {
        id: createNodeId(`${configOptions.type}.${fips}`),
        children: [],
        parent: null,
        internal: {
          type: configOptions.type,
          contentDigest: digest,
        },
      }

      createNode({ ...county, ...nodeTemplate })
    })
    if (Object.keys(countyResults).length < 1000) {
      reject('There were not enough counties fetched')
    }
    reporter.success(`Imported ${Object.keys(countyResults).length} counties`)
    resolve()
  })
}
