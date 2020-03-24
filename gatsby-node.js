const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')
const slugify = require('slugify')

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
              navigation
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
              navigation
            }
            fields {
              slug
            }
          }
        }
      }
      allNavigationYaml {
        edges {
          node {
            name
            items {
              title
              link
            }
          }
        }
      }
      allCovidStateInfo(sort: { fields: state }) {
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
    }
  `)
  // Store all the navigation items into an object for later use
  const navigation = {}
  result.data.allNavigationYaml.edges.forEach(({ node }) => {
    navigation[node.name] = node.items
  })

  // Create all the pages based on Markdown files in src/content/pages
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/content.js`),
      context: {
        page: node,
        navigation:
          node.frontmatter.navigation &&
          typeof navigation[node.frontmatter.navigation] !== 'undefined'
            ? navigation[node.frontmatter.navigation]
            : [],
        isMdx: false,
      },
    })
  })

  // Create all the pages based on MDX files in src/content/pages
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/content.js`),
      context: {
        page: node,
        navigation:
          node.frontmatter.navigation &&
          typeof navigation[node.frontmatter.navigation] !== 'undefined'
            ? navigation[node.frontmatter.navigation]
            : [],
        isMdx: true,
      },
    })
  })

  result.data.allCovidStateInfo.edges.forEach(({ node }) => {
    createPage({
      path: `/data/state/${slugify(node.name, { strict: true, lower: true })}`,
      component: path.resolve(`./src/templates/state.js`),
      context: node,
    })
  })
}
