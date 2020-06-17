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
      `There is no file ${configOptions.file}. 
    
Make sure to run "npm run setup" to clone the most recent version of the COVID API files.`,
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
