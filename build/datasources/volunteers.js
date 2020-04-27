const _ = require('lodash/fp')
const { listUsers, getUserPublicProfile } = require('../handlers/slack')

const fixItems = _.flow(
  _.get('members'),
  _.filter(member => member.is_bot === false && member.deleted === false),
  _.map(member => member.id),
)

const hasMore = _.get('response_metadata.next_cursor')
function nextIndex(users, index) {
  return index + 1 > users.length - 1 ? false : index + 1
}

async function getPage(cursor) {
  return listUsers(cursor)
}

async function getPages(previousItems = [], cursor) {
  const result = await getPage(cursor)
  const items = previousItems.concat(fixItems(result))
  return hasMore(result) ? getPages(items, hasMore(result)) : items
}

async function getChunk(users, previousItems = [], index = 0) {
  const promises = users[index].map(async userId => {
    return getUserPublicProfile(userId)
  })
  const items = previousItems.concat(
    (await Promise.all(promises)).filter(volunteer => volunteer != null),
  )
  return nextIndex(users, index)
    ? getChunk(users, items, nextIndex(users, index))
    : items
}

async function getUsers() {
  const rawResults = await getPages([], '')
  const users = _.chunk(100, Array.from(rawResults))
  return getChunk(users, [], 0)
}

module.exports = {
  fetch: () => getUsers(),
  path: 'volunteers',
}
