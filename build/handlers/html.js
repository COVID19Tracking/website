const _ = require('lodash/fp')
const { createObj } = require('prairie')
const tableify = require('html-tableify')
const { alwaysArray } = require('./utils')

const wrapBody = x => `<html>
  <head>
    <style>
      table, th, td {
       border: 1px solid black;
      }
    </style>
  </head>
  <body>${x}</body>
</html>
`
const getConfig = _.flow(
  _.head,
  _.keys,
  _.map(x => ({ name: x, title: _.startCase(x) })),
  createObj('headers'),
)
const makeTable = x => tableify(x, getConfig(x))
module.exports = _.flow(alwaysArray, makeTable, wrapBody)
