/* eslint-disable */

let dataAsync = require('./dataAsync');
let stateNames = require('./stateNames');

function forceJSDate(day) {
  if (typeof day === 'string' || typeof day === 'number') {
    return data.rawDayToJSDate(day);
  } else {
    return day;
  }
}

module.exports = {
  Query: {
    _updated: async (_, {}, context, info) => {
      let data = await dataAsync();
      return data._updated;
    },

    usDailyData_forAllDays: async (_, {}, context, info) => {
      let data = await dataAsync();
      return data.usDaily;
    },

    usDailyData_forDay: async (_, { day }, context, info) => {
      let data = await dataAsync();
      let usDaily = data.usDaily;
      let day_ = forceJSDate(day);
      for (let dayData of usDaily) {
        if (+dayData.date === +day_) {
          return dayData;
        }
      }
      return null;
    },

    usDailyData_forDayRange: async (_, { startDay, endDay }, context, info) => {
      let data = await dataAsync();
      let usDaily = data.usDaily;
      let startDayMoment = +forceJSDate(startDay);
      let endDayMoment = +forceJSDate(endDay);
      let result = [];
      for (let dayData of usDaily) {
        let dayMoment = +dayData.date;
        if (dayMoment >= startDayMoment && dayMoment <= endDayMoment) {
          result.push(dayData);
        }
      }
      return result;
    },

    state: async (_, { state }, context, info) => {
      let data = await dataAsync();
      let stateInfo = data.stateInfo;
      for (let abbrev of Object.keys(stateInfo)) {
        let stateData = stateInfo[abbrev];
        if (stateData.abbrev === state || stateData.name === state) {
          return stateData;
        }
      }
    },

    allStates: async (_, {}, context, info) => {
      let data = await dataAsync();
      let stateInfo = data.stateInfo;
      let results = [];
      for (let abbrev of Object.keys(stateInfo)) {
        let stateData = stateInfo[abbrev];
        results.push(stateData);
      }
      return results;
    },

    usCumulativeTotal: async (_, {}, context, info) => {
      let data = await dataAsync();
      return data.usTotal;
    },

    stateCumulativeData_forAllStates: async (_, {}, context, info) => {
      let results = [];
      let statesData = data.statesData;
      for (let abbrev of Object.keys(statesData)) {
        results.push(statesData[abbrev]);
      }
      return results;
    },

    stateCumulativeData_forState: async (_, { state }, context, info) => {
      let data = await dataAsync();
      let statesData = data.statesData;
      for (let abbrev in statesData) {
        let stateData = statesData[abbrev];
        if (stateNames.matches(state, abbrev)) {
          return stateData;
        }
      }
      return null;
    },

    stateCumulativeData_forStates: async (_, { statesList }, context, info) => {
      let data = await dataAsync();
      let results = [];
      let statesData = data.statesData;
      for (let abbrev of Object.keys(statesData)) {
        let stateData = statesData[abbrev];
        if (stateNames.matches(state, stateData.__stateAbbrev)) {
          results.push(stateData);
        }
      }
      return results;
    },
  },

  DataPoint: {
    __resolveType: (obj, context, info) => {
      if (obj.date) {
        return 'USDailyDataPoint';
      } else if (obj.state) {
        return 'StateCumulativeDataPoint';
      } else {
        return 'USTotalDataPoint';
      }
    },
  },

  State: {
    cumulativeData: async (_, {}, context, info) => {
      let data = await dataAsync();
      return data.statesData[_.abbrev];
    },
  },

  StateCumulativeDataPoint: {
    state: async (_, {}, context, info) => {
      let data = await dataAsync();
      return data.stateInfo[_.__stateAbbrev];
    },
    stateAbbrev: (_, {}, context, info) => {
      return _.__stateAbbrev;
    },
    stateName: (_, {}, context, info) => {
      return stateNames.names[_.__stateAbbrev];
    },
  },
};
