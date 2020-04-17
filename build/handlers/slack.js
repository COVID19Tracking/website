const { WebClient, ErrorCode } = require('@slack/web-api')

// Read a token from the environment variables

const token = global.SLACK_TOKEN || process.env.SLACK_TOKEN
const limit = 100
const wantsToBeOnWebsiteField = 'Xf011X160CGK'
const wantsToBeOnWebsiteValue = 'Yes, add me to the public volunteer web page'
const publicNameField = 'Xf0122V6KCN8'
const publicWebsiteField = 'Xf0129DFHP4Z'

// Initialize
const web = new WebClient(token)

async function listUsers(cursor) {
  if (!token) return null
  try {
    return await web.users.list({ limit: limit, cursor: cursor })
  } catch {
    console.log('API WARNING\nslack fetch of volunteer list failed')
  }
}

async function getUserPublicProfile(userId) {
  if (!token) return null
  try {
    const response = await web.users.profile.get({ user: userId })
    if (response.profile && response.profile.fields) {
      const customFields = response.profile.fields
      if (
        wantsToBeOnWebsiteField in customFields &&
        customFields[wantsToBeOnWebsiteField].value === wantsToBeOnWebsiteValue
      ) {
        const publicName =
          publicNameField in customFields
            ? customFields[publicNameField].value
            : null
        const publicWebsite =
          publicWebsiteField in customFields
            ? customFields[publicWebsiteField].value
            : ''

        if (publicName) {
          return { name: publicName, website: publicWebsite }
        }
      }

      return null
    }
  } catch (error) {
    if (error.code === ErrorCode.PlatformError) {
      console.log(
        `API WARNING\nslack fetch of user profile failed \nerror= ${error.data}`,
      )
    } else {
      // Some other error, oh no!
      console.log(`API WARNING\nslack fetch of user profile ${userId} failed`)
    }
  }
  return null
}

module.exports = {
  listUsers,
  getUserPublicProfile,
}
