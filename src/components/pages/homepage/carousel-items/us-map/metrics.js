import mapStyle from './us-map.module.scss'

const getAverage = (history, state, value) =>
  history
    .find(group => group.nodes[0].state === state)
    .nodes.slice(0, 7)
    .reduce((total, item) => total + value(item), 0) / 7

export default {
  casesPer100k: {
    title: 'Average cases per 100k people in the last seven days',
    getValue: (history, state) =>
      getAverage(
        history,
        state.state,
        item => item.childPopulation.positive.per100k,
      ),
    getColor: item => {
      if (item > 5000) {
        return mapStyle.level4
      }
      if (item > 3000) {
        return mapStyle.level3
      }
      if (item > 2000) {
        return mapStyle.level2
      }
      return mapStyle.level1
    },
  },
  sevenDayPositive: {
    title: 'Average daily cases in the last seven days',
    getValue: (history, state) =>
      getAverage(history, state.state, item => item.positiveIncrease),

    getColor: item => {
      if (item > 5000) {
        return mapStyle.level4
      }
      if (item > 3000) {
        return mapStyle.level3
      }
      if (item > 2000) {
        return mapStyle.level2
      }
      return mapStyle.level1
    },
  },
}
