const fs = require('fs-extra')
const { DateTime } = require('luxon')
const crypto = require('crypto')

exports.sourceNodes = async ({ actions, createNodeId }, configOptions) => {
  const { createNode } = actions
  const { type, files } = configOptions

  const tweets = await fs.readJson(files.tweets)
  const pinnedTweets = await fs.readJson(files.pinnedTweets)

  tweets.forEach(tweet => {
    tweet.is_pinned =
      pinnedTweets &&
      pinnedTweets.filter(
        pinnedTweet => pinnedTweet.id && pinnedTweet.id === tweet.id_str,
      ).length > 0

    tweet.date = DateTime.fromFormat(
      tweet.created_at,
      'EEE MMM d HH:mm:ss ZZZ yyyy',
    )
      .setZone('UTC')
      .toJSDate()

    const digest = crypto
      .createHash('md5')
      .update(JSON.stringify(tweet))
      .digest('hex')

    const nodeTemplate = {
      id: createNodeId(`${type}.${tweet.id_str}`),
      children: [],
      parent: null,
      internal: {
        type: type,
        contentDigest: digest,
      },
    }
    createNode({ ...tweet, ...nodeTemplate })
  })
}
