const winston = require('winston')
const { Loggly } = require('winston-loggly-bulk')
const fetch = require('node-fetch')

winston.add(
  new Loggly({
    token: process.env.LOGGLY_TEST_TOKEN,
    subdomain: process.env.LOGGLY_TEST_DOMAIN,
    tags: ['api-proxy'],
    json: true,
  }),
)

exports.handler = function(event, context, callback) {
  const { path, queryStringParameters } = event
  let apiPath = path.replace('/.netlify/functions/api', '')
  if (queryStringParameters) {
    apiPath += `?${Object.keys(queryStringParameters)
      .map(key => key + '=' + queryStringParameters[key])
      .join('&')}`
  }
  winston.log('info', { path: apiPath, origin: event.headers.origin })
  fetch(`https://covid.cape.io/${apiPath}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      callback(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        },
        statusCode: 200,
        body: JSON.stringify(data),
      })
    })
}
