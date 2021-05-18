const Airtable = require('airtable')
const { WebClient } = require('@slack/web-api')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appbpvthclasxpwu7',
)
const slackClient = new WebClient(process.env.SLACK_PRESERVER_TOKEN)

exports.handler = async event => {
  console.log(event)

  return { statusCode: 200, body: 'Success' }
}
