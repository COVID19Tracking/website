const fs = require('fs')
const crypto = require('crypto')
const slugify = require('slugify')

exports.sourceNodes = async (
  { actions, createNodeId, reporter },
  configOptions,
) => {
  const { createNode } = actions
  const { file, sortField, type, increaseFields } = configOptions

  try {
    fs.statSync(file)
  } catch {
    reporter.error(
      `There is no file ${file}. 
    
Make sure to run "npm run setup" to clone the most recent version of the COVID API files.`,
    )
    return
  }

  const items = JSON.parse(fs.readFileSync(file))
  if (increaseFields && increaseFields.length) {
    items.sort((a, b) => (a.date > b.date ? 1 : -1))
  }
  const priorItems = {}
  items.forEach((item, index) => {
    if (increaseFields && increaseFields.length) {
      increaseFields.forEach(field => {
        if (typeof priorItems[item.state] === 'undefined') {
          priorItems[item.state] = {}
        }
        if (typeof priorItems[item.state][field] === 'undefined') {
          priorItems[item.state][field] = 0
        }
        item[`${field}Increase`] = item[field] - priorItems[item.state][field]
        priorItems[item.state][field] = item[field]
      })
    }
    if (sortField) {
      item._sort = slugify(item[sortField], {
        strict: true,
        lower: true,
      })
    }
    const digest = crypto
      .createHash('md5')
      .update(JSON.stringify(item))
      .digest('hex')

    const nodeTemplate = {
      id: createNodeId(`${type}.${index}`),
      children: [],
      parent: null,
      internal: {
        type: type,
        contentDigest: digest,
      },
    }

    createNode({ ...item, ...nodeTemplate })
  })
}
