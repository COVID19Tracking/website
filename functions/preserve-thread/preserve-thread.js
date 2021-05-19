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
  console.log(body.event)
  const user = await slackClient.users.info({ user: body.event.user })
  const channel = await slackClient.conversations.info({
    channel: body.event.channel,
  })
  if (!body.event.thread_ts) {
    await slackClient.chat.postMessage({
      channel: body.event.channel,
      unfurl_links: false,
      unfurl_media: false,
      thread_ts: body.event.ts,
      text: `:thread: <@${body.event.user}> I can only archive replies to threads. Try mentioning me as a reply to a thread.`,
    })
    return { status: 200, body: 'Not in thread' }
  }
  const airtableResult = await base('Threads').create([
    {
      fields: {
        ID: body.event.thread_ts,
        Channel: channel.channel.name,
        User: user.user.profile.display_name,
        Link: `https://covid-tracking.slack.com/archives/C022AHS5QCS/p${body.event.thread_ts.replace(
          '.',
          '',
        )}`,
      },
    },
  ])
  let airtableId = 0
  airtableResult.forEach(function(record) {
    airtableId = record.getId()
  })
  await slackClient.chat.postMessage({
    channel: body.event.channel,
    unfurl_links: false,
    unfurl_media: false,
    thread_ts: body.event.thread_ts,
    text: `<@${body.event.user}> The contents of this thread will be archived in accordance with best practice. <https://airtable.com/tblq6v3wgz4De1cMT/viwOquNnSz8WW7GXB/${airtableId}|View record>`,
  })
  return { statusCode: 200, body: 'Success' }
}
