const _ = require('lodash/fp')
const { RESTDataSource } = require('apollo-datasource-rest')
const { createObj, propDo } = require('prairie')
const { codeByName } = require('./stateNames')
const { addName, dailyDate, totalDate } = require('./utils')

const stat = ({
  date, death, positive, negative, pending, total, lastUpdatedEt, checkTimeEt, state,
}) => ({
  state,
  positive,
  negative,
  pending,
  death,
  total,
  dateModified: lastUpdatedEt && totalDate(lastUpdatedEt),
  dateChecked: (checkTimeEt && totalDate(checkTimeEt)) || (date && dailyDate(date)),
})

const resource = ({
  daily, dataSite, notes, pui, pum, tracker, ...rest
}) => ({
  daily: _.map(stat, daily),
  state: rest.state,
  url: dataSite,
  pui,
  pum,
  notes,
  tracker,
  total: stat(rest),
})
const healthDepartment = ({ covid19Site, twitter }) => ({
  twitter,
  url: covid19Site,
})
const stateReducer = _.flow(
  addName,
  (item) => ({
    id: item.state,
    name: item.name,
    covidResource: resource(item),
    healthDepartment: healthDepartment(item),
  }),
)

const byState = _.keyBy('state')

const statesReducer = ([totals, info, daily, urls]) => _.values(_.mergeAll([
  byState(totals),
  byState(info),
  _.mapValues(createObj('daily'), _.groupBy('state', daily)),
  _.mapValues(createObj('tracker'), _.keyBy(propDo('name', codeByName), _.compact(urls))),
])).map(stateReducer)

class StateAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://covidtracking.com/api/'
  }

  getAllStates() {
    return Promise.all([
      this.get('states'),
      this.get('states/info'),
      this.get('states/daily'),
      this.get('urls'),
    ])
      .then(statesReducer)
  }

  getStateIndex() { return this.getAllStates().then(_.keyBy('id')) }

  getStateById({ id }) { return this.getStateIndex().then(_.get(id)) }

  getStateByIds({ ids }) { return this.getStateIndex().then(_.at(ids)) }

  getUsTotal() { return this.get('us').then(_.head) }

  getUsDaily() { return this.get('us/daily') }
}

module.exports = StateAPI
