const Cache = require('file-system-cache').default
const path = require('path')
const { createElement } = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

const prettifyUrl = require('./prettify-url')
const { setAddToRenderQueueCallback } = require('./rendered-component')

const cache = Cache({
  basePath: './.cache/component-rendering',
  ns: 'component-rendering',
})

/**
 * Adds component HTML to the build cache so that gatsby-node can use puppeteer
 * to render the markup
 */
setAddToRenderQueueCallback(
  ({ Component, props, width, height, relativePath, filename }) => {
    try {
      const modifiedProps = { ...props, width, height }
      const element = createElement(Component, modifiedProps)
      const bodyHTML = renderToStaticMarkup(element)

      const prettyPath = prettifyUrl(relativePath)
      const prettyFileName = prettifyUrl(filename)
      const componentPath = path.resolve(prettyPath, prettyFileName)

      cache.setSync(componentPath, {
        bodyHTML,
        width,
        height,
        dir: prettyPath,
        filename: prettyFileName,
        isRenderable: true,
      })
    } catch (e) {
      console.error(e)
    }
  },
)

/**
 * Grabs CSS information from the render so that it can be used for rendering
 * components
 */
exports.onPreRenderHTML = ({ getHeadComponents }) => {
  const headComponents = getHeadComponents()
  const styles = headComponents.filter(headComponent => {
    /* eslint-disable no-underscore-dangle */
    return headComponent.type === 'style' &&
      headComponent.props &&
      headComponent.props.dangerouslySetInnerHTML &&
      headComponent.props.dangerouslySetInnerHTML.__html
    /* eslint-enable no-underscore-dangle */
  }).map(headComponent => headComponent.props.dangerouslySetInnerHTML.__html)

  // cache.fileExists is asynchronous, so use getSync instead
  if (cache.getSync('_styles') === undefined) {
    cache.setSync('_styles', { styles, isRenderable: false })
  }
}
