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
    }
  `)

  const posts = result.data.allContentfulBlogPost.nodes
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/analysis-updates` : `/analysis-updates/page/${i + 1}`,
      component: path.resolve('./src/templates/blog-page.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  result.data.allContentfulPage.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/content.js`),
      context: node,
    })
  })

  result.data.allContentfulDocument.nodes.forEach(node => {
    createPage({
      path: `/document/${node.slug}`,
      component: path.resolve(`./src/templates/document.js`),
      context: node,
    })
    createRedirect({
      fromPath: `/document/download/${node.slug}`,
      toPath: node.document.file.url,
      isPermanent: true,
    })
  })

  result.data.allContentfulRedirect.nodes.forEach(({ from, redirectTo }) => {
    createRedirect({
      fromPath: from,
      toPath: redirectTo,
      isPermanent: true,
    })
  })

  result.data.allContentfulChart.nodes.forEach(node => {
    createPage({
      path: `/data/charts/${node.slug}`,
      component: path.resolve(`./src/templates/chart.js`),
      context: node,
    })
  })

  result.data.allCovidStateInfo.nodes.forEach(node => {
    const { slug } = node.childSlug

    createPage({
      path: `/data/state/${slug}`,
      component: path.resolve(`./src/templates/state/index.js`),
      context: {
        ...node,
        nameRegex: `/${node.name}|${node.state.toUpperCase()}[-.,/;:() ]/g`,
        slug,
      },
    })
    createPage({
      path: `/data/state/${slug}/cases`,
      component: path.resolve(`./src/templates/state/cases.js`),
      context: node,
    })
    createPage({
      path: `/data/state/${slug}/tests-antibody`,
      component: path.resolve(`./src/templates/state/tests-antibody.js`),
      context: node,
    })
    createPage({
      path: `/data/state/${slug}/tests-antigen`,
      component: path.resolve(`./src/templates/state/tests-antigen.js`),
      context: node,
    })
    createPage({
      path: `/data/state/${slug}/tests-viral`,
      component: path.resolve(`./src/templates/state/tests-viral.js`),
      context: node,
    })
    createPage({
      path: `/data/state/${slug}/hospitalization`,
      component: path.resolve(`./src/templates/state/hospitalization.js`),
      context: node,
    })
    createPage({
      path: `/data/state/${slug}/outcomes`,
      component: path.resolve(`./src/templates/state/outcomes.js`),
      context: node,
    })
    createPage({
      path: `/data/state/${slug}/notes`,
      component: path.resolve(`./src/templates/state/notes.js`),
      context: node,
    })
    createPage({
      path: `/data/state/${slug}/long-term-care`,
      component: path.resolve(`./src/templates/state/long-term-care/index.js`),
      context: node,
    })

    createPage({
      path: `/data/state/${slug}/long-term-care/history`,
      component: path.resolve(
        `./src/templates/state/long-term-care/history.js`,
      ),
      context: node,
    })

    createPage({
      path: `/data/state/${slug}/chart-tables`,
      component: path.resolve(`./src/templates/state/chart-tables.js`),
      context: node,
    })

    createRedirect({
      fromPath: `/data/state/${slug}/screenshots`,
      toPath: `https://screenshots.covidtracking.com/${slug}`,
      isPermanent: true,
    })
  })

  let raceEthnicityHistoricalStateInfo = result.data.allCovidStateInfo.nodes

  // Ignore MP, AS, and VI for historical race pages
  raceEthnicityHistoricalStateInfo = raceEthnicityHistoricalStateInfo.filter(
    node => ['MP', 'AS', 'VI'].indexOf(node.state) === -1,
  )
  raceEthnicityHistoricalStateInfo.forEach(node => {
    const { slug } = node.childSlug
    createPage({
      path: `/data/state/${slug}/race-ethnicity`,
      component: path.resolve(`./src/templates/state/race-ethnicity.js`),
      context: node,
    })
  })

  let covidStateInfo = result.data.allCovidStateInfo.nodes

  // we want to include the U.S. as a "state" here
  covidStateInfo.unshift({
    state: 'US',
    name: 'United States',
    childSlug: {
      slug: 'united-states',
    },
  })

  covidStateInfo = covidStateInfo.filter(node => node.state !== 'VI')
  covidStateInfo = covidStateInfo.filter(node => node.state !== 'GU')

  covidStateInfo.forEach(node => {
    const { slug } = node.childSlug
    createPage({
      path: `/race/infection-and-mortality-data/${slug}`,
      component: path.resolve(
        `./src/templates/race/infection-and-mortality-data/landing.js`,
      ),
      context: node,
    })
  })

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

      createRedirect({
        fromPath: shortPath,
        toPath: longPath,
        isPermanent: true,
      })
    }
  })

  result.data.allContentfulBlogCategory.nodes.forEach(node => {
    createPage({
      path: `/analysis-updates/category/${node.slug}`,
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
