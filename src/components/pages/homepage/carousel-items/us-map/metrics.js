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
  },
  sevenDayPositive: {
    title: 'Average daily cases in the last seven days',
    getValue: (history, state) =>
      getAverage(history, state.state, item => item.positiveIncrease),
  },
}
