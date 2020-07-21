const { createElement } = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

const prettifyUrl = require('./prettify-url')
const BuildCache = require('./build-cache').default
const { setAddToRenderQueueCallback } = require('./rendered-component')

const cache = new BuildCache('./.cache/component-rendering')

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

      cache.setSync(`components/${prettyPath}`, `${prettyFileName}.json`, {
        bodyHTML,
        width,
        height,
        dir: prettyPath,
        filename: prettyFileName,
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
  /* eslint-disable no-underscore-dangle */
  const styles = headComponents
    .filter(headComponent => {
      return (
        headComponent.type === 'style' &&
        headComponent.props &&
        headComponent.props.dangerouslySetInnerHTML &&
        headComponent.props.dangerouslySetInnerHTML.__html
      )
    })
    .map(headComponent => headComponent.props.dangerouslySetInnerHTML.__html)
  /* eslint-enable no-underscore-dangle */

  if (!cache.fileExistsSync('', 'styles.json')) {
    cache.setSync('', 'styles.json', { styles })
  }
}
