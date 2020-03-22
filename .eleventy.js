const { DateTime } = require('luxon')
const pluginRss = require('@11ty/eleventy-plugin-rss')

module.exports = function(eleventyConfig) {
  const CleanCSS = require('clean-css')

  eleventyConfig.setBrowserSyncConfig({
    ghostMode: false,
    open: true,
  })

  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy')
  })

  eleventyConfig.addFilter('readableYYYYMMDD', day => {
    let dayStr = day + '' // It looks like these values are getting passed as an integer
    try {
      return DateTime.fromFormat(dayStr + '', 'yyyyMMdd').toFormat(
        'dd LLL yyyy ccc',
      )
    } catch (e) {
      console.error(`Couldn't parse date ${dayStr}`)
      return day
    }
  })

  eleventyConfig.addPassthroughCopy('_src/_assets')
  eleventyConfig.addPassthroughCopy('_src/sw.js')
  eleventyConfig.addPassthroughCopy('_src/admin/')
  eleventyConfig.addPassthroughCopy('_redirects')

  eleventyConfig.addFilter(
    'cssmin',
    code => new CleanCSS({}).minify(code).styles,
  )

  // All posts:
  eleventyConfig.addCollection('posts', function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item
    })
  })

  let markdownIt = require("markdown-it");
  let markdownOptions = {
    html: false,
    breaks: true,
    linkify: true,
  };
  let markdownItAnchor = require('markdown-it-anchor');
  let markdownItOptions = {
    level: 1
  }
  const markdownLib = markdownIt(markdownOptions).use(markdownItAnchor, markdownItOptions)

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addNunjucksFilter('markdownify', markdownString =>
    markdownLib.render(markdownString),
  )

  eleventyConfig.addNunjucksFilter('thousands', x =>
    x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x,
  )

  return {
    templateFormats: ['md', 'njk', 'html'],

    pathPrefix: '/',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'md, njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: '_src',
      includes: '_templates',
      data: '_data',
      output: '_site',
    },
  }
}
