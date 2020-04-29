const fetch = require('node-fetch')

exports.handler = function(event, context, callback) {
  const { path, queryStringParameters } = event
  let apiPath = path.replace('/api/', '')
  if (queryStringParameters) {
    apiPath += `?${Object.keys(queryStringParameters)
      .map(key => key + '=' + queryStringParameters[key])
      .join('&')}`
  }

  console.log(`${apiPath}, ${event.headers.origin}`)

  fetch(`https://covid.cape.io/${apiPath}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
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
