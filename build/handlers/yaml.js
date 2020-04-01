const yaml = require('js-yaml')
const { fetchYaml } = require('./fetch')

function getYaml({ args, multi, url }) {
  return fetchYaml(url).then(text => {
    try {
      if (!multi) return yaml.safeLoad(text, args)
      const items = []
      const addItem = item => items.push(item)
      yaml.safeLoadAll(text, addItem, args)
      return items
    } catch (err) {
      return {
        error: true,
        ...err,
      }
    }
  })
}

module.exports = getYaml
