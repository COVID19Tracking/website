const Airtable = require('airtable')
const { WebClient } = require('@slack/web-api')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appbpvthclasxpwu7',
)
const slackClient = new WebClient(process.env.SLACK_PRESERVER_TOKEN)

exports.handler = async event => {
  const body = JSON.parse(event.body)
  if (typeof body.challenge !== 'undefined') {
    return { statusCode: 200, body: body.challenge }
  }
  console.log(event)
  base('Threads')
    .create([
      {
        fields: {
          ID: '1',
          Channel: 'data-entry',
          Link: 'http://something.com',
        },
      },
    ])
    .then(response => {
      return { statusCode: 200, body: 'Success' }
    })
    .catch(error => {
      console.log(error)
    })
}
