import React from 'react'
import classnames from 'classnames'
import tableStyle from '~components/common/table.module.scss'
import summaryTableStyle from './summary-table.module.scss'
import { FormatNumber } from '~components/utils/format'

const categoryLabels = {
  nh: 'Nursing home',
  ltc: 'Long-term care facility',
  alf: 'Assisted-living facilitiy',
  other: 'Other facility',
}

const getAllowedCategories = data => {
  const categories = ['nh', 'ltc', 'alf', 'other']
  const allowedCategories = []
  Object.keys(data).forEach(key => {
    categories.forEach(category => {
      if (
        key.search(`_${category}`) > -1 &&
        data[key] > 0 &&
        allowedCategories.indexOf(category) === -1
      ) {
        allowedCategories.push(category)
      }
    })
  })
  return allowedCategories
}

const fields = [
  'posres_',
  'deathres_',
  'posstaff_',
  'deathstaff_',
  'posresstaff_',
  'deathresstaff_',
]

const CategoryRows = ({ data, category }) => (
  <>
    {fields.map(field => (
      <td>
        <FormatNumber number={data[`${field}${category}`]} />
      </td>
    ))}
  </>
)

const LongTermCareSummaryTable = ({ aggregate, outbreak }) => {
  const categories = getAllowedCategories(aggregate)
  return (
    <table className={classnames(summaryTableStyle.table, tableStyle.table)}>
      <thead>
        <tr>
          <th scope="col">Facility type</th>
          <th scope="col">Resident cases</th>
          <th scope="col">Resident deaths</th>
          <th scope="col">Staff cases</th>
          <th scope="col">Staff deaths</th>
          <th scope="col">Staff &amp; Resident cases</th>
          <th scope="col">Staff &amp; Resident deaths</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <>
            <tr aria-hidden className={summaryTableStyle.category}>
              <th scope="row">{categoryLabels[category]}</th>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <th scope="row">
                <span className={summaryTableStyle.subHeader}>
                  <span className="a11y-only">{categoryLabels[category]}</span>{' '}
                  Cumulative
                </span>
              </th>
              <CategoryRows data={aggregate} category={category} />
            </tr>
            <tr>
              <th scope="row">
                <span className={summaryTableStyle.subHeader}>
                  <span className="a11y-only">{categoryLabels[category]}</span>{' '}
                  Outbreak
                </span>
              </th>
              <CategoryRows data={outbreak} category={category} />
            </tr>
          </>
        ))}
      </tbody>
    </table>
  )
}

export default LongTermCareSummaryTable
