const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  if (!event.queryStringParameters.file) {
    return { statusCode: 404, body: 'Not found' }
  }
  try {
    const result = await fetch(
      `https://raw.githubusercontent.com/COVID19Tracking/long-term-care-data/master/${event.queryStringParameters.file}`,
    ).then(response => {
      return response.text()
    })
    return {
      statusCode: 200,
      body: result,
      headers: {
        'Content-Type': 'application/csv',
        'Content-Disposition': `attachment; filename=${event.queryStringParameters.file}`,
      },
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
