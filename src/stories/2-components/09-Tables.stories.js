import React from 'react'
import { Th, Td, Table } from '../../components/common/table'

const ExampleTable = () => (
  <>
    <thead>
      <tr>
        <Th scope="col">Date</Th>
        <Th scope="col">Screenshot</Th>
        <Th scope="col">Positive</Th>
        <Th scope="col">Negative</Th>
        <Th scope="col">Pending</Th>
        <Th scope="col">Hospitalized</Th>
        <Th scope="col">Deaths</Th>
        <Th scope="col">Total</Th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <Td>23 Mar 2020 Mon</Td>
        <Td>
          <a
            className="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200323-010033.png"
          >
            1:00 AM
          </a>

          <a
            className="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200323-140030.png"
          >
            2:00 PM
          </a>

          <a
            className="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200323-190038.png"
          >
            7:00 PM
          </a>
        </Td>
        <Td>167</Td>
        <Td>1,665</Td>
        <Td>N/A</Td>
        <Td>N/A</Td>
        <Td>0</Td>
        <Td>1,832</Td>
      </tr>
      <tr>
        <Td>22 Mar 2020 Sun</Td>
        <Td>
          <a
            className="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200322-010035.png"
          >
            1:00 AM
          </a>

          <a
            className="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200322-140034.png"
          >
            2:00 PM
          </a>

          <a
            className="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200322-190032.png"
          >
            7:00 PM
          </a>
        </Td>
        <Td>138</Td>
        <Td>1,464</Td>
        <Td>N/A</Td>
        <Td>N/A</Td>
        <Td>0</Td>
        <Td>1,602</Td>
      </tr>
    </tbody>
  </>
)

export default {
  title: 'Tables',
}

export const simpleTable = () => (
  <Table>
    <ExampleTable />
  </Table>
)
