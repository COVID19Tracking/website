const path = require('path')
const slugify = require('slugify')
const { createObjectCsvStringifier } = require('csv-writer')
const fs = require('fs-extra')
const { DateTime } = require('luxon')

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
          notes
          name
          state
          twitter
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
          childContentfulBlogPostBlogContentRichTextNode {
            json
          }
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
      allCounties(filter: { demographics: { total: { gt: 0 } } }) {
        nodes {
          name
          state
          current {
            cases
            deaths
          }
          demographics {
            total
            largestRace1
            largestRace2
          }
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
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
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
    })
  })

  result.data.allContentfulRedirect.nodes.forEach(({ from, redirectTo }) => {
    createRedirect({
      fromPath: from,
      toPath: redirectTo,
    })
  })

  result.data.allContentfulChart.nodes.forEach(node => {
    createPage({
      path: `/data/charts/${node.slug}`,
      component: path.resolve(`./src/templates/chart.js`),
      context: node,
    })
  })

  const sevenDaysAgo = parseInt(DateTime.local().minus({'days': 7}).toFormat('yyyyMMdd'))

  createPage({
      path: '/data',
      component: path.resolve(`./src/templates/data/index.js`),
      context: {
        sevenDaysAgo,
      },
    })

  result.data.allCovidStateInfo.nodes.forEach(node => {
    const slug = slugify(node.name, { strict: true, lower: true })

    createPage({
      path: `/data/state/${slug}`,
      component: path.resolve(`./src/templates/state/state.js`),
      context: {
        ...node,
        slug,
        sevenDaysAgo,
      },
    })
    createPage({
      path: `/data/state/${slug}/cases`,
      component: path.resolve(`./src/templates/state/cases.js`),
      context: {
        ...node,
        slug,
      },
    })
    createPage({
      path: `/data/state/${slug}/tests`,
      component: path.resolve(`./src/templates/state/tests.js`),
      context: {
        ...node,
        slug,
      },
    })
    createPage({
      path: `/data/state/${slug}/hospitalization`,
      component: path.resolve(`./src/templates/state/hospitalization.js`),
      context: {
        ...node,
        slug,
      },
    })
    createPage({
      path: `/data/state/${slug}/outcomes`,
      component: path.resolve(`./src/templates/state/outcomes.js`),
      context: {
        ...node,
        slug,
      },
    })
    createPage({
      path: `/data/state/${slug}/race-ethnicity`,
      component: path.resolve(`./src/templates/state/race-ethnicity.js`),
      context: {
        ...node,
        slug,
      },
    })
    createPage({
      path: `/data/state/${slug}/history`,
      component: path.resolve(`./src/templates/state/history.js`),
      context: {
        ...node,
        slug,
      },
    })
    createPage({
      path: `/data/state/${slug}/screenshots`,
      component: path.resolve(`./src/templates/state/screenshots.js`),
      context: {
        ...node,
        slug,
      },
    })
  })

  result.data.allContentfulBlogPost.nodes.forEach(node => {
    const blogImages = []
    node.childContentfulBlogPostBlogContentRichTextNode.json.content
      .filter(
        block =>
          block.nodeType === 'embedded-entry-block' &&
          block.data.target.sys.contentType &&
          block.data.target.sys.contentType.sys.id === 'contentBlockImage',
      )
      .forEach(image => {
        blogImages.push(image.data.target.sys.contentful_id)
      })

    const longPath = `/blog/${node.slug}`
    const shortPath = `/${node.contentful_id}`

    createRedirect({
      fromPath: shortPath,
      toPath: longPath,
    })

    createPage({
      path: longPath,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: { ...node, blogImages },
    })

  })

  result.data.allContentfulBlogCategory.nodes.forEach(node => {
    createPage({
      path: `/blog/category/${node.slug}`,
      component: path.resolve(`./src/templates/blog-category.js`),
      context: node,
    })
  })

  const allCounties = result.data.allCounties.nodes.map(county => {
    return {
      state: county.state,
      countyName: county.name,
      ...county.demographics,
      ...county.current,
      casesPer100k: (county.current.cases / county.demographics.total) * 100000,
      deathsPer100k:
        (county.current.deaths / county.demographics.total) * 100000,
    }
  })

  const csvStringifier = createObjectCsvStringifier({
    path: './public/race/data/covid-county-by-race.csv',
    header: Object.keys(allCounties[0]).map(name => ({
      id: name,
      title: name,
    })),
  })
  await fs.outputFile(
    './public/race/data/covid-county-by-race.csv',
    csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(allCounties),
  )
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type CovidScreenshot implements Node {
      dateChecked: String
    }
    type allCovidStateDaily implements Node {
      date: String
    }
    type CovidRaceDataSeparate implements Node {
      blackANHPIPosNotes: String
      blackANHPIDeathNotes: String
      blackPosNotes: String
      blackDeathNotes: String
      blackSpecialCaseNotes: String
      asianANHPIPosNotes: String
      asianANHPIDeathNotes: String
      asianPosNotes: String
      asianDeathNotes: String
      asianSpecialCaseNotes: String
      aianANHPIPosNotes: String
      aianANHPIDeathNotes: String
      aianPosNotes: String
      aianDeathNotes: String
      aianSpecialCaseNotes: String
      nhpiANHPIPosNotes: String
      nhpiANHPIDeathNotes: String
      nhpiPosNotes: String
      nhpiDeathNotes: String
      nhpiSpecialCaseNotes: String
      twoANHPIPosNotes: String
      twoANHPIDeathNotes: String
      twoPosNotes: String
      twoDeathNotes: String
      twoSpecialCaseNotes: String
      whiteANHPIPosNotes: String
      whiteANHPIDeathNotes: String
      whitePosNotes: String
      whiteDeathNotes: String
      whiteSpecialCaseNotes: String
      otherANHPIPosNotes: String
      otherANHPIDeathNotes: String
      otherPosNotes: String
      otherDeathNotes: String
      otherSpecialCaseNotes: String
      latinXANHPIPosNotes: String
      latinXANHPIDeathNotes: String
      latinXPosNotes: String
      latinXDeathNotes: String
      nonhispanicANHPIPosNotes: String
      nonhispanicANHPIDeathNotes: String
      nonhispanicPosNotes: String
      nonhispanicDeathNotes: String
      nonhispanicSpecialCaseNotes: String
    }

    type CovidRaceDataCombined implements Node {
      aianANHPIDeathNotes: String
      aianANHPIPosNotes: String
      aianDeathNotes: String
      aianPosNotes: String
      asianANHPIDeathNotes: String
      asianANHPIPosNotes: String
      asianDeathNotes: String
      asianPosNotes: String
      blackANHPIDeathNotes: String
      blackANHPIPosNotes: String
      blackDeathNotes: String
      blackPosNotes: String
      latinXANHPINotes: String
      latinXDeathNotes: String
      latinXPosNotes: String
      nhpiANHPIDeathNotes: String
      nhpiANHPIPosNotes: String
      nhpiDeathNotes: String
      nhpiPosNotes: String
      otherANHPIDeathNotes: String
      otherANHPIPosNotes: String
      otherDeathNotes: String
      otherPosNotes: String
      twoANHPIDeathNotes: String
      twoANHPIPosNotes: String
      twoDeathNotes: String
      twoPosNotes: String
      whiteANHPIDeathNotes: String
      whiteANHPIPosNotes: String
      whiteDeathNotes: String
      whitePosNotes: String
    }
  `
  createTypes(typeDefs)
}
