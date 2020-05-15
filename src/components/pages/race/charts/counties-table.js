import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Table, Th, Td } from '~components/common/table'

export default () => {
  const [sort] = useState(false)

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
    if (!sort || sort === 'casesPer100k') {
      if (a.casesPer100k < b.casesPer100k) {
        return 1
      }
      return -1
    }
    if (sort === 'deathsPer100k') {
      if (a.deathsPer100k < b.deathsPer100k) {
        return -1
      }
      return 1
    }
    if (sort === 'name') {
      if (a.name < b.name) {
        return -1
      }
      return 1
    }
    return 0
  })

  return (
    <Table>
      <thead>
        <tr>
          <Th alignLeft>Name</Th>
          <Th>
            Cases per 100
            <abbr title="thousand" aria-label="thousand">
              k
            </abbr>
          </Th>
          <Th>
            Deaths per 100
            <abbr title="thousand" aria-label="thousand">
              k
            </abbr>
          </Th>
          <Th alignLeft>Largest racial group</Th>
          <Th alignLeft>Second largest racial group</Th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((county, index) => (
          <>
            {index < 30 && (
              <tr>
                <Td alignLeft>
                  {county.name} ({county.state})
                </Td>
                <Td>{Math.round(county.casesPer100k)}</Td>
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
