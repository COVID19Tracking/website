const crypto = require('crypto')

const onCreateNode = async (
  { node, actions, createNodeId, createContentDigest },
  configOptions,
) => {
  const { createNode, createParentChildLink } = actions
  const { type } = configOptions

  if (node.internal.type !== type) {
    return
  }

  const digest = crypto
    .createHash('md5')
    .update(`${node.id}`)
    .digest('hex')

  const sortNode = {
    id: createNodeId(`${node.id}.sort >>> SORT`),
    children: [],
    parent: node.id,
    sort: Math.random(),
    internal: {
      contentDigest: createContentDigest(digest),
      type: 'randomSort',
    },
  }

  createNode(sortNode)
  createParentChildLink({ parent: node, child: sortNode })

  return null
}

exports.onCreateNode = onCreateNode
