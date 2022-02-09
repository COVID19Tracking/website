const path = require('path')
const csv = require('./src/utilities/csv')
const createSchemaCustomization = require('./src/utilities/schema')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  if (
    typeof process.env.DEV_ENVIRONMENT_VARIABLE_FILE !== 'undefined' &&
    process.env.DEV_ENVIRONMENT_VARIABLE_FILE != 'false'
  ) {
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
        nodes {
          covid19Site
          covid19SiteSecondary
          covid19SiteTertiary
          name
          state
          twitter
          childSlug {
            slug
          }
        }
      }
      allContentfulPage {
        nodes {
          id
          slug
        }
      }
      allContentfulDocument {
        nodes {
          id
          slug
          document {
            file {
              url
            }
          }
        }
      }
      allContentfulBlogPost(sort: { fields: updatedAt }) {
        nodes {
          id
          contentful_id
          slug
          overrideBlogPage
          overrideBlogPath
          publishDate(formatString: "YYYY-MM-DD")
        }
      }
      allContentfulBlogCategory {
        nodes {
          slug
          id
        }
      }
      allContentfulChart {
        nodes {
          id
          slug
        }
      }
      allContentfulRedirect {
        nodes {
          from
          redirectTo
        }
      }
      allCovidGradeExcludedStates {
        nodes {
          state
        }
      }
    }
  `)

  result.data.allContentfulBlogPost.nodes.forEach(node => {
    const longPath = `/analysis-updates/${node.slug}`
    const shortPath = `/${node.contentful_id}`

    if (node.overrideBlogPage) {
      createRedirect({
        fromPath: shortPath,
        toPath: node.overrideBlogPath,
        isPermanent: true,
      })
    } else {
      createPage({
        path: longPath,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: node,
      })
      createPage({
        path: `/analysis-updates/pdf/${node.publishDate}-${node.slug}`,
        component: path.resolve(`./src/templates/blog-pdf.js`),
        context: node,
      })

      createRedirect({
        fromPath: shortPath,
        toPath: longPath,
        isPermanent: true,
      })
    }
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
            test: /react-scrollama/,
            use: loaders.null(),
          },
          {
            test: /mapbox-gl/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createSchemaCustomization = createSchemaCustomization

exports.onPostBuild = async ({ graphql, reporter }) => {
  await csv(graphql, reporter)
}
