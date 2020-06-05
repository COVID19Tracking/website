import React from 'react'
import { Link } from 'gatsby'
import { FormatDate, FormatNumber } from '~components/utils/format'
import { Table, Th, Td } from '~components/common/table'

export default ({ state, history, screenshots }) => (
  <Table>
    <thead>
      <tr>
        <Th>Date</Th>
        <Th>Screenshots</Th>
        <Th>Positive</Th>
        <Th>Negative</Th>
        <Th>Deaths</Th>
        <Th>Recovered</Th>
      </tr>
    </thead>
    <tbody>
      {history.map(node => (
        <tr>
          <Td>
            <Link
              to={`/internal/state/${state.state.toLowerCase()}/${node.date}`}
            >
              <FormatDate
                date={node.date}
                format="ccc LLL d yyyy"
                timezone={false}
              />
            </Link>
          </Td>
          <Td>
            {typeof screenshots[node.date] !== 'undefined' && (
              <>{screenshots[node.date].length} screenshots</>
            )}
          </Td>
          <Td>
            <FormatNumber number={node.positive} />
          </Td>
          <Td>
            <FormatNumber number={node.negative} />
          </Td>
          <Td>
            <FormatNumber number={node.death} />
          </Td>
          <Td>
            <FormatNumber number={node.recovered} />
          </Td>
        </tr>
      ))}
    </tbody>
  </Table>
)
