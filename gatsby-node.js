const path = require('path')
const slugify = require('slugify')
const { createObjectCsvStringifier } = require('csv-writer')
const fs = require('fs-extra')

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
    }
  `)

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

  result.data.allCovidStateInfo.nodes.forEach(node => {
    createPage({
      path: `/data/state/${slugify(node.name, { strict: true, lower: true })}`,
      component: path.resolve(`./src/templates/state.js`),
      context: node,
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

    createPage({
      path: `/blog/${node.slug}`,
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
