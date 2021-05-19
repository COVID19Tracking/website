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
  if (!body.event) {
    return { statusCode: 404 }
  }
  const user = await slackClient.users.info({ user: body.event.user })
  const channel = await slackClient.conversations.info({
    channel: body.event.channel,
  })
  console.log([
    {
      fields: {
        ID: body.event.thread_ts,
        Channel: channel.channel.name,
        User: user.user.profile.display_name,
      },
    },
  ])
  base('Threads')
    .create([
      {
        fields: {
          ID: body.event.thread_ts,
          Channel: channel.channel.name,
          User: user.user.profile.display_name,
        },
      },
    ])
    .then(response => {
      console.log(response)
      slackClient.chat.postMessage({
        channel: body.event.channel,
        unfurl_links: false,
        unfurl_media: false,
        thread_ts: body.event.thread_ts,
        text: `The contents of this thread will be archived in accordance with best practice.`,
      })
      return { statusCode: 200, body: 'Success' }
    })
    .catch(error => {
      console.log(error)
    })
}
