const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')
const slugify = require('slugify')
const objectHash = require('object-hash')

exports.onCreateNode = ({ node, getNode, createNodeId, actions }) => {
  const { createNodeField, createNode } = actions
  if (node.internal.type === 'covid__screenshots') {
    Object.keys(node).forEach(key => {
      if (
        ['alternative_id', 'children', 'id', 'internal', 'parent'].indexOf(
          key,
        ) > -1
      ) {
        return
      }
      node[key].forEach(screenshot => {
        const node = {
          id: createNodeId(`covidScreenshot >>> ${screenshot.url}`),
          children: [],
          parent: null,
          internal: {
            type: `covidScreenshot`,
            contentDigest: objectHash(screenshot),
          },
        }
        createNode({ ...node, ...screenshot })
      })
    })
  }
  if (
    (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) &&
    typeof node.fileAbsolutePath !== 'undefined'
  ) {
    const slug = createFilePath({ node, getNode, basePath: `content` })
    if (!slug) {
      return
    }
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
      allCovidStateInfo(
        filter: { name: { ne: null } }
        sort: { fields: state }
      ) {
        edges {
          node {
            covid19Site
            covid19SiteSecondary
            notes
            name
            state
            twitter
          }
        }
      }
      allContentfulPage {
        edges {
          node {
            id
            slug
          }
        }
      }
      allContentfulBlogPost(sort: { fields: updatedAt }) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  // Create all the pages based on Markdown files in src/content/pages
  result.data.allContentfulPage.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/content.js`),
      context: node,
    })
  })

  result.data.allCovidStateInfo.edges.forEach(({ node }) => {
    createPage({
      path: `/data/state/${slugify(node.name, { strict: true, lower: true })}`,
      component: path.resolve(`./src/templates/state.js`),
      context: node,
    })
  })

  result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: node,
    })
  })
}
