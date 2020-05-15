import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Table, Th, Td } from '~components/common/table'
import countiesTableStyle from './counties-table.module.scss'

export default () => {
  const [sort, setSort] = useState({ field: 'casesPer100k', desc: true })

  const data = useStaticQuery(graphql`
    query {
      allCounties(filter: { demographics: { total: { gt: 0 } } }) {
        nodes {
          name
          state
          current {
            cases
            deaths
          }
          demographics {
            total
            largestRace1
            largestRace2
          }
        }
      }
    }
  `)

  const tableSource = data.allCounties.nodes.map(county => {
    return {
      ...county,
      casesPer100k: (county.current.cases / county.demographics.total) * 100000,
      deathsPer100k:
        (county.current.deaths / county.demographics.total) * 100000,
    }
  })

  const tableData = tableSource.sort((a, b) => {
    if (sort.field === 'casesPer100k') {
      if (a.casesPer100k < b.casesPer100k) {
        return sort.desc ? 1 : -1
      }
      return sort.desc ? -1 : 1
    }
    if (sort.field === 'deathsPer100k') {
      if (a.deathsPer100k < b.deathsPer100k) {
        return sort.desc ? 1 : -1
      }
      return sort.desc ? -1 : 1
    }
    if (sort.field === 'name') {
      if (a.name < b.name) {
        return sort.desc ? 1 : -1
      }
      return sort.desc ? -1 : 1
    }
    return 0
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
    <Table>
      <thead>
        <tr>
          <Th
            header
            alignLeft
            onClick={() => handleSortClick('name')}
            sortable
            additionalClass={countiesTableStyle.name}
            sortDirection={sortDirection('name')}
          >
            Name
          </Th>
          <Th
            header
            isFirst
            onClick={() => handleSortClick('casesPer100k')}
            sortable
            sortDirection={sortDirection('casesPer100k')}
            additionalClass={countiesTableStyle.count}
          >
            Cases per 100
            <abbr title="thousand" aria-label="thousand">
              k
            </abbr>
          </Th>
          <Th
            header
            onClick={() => handleSortClick('deathsPer100k')}
            sortable
            sortDirection={sortDirection('deathsPer100k')}
            additionalClass={countiesTableStyle.count}
          >
            Deaths per 100
            <abbr title="thousand" aria-label="thousand">
              k
            </abbr>
          </Th>
          <Th header alignLeft additionalClass={countiesTableStyle.group}>
            Largest racial group
          </Th>
          <Th header alignLeft additionalClass={countiesTableStyle.group}>
            Second largest racial group
          </Th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((county, index) => (
          <>
            {index < 30 && (
              <tr>
                <Td alignLeft>
                  {county.name}
                  <br />
                  {county.state}
                </Td>
                <Td isFirst>{Math.round(county.casesPer100k)}</Td>
                <Td>{Math.round(county.deathsPer100k)}</Td>
                <Td alignLeft>{county.demographics.largestRace1}</Td>
                <Td alignLeft>{county.demographics.largestRace2}</Td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </Table>
  )
}
