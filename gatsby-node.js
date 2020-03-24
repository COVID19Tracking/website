const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    createNodeField({
      node,
      name: `isPage`,
      value: node.fileAbsolutePath.search('content/pages/') > -1,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { isPage: { eq: true } } }) {
        edges {
          node {
            id
            html
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
      allMdx(filter: { fields: { isPage: { eq: true } } }) {
        edges {
          node {
            id
            body
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/content.js`),
      context: {
        page: node,
        isMdx: false,
      },
    })
  })

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/content.js`),
      context: {
        page: node,
        isMdx: true,
      },
    })
  })
}
