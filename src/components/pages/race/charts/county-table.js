import React, { useState } from 'react'
import Alert from '@reach/alert'
import { Table, Th, Td } from '~components/common/table'
import countiesTableStyle from '~components/pages/race/charts/counties-table.module.scss'
import { FormatNumber } from '~components/utils/format'

const sortDescription = {
  largestRace1: 'Largest racial group',
  largestRace2: 'Second largest racial group',
  deathsPer100k: 'Deaths per 100 thousand',
  casesPer100k: 'Cases per 100 thousand',
  name: 'County name',
}

export default ({ tableSource, defaultSort, getRank }) => {
  const [sort, setSort] = useState({ field: defaultSort, desc: true })

  const tableData = tableSource.sort((a, b) => {
    if (
      ['largestRace1', 'largestRace2', 'largestRace3'].indexOf(sort.field) > -1
    ) {
      if (a.demographics[sort.field] === b.demographics[sort.field]) {
        return 0
      }
      if (a.demographics[sort.field] < b.demographics[sort.field]) {
        return sort.desc ? 1 : -1
      }
      return sort.desc ? -1 : 1
    }
    if (a[sort.field] === b[sort.field]) {
      return 0
    }
    if (a[sort.field] < b[sort.field]) {
      return sort.desc ? 1 : -1
    }
    return sort.desc ? -1 : 1
  })

  const handleSortClick = field => {
    const desc = sort.field === field ? !sort.desc : true
    setSort({
      field,
      desc,
    })
  }

  const sortDirection = field => {
    if (sort.field === field) {
      return sort.desc ? 'up' : 'down'
    }
    return null
  }

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th header additionalClass={countiesTableStyle.rank}>
              Rank
            </Th>
            <Th
              header
              alignLeft
              sortable
              onClick={() => handleSortClick('name')}
              additionalClass={countiesTableStyle.name}
              sortDirection={sortDirection('name')}
            >
              Name
            </Th>
            {defaultSort === 'casesPer100k' && (
              <Th
                header
                isFirst
                sortable
                onClick={() => handleSortClick('casesPer100k')}
                sortDirection={sortDirection('casesPer100k')}
                additionalClass={countiesTableStyle.count}
              >
                Cases per 100
                <abbr title="thousand" aria-label="thousand">
                  k
                </abbr>
              </Th>
            )}
            {defaultSort === 'deathsPer100k' && (
              <Th
                header
                sortable
                onClick={() => handleSortClick('deathsPer100k')}
                sortDirection={sortDirection('deathsPer100k')}
                additionalClass={countiesTableStyle.count}
              >
                Deaths per 100
                <abbr title="thousand" aria-label="thousand">
                  k
                </abbr>
              </Th>
            )}
            <Th
              header
              sortable
              additionalClass={countiesTableStyle.group}
              onClick={() => handleSortClick('largestRace1')}
              sortDirection={sortDirection('largestRace1')}
            >
              Largest racial group
            </Th>
            <Th
              header
              sortable
              additionalClass={countiesTableStyle.group}
              onClick={() => handleSortClick('largestRace2')}
              sortDirection={sortDirection('largestRace2')}
            >
              Second largest racial group
            </Th>
            <Th
              header
              sortable
              additionalClass={countiesTableStyle.group}
              onClick={() => handleSortClick('largestRace3')}
              sortDirection={sortDirection('largestRace3')}
            >
              Third largest racial group
            </Th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(county => (
            <>
              <tr>
                <Td>{getRank(county)}</Td>
                <Td alignLeft>
                  {county.name}, {county.state}
                </Td>
                {defaultSort === 'casesPer100k' && (
                  <Td isFirst>
                    <FormatNumber number={Math.round(county.casesPer100k)} />
                  </Td>
                )}
                {defaultSort === 'deathsPer100k' && (
                  <Td isFirst>
                    <FormatNumber number={Math.round(county.deathsPer100k)} />
                  </Td>
                )}
                <Td>
                  {county.demographics.largestRace1} (
                  {county.demographics.largestRace1pct}%)
                </Td>
                <Td>
                  {county.demographics.largestRace2} (
                  {county.demographics.largestRace2pct}%)
                </Td>
                <Td>
                  {county.demographics.largestRace3} (
                  {county.demographics.largestRace3pct}%)
                </Td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
      <Alert>
        The table is sorted by {sortDescription[sort.field]} in{' '}
        {sort.desc ? <>descending</> : <>ascending</>} order
      </Alert>
    </>
  )
}
