const fs = require('fs')
const crypto = require('crypto')
const slugify = require('slugify')

exports.sourceNodes = async (
  { actions, createNodeId, reporter },
  configOptions,
) => {
  const { createNode } = actions

  try {
    fs.statSync(configOptions.file)
  } catch {
    reporter.error(
      `There is no file ${configOptions.file} directory. 
    
If you are developing on your local computer, be sure to download the latest data archive here: http://covidtracking.com/api/archive.tar.gz. Then expand it to the directory "_data".`,
    )
    return
  }

  const items = JSON.parse(fs.readFileSync(configOptions.file))
  items.forEach((item, index) => {
    if (configOptions.sortField) {
      item._sort = slugify(item[configOptions.sortField], {
        strict: true,
        lower: true,
      })
    }
    const digest = crypto
      .createHash('md5')
      .update(JSON.stringify(item))
      .digest('hex')

    const nodeTemplate = {
      id: createNodeId(`${configOptions.type}.${index}`),
      children: [],
      parent: null,
      internal: {
        type: configOptions.type,
        contentDigest: digest,
      },
    }

    createNode({ ...item, ...nodeTemplate })
  })
}
