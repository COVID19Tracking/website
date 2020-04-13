const { WebClient } = require('@slack/web-api');

// Read a token from the environment variables

const token = process.env.SLACK_TOKEN;
const limit = process.env.SLACK_PAGE_SIZE;


// Initialize
const web = new WebClient(token);

async function listUsers(cursor) {
  return await web.users.list({limit:limit,cursor:cursor});
}

module.exports = listUsers
