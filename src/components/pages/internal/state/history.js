import React from 'react'
import { FormatDate } from '~components/utils/format'
import { Table, Th, Td } from '~components/common/table'
import historyStyles from './history.module.scss'

export default ({ history, screenshots }) => (
  <Table>
    <thead>
      <tr>
        <Th>Date</Th>
        <Th>Screenshots</Th>
      </tr>
    </thead>
    <tbody>
      {history.map(node => (
        <tr>
          <Td>
            <FormatDate
              date={node.date}
              format="ccc LLL d yyyy"
              timezone={false}
            />
          </Td>
          <Td>
            {typeof screenshots[node.date] !== 'undefined' && (
              <button type="button" className={historyStyles.button}>
                {screenshots[node.date].length} screenshots
              </button>
            )}
          </Td>
        </tr>
      ))}
    </tbody>
  </Table>
)
