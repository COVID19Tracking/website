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
    getDirection: (history, state) => {
      const items = history.find(group => group.nodes[0].state === state.state)
      if (!items) {
        return null
      }
      const { nodes } = items
      let currentAverage = 0
      let pastAverage = 0
      for (let i = 0; i < 7; i += 1) {
        currentAverage += nodes[i].childPopulation.positive.per100k
        pastAverage += nodes[i + 7].childPopulation.positive.per100k
      }
      currentAverage /= 7
      pastAverage /= 7
      const direction = (currentAverage - pastAverage) / pastAverage
      if (direction > 0.1) {
        return 'up'
      }
      return direction < -0.1 ? 'down' : 'unchanged'
    },
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
    getDirection: (history, state) => {
      const items = history.find(group => group.nodes[0].state === state.state)
      if (!items) {
        return null
      }
      const { nodes } = items

      let currentAverage = 0
      let pastAverage = 0
      for (let i = 0; i < 7; i += 1) {
        currentAverage += nodes[i].positiveIncrease
        pastAverage += nodes[i + 7].positiveIncrease
      }
      currentAverage /= 7
      pastAverage /= 7
      const direction = (currentAverage - pastAverage) / pastAverage
      if (direction > 0.1) {
        return 'up'
      }
      return direction < -0.1 ? 'down' : 'unchanged'
    },
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
