exports.handler = function(event, context, callback) {
  const params = event.queryStringParameters;

  callback(null, {
    statusCode: 200,
    body: `<h1>${ params.title }</h1><p>${ params.lede }</p>`
  });
};
