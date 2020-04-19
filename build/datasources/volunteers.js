const _ = require('lodash/fp')
const { listUsers, getUserPublicProfile } = require('../handlers/slack')

const fixItems = _.flow(
  _.get('members'),
  _.filter(member => member.is_bot === false),
  _.map(member => {
    return member.id
  }),
)

const hasMore = _.get('response_metadata.next_cursor')

async function getPage(cursor) {
  return listUsers(cursor)
}

async function getPages(previousItems = [], cursor) {
  const result = await getPage(cursor)
  const items = previousItems.concat(fixItems(result))
  return hasMore(result) ? getPages(items, hasMore(result)) : items
}

async function getUsers() {
  const rawResults = await getPages([], '')
  const users = Array.from(rawResults)
  const promises = users.map(async userId => {
    //
    return getUserPublicProfile(userId)
  })

  return (await Promise.all(promises)).filter(volunteer => volunteer != null)
}

module.exports = {
  fetch: () => getUsers(),
  path: 'volunteers',
}
