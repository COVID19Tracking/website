/* eslint-disable */

// This file/function exists for testing and debugging
// whether Netlify functions are working

module.exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: '' + (2 + 3),
  };
};
