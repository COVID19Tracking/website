const getAverage = (history, state, value) =>
  history
    .find(group => group.nodes[0].state === state)
    .nodes.slice(0, 7)
    .reduce((total, item) => total + value(item), 0) / 7

export default {
  casesPer100k: {
    getValue: (history, state) =>
      getAverage(
        history,
        state.state,
        item => item.childPopulation.positive.per100k,
      ),
  },
  sevenDayPositive: {
    getValue: (history, state) =>
      getAverage(history, state.state, item => item.positiveIncrease),
  },
}
