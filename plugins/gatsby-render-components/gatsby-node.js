const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const path = require('path')
const Cache = require('file-system-cache').default

const cache = Cache({
  basePath: './.cache/component-rendering',
  ns: 'component-rendering',
})

exports.onPostBootstrap = () => cache.clear()

exports.onPostBuild = async (_, pluginOptions) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const styles = await cache.get('_styles')
  const stylesHTML = styles.styles
    .map(styleHTML => `<style>${styleHTML}</style>`)
    .reduce((acc, cur) => acc + cur, '')

  const allCacheFiles = await cache.load()

  // disable because we can't render more than one at a time without spinning up
  // a ton of chromium pages
  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < allCacheFiles.files.length; i += 1) {
    const entry = allCacheFiles.files[i].value
    if (entry.isRenderable) {
      try {
        const { bodyHTML, width, height, dir, filename } = entry

        const intWidth = Math.floor(width)
        const intHeight = Math.floor(height)
        await page.setViewport({
          width: intWidth,
          height: intHeight,
        })

        const pageHTML = `<!DOCTYPE html>
          <meta charset="utf-8">${stylesHTML}
          <body>${bodyHTML}</body>`

        await page.setContent(pageHTML)

        const renderPath = path.join(pluginOptions.path, dir)
        await mkdirp(renderPath)
        const screenshotPath = path.format({ dir: renderPath, base: filename })
        await page.screenshot({
          type: 'png',
          clip: {
            x: 0,
            y: 0,
            width: intWidth,
            height: intHeight,
          },
          omitBackground: true,
          path: screenshotPath,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
  /* eslint-enable no-await-in-loop */

  await page.close()
  await browser.close()
}
