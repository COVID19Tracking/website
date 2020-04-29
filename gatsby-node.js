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

    createRedirect({
      fromPath: `/api/states state=${node.state}`,
      toPath: `/api/v1/states/${node.state.toLowerCase()}/current.json`,
      isPermanent: true,
    })

    createRedirect({
      fromPath: `/api/states/daily.csv state=${node.state}`,
      toPath: `/api/v1/states/${node.state.toLowerCase()}/current.csv`,
      isPermanent: true,
    })
  })

  result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: node,
    })
  })

  createRedirect({
    fromPath: `/api/states*`,
    toPath: `/.netlify/functions/api-proxy/states:splat`,
    isPermanent: true,
  })

  createRedirect({
    fromPath: `/api/us*`,
    toPath: `/.netlify/functions/api-proxy/us:splat`,
    isPermanent: true,
  })
  createRedirect({
    fromPath: `/api/states`,
    toPath: `/api/v1/states/current.json`,
    isPermanent: true,
  })
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
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
}
