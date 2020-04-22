let { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime
  scalar Date

  enum PUIReportingType {
    ALL_DATA
    NO_DATA
    ONLY_POSITIVES
    POSITIVES_AND_NEGATIVES
    UKNOWN
  }

  interface DataPoint {
    positives: Int
    negatives: Int
    positivesPlusNegatives: Int
    pending: Int
    deaths: Int
    total: Int
  }

  type USDailyDataPoint implements DataPoint {
    date: Date
    statesReporting: Int

    positives: Int
    negatives: Int
    positivesPlusNegatives: Int
    pending: Int
    deaths: Int
    total: Int
  }

  type USTotalDataPoint implements DataPoint {
    positives: Int
    negatives: Int
    positivesPlusNegatives: Int
    pending: Int
    deaths: Int
    total: Int
  }

  type StateCumulativeDataPoint implements DataPoint {
    state: State
    stateAbbrev: String
    stateName: String

    positives: Int
    negatives: Int
    positivesPlusNegatives: Int
    pending: Int
    deaths: Int
    total: Int

    lastUpdated: DateTime
    lastChecked: DateTime
  }

  type State {
    abbrev: String
    name: String
    dataSite: String
    covid19Site: String
    twitter: String
    puiReporting: PUIReportingType
    pumReporting: Boolean
    notes: String

    cumulativeData: StateCumulativeDataPoint
  }

  type Query {
    usCumulativeTotal: USTotalDataPoint
    stateCumulativeData_forState(state: String!): StateCumulativeDataPoint
    stateCumulativeData_forStates(statesList: [String!]): [StateCumulativeDataPoint]
    stateCumulativeData_forAllStates: [StateCumulativeDataPoint]
    usDailyData_forAllDays: [USDailyDataPoint]
    usDailyData_forDay(day: Date): USDailyDataPoint
    usDailyData_forDayRange(startDay: Date!, endDay: Date!): [USDailyDataPoint]
    state(state: String!): State
    allStates: [State]
    _updated: DateTime
  }
`;
