const React = require('react')
const { ParallaxProvider } = require('react-scroll-parallax')

exports.onClientEntry = () => {
  window.addEventListener('load', () => {
    document.body.className = document.body.className.replace(/\bno-js\b/, '')
  })
}

exports.wrapRootElement = ({ element }) => {
  return <ParallaxProvider>{element}</ParallaxProvider>
}
