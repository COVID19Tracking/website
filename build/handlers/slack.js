const { WebClient } = require('@slack/web-api');

// Read a token from the environment variables

const token = global.SLACK_TOKEN || process.env.SLACK_TOKEN
const limit = global.SLACK_PAGE_SIZE || process.env.SLACK_PAGE_SIZE

// Initialize
const web = new WebClient(token);

async function listUsers(cursor) {
  if (!token) return null;
  try {
    return await web.users.list({limit:limit,cursor:cursor});
  }
  catch {
    console.log('API WARNING\nslack fetch of volunteer list failed')
  }

}

module.exports = listUsers
