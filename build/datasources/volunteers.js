const _ = require('lodash/fp')
const getUsers = require('../handlers/slack')

const fixItems = _.flow(_.get('members'),_.filter(member=>member.profile.status_text=='show_me_on_the_list'),_.map(member=>{return {name:member.profile.display_name,website:''}}))

const hasMore = _.get('response_metadata.next_cursor')

async function getPage(cursor) {
    return await getUsers(cursor)
  }

async function getPages(previousItems = [], cursor) {
    const result = await getPage(cursor)
    const items = previousItems.concat(fixItems(result))
    return hasMore(result) ? getPages(items, hasMore(result)) : items
  }


module.exports = {
  fetch: () => getPages(),
  path: 'volunteers',
}
