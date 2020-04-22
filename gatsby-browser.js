const SwaggerUI = require('swagger-ui')

exports.onClientEntry = () => {
  window.addEventListener('load', () => {
    document.body.className = document.body.className.replace(/\bno-js\b/, '')
  })
}

window.SwaggerUI = SwaggerUI
