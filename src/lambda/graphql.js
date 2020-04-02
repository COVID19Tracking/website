const { ApolloServer, gql } = require('apollo-server-lambda')
const { GraphQLJSONObject } = require('graphql-type-json')

const typeDefs = gql`
  scalar JSONObject
  scalar Date
  interface DataPoint {
    positives: Int
    negatives: Int
    positivesPlusNegatives: Int
    pending: Int
    deaths: Int
    total: Int
  }
  type CovidStat {
    state: String!
    positive: Int
    negative: Int
    pending: Int
    death: Int
    dateModified: Date
    dateChecked: Date
  }
  type Headers {
    Cookie: String
  }
  type Tracker {
    url: String
    kind: String
    filter: String
    headers: JSONObject
    navigate: String
    options: JSONObject
    ssl_no_verify: Boolean
  }
  type Image {
    url: String
    date: String
  }
  type CovidResource {
    state: String!
    url: String
    images: [Image]
    name: String
    pui: String
    pum: Boolean
    notes: String
    tracker: Tracker
    total: CovidStat
    daily: [CovidStat]
  }
  type HealthDepartment {
    url: String
    twitter: String
  }
  type State {
    id: String!
    name: String!
    covidResource: CovidResource
    healthDepartment: HealthDepartment
  }
  type USDailyDataPoint implements DataPoint {
    date: Date
    states: Int
    positives: Int
    negatives: Int
    positivesPlusNegatives: Int
    pending: Int
    hospitalized: Int
    deaths: Int
    total: Int
    hash: String
    dateChecked: Date
    totalTestResults: Int
    deathIncrease: Int
    hospitalizedIncrease: Int
    negativeIncrease: Int
    positiveIncrease: Int
    totalTestResultsIncrease: Int
  }
  type USTotalDataPoint implements DataPoint {
    positives: Int
    negatives: Int
    positivesPlusNegatives: Int
    pending: Int
    deaths: Int
    total: Int
  }
  type Query {
    state(id: ID!): State
    states(ids: [ID]): [State]!
    usCumulativeTotal: USTotalDataPoint
    usDailyData: [USDailyDataPoint]
  }
`

const resolvers = {
  JSONObject: GraphQLJSONObject,
  Query: {
    states: (parent, args, { dataSources }) => {
      if (args.ids) {
        return dataSources.stateAPI.getStateByIds(args)
      }
      return dataSources.stateAPI.getAllStates()
    },
    state: (parent, args, { dataSources }) =>
      dataSources.stateAPI.getStateById(args),
    usCumulativeTotal: (parent, args, { dataSources }) =>
      dataSources.stateAPI.getUsTotal(),
    usDailyData: (parent, args, { dataSources }) =>
      dataSources.stateAPI.getUsDaily(),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
