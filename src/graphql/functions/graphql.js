let { ApolloServer, gql } = require('apollo-server-lambda');

let typeDefs = require('../typeDefs');
let resolvers = require('../resolvers');

let server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();
