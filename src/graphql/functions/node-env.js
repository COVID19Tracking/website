/* eslint-disable */

// This file/function exists for debugging and testing
// issues with the value of the `NODE_ENV` environment variable

module.exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: '' + process.env.NODE_ENV,
  };
};
