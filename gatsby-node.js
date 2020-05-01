const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')
const slugify = require('slugify')
const objectHash = require('object-hash')

exports.create

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  if (typeof process.env.DEV_ENVIRONMENT_VARIABLE_FILE !== 'undefined') {
    createRedirect({
      fromPath: '/__developer/env-vars',
      toPath: process.env.DEV_ENVIRONMENT_VARIABLE_FILE,
      statusCode: 200,
    })
  }

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
      allContentfulBlogCategory {
        edges {
          node {
            slug
            id
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

  result.data.allContentfulBlogCategory.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/category/${node.slug}`,
      component: path.resolve(`./src/templates/blog-category.js`),
      context: node,
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, actions, loaders, getConfig }) => {
  const { setWebpackConfig } = actions
  if (stage === 'build-javascript') {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(
      plugin => plugin.constructor.name === 'MiniCssExtractPlugin',
    )
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }

  if (stage === 'build-html') {
    setWebpackConfig({
      module: {
        rules: [
          {
            test: /swagger-ui/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
