import React from 'react'
import classnames from 'classnames'
// import { FormatNumber } from '~components/utils/format'
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
              <td>
                <FormatNumber number={aggregate[`posres_${category}`]} />
              </td>
              <td>
                <FormatNumber number={aggregate[`deathres_${category}`]} />
              </td>
              <td>
                <FormatNumber number={aggregate[`posstaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={aggregate[`deathstaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={aggregate[`posresstaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={aggregate[`deathresrtaff_${category}`]} />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <span className={summaryTableStyle.subHeader}>
                  <span className="a11y-only">{categoryLabels[category]}</span>{' '}
                  Outbreak
                </span>
              </th>
              <td>
                <FormatNumber number={outbreak[`posres_${category}`]} />
              </td>
              <td>
                <FormatNumber number={outbreak[`deathres_${category}`]} />
              </td>
              <td>
                <FormatNumber number={outbreak[`posstaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={outbreak[`deathstaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={outbreak[`posresstaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={outbreak[`deathresrtaff_${category}`]} />
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  )
}

export default LongTermCareSummaryTable
