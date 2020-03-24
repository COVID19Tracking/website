import React from 'react'
import { Table } from '../components/common/table'

const ExampleTable = () => (
  <>
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Screenshot</th>
        <th scope="col">Positive</th>
        <th scope="col">Negative</th>
        <th scope="col">Pending</th>
        <th scope="col">Hospitalized</th>
        <th scope="col">Deaths</th>
        <th scope="col">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>23 Mar 2020 Mon</td>
        <td>
          <a
            target="_blank"
            class="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200323-010033.png"
          >
            1:00 AM
          </a>

          <a
            target="_blank"
            class="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200323-140030.png"
          >
            2:00 PM
          </a>

          <a
            target="_blank"
            class="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200323-190038.png"
          >
            7:00 PM
          </a>
        </td>
        <td>167</td>
        <td>1,665</td>
        <td></td>
        <td></td>
        <td>0</td>
        <td>1,832</td>
      </tr>
      <tr>
        <td>22 Mar 2020 Sun</td>
        <td>
          <a
            target="_blank"
            class="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200322-010035.png"
          >
            1:00 AM
          </a>

          <a
            target="_blank"
            class="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200322-140034.png"
          >
            2:00 PM
          </a>

          <a
            target="_blank"
            class="screenshot-link"
            href="https://covidtracking.com/screenshots/AL/AL-20200322-190032.png"
          >
            7:00 PM
          </a>
        </td>
        <td>138</td>
        <td>1,464</td>
        <td></td>
        <td></td>
        <td>0</td>
        <td>1,602</td>
      </tr>
    </tbody>
  </>
)

export default {
  title: 'Tables',
}

export const TableStory = () => (
  <Table>
    <ExampleTable />
  </Table>
)
