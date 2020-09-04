const crypto = require('crypto')
const slugify = require('slugify')

const onCreateNode = async (
  { node, actions, createNodeId, createContentDigest },
  configOptions,
) => {
  const { createNode, createParentChildLink } = actions
  const { field, type } = configOptions

  if (node.internal.type !== type) {
    return
  }

  const digest = crypto
    .createHash('md5')
    .update(`${node[field]}-slug`)
    .digest('hex')

  const slugNode = {
    id: createNodeId(`${node.id}.slug >>> SLUG`),
    children: [],
    parent: node.id,
    slug: slugify(node[field], { strict: true, lower: true }),
    internal: {
      contentDigest: createContentDigest(digest),
      type: 'slug',
    },
  }

  createNode(slugNode)
  createParentChildLink({ parent: node, child: slugNode })

  return null
}

exports.onCreateNode = onCreateNode
