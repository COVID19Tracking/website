// const _ = require('lodash/fp')
const parser = require('fast-xml-parser')
const { fetchXml } = require('./fetch')

// const xml2js = require('xml2js') // TOO SLOW - RESOURCE INTENSE
// const parser = new xml2js.Parser({
//   explicitArray: false,
//   explicitRoot: false,
//   ignoreAttrs: true,
//   mergeAttrs: true,
//   tagNameProcessors: [_.camelCase],
// })

function parse(xmlText, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      resolve(parser.parse(xmlText, options, true))
    } catch (err) {
      reject(err)
    }
  })
}

function getXml({ url }) {
  // console.log(url)
  return fetchXml(url).then(parse)
}

module.exports = getXml
