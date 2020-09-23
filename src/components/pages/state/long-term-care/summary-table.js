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

const LongTermCareSummaryTable = ({ data }) => {
  const categories = getAllowedCategories(data)
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
                <FormatNumber number={data[`PosRes_${category}`]} />
              </td>
              <td>
                <FormatNumber number={data[`DeathRes_${category}`]} />
              </td>
              <td>
                <FormatNumber number={data[`PosStaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={data[`DeathStaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={data[`PosResStaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={data[`DeathResStaff_${category}`]} />
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
                <FormatNumber number={data[`PosRes_${category}`]} />
              </td>
              <td>
                <FormatNumber number={data[`DeathRes_${category}`]} />
              </td>
              <td>
                <FormatNumber number={data[`PosStaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={data[`DeathStaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={data[`PosResStaff_${category}`]} />
              </td>
              <td>
                <FormatNumber number={data[`DeathResStaff_${category}`]} />
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  ) /* 
  return (
    <>
      {categories.map(category => (
        <>
          <h2>{categoryLabels[category]}</h2>
          <TableResponsive
            labels={[
              {
                field: 'Date',
                format: date => (
                  <FormatDate date={date} format="ccc LLL d yyyy" />
                ),
              },
              {
                label: 'Outbreaks',
                field: `outbrkFacil_${category}`,
                format: formatNumber,
              },
              {
                label: 'Staff cases',
                field: `PosStaff_${category}`,
                format: formatNumber,
              },
              {
                label: 'Resident cases',
                field: `PosRes_${category}`,
                format: formatNumber,
              },
              {
                label: 'Staff & Resident cases',
                field: `PosResStaff_${category}`,
                format: formatNumber,
              },
              {
                label: 'Staff deaths',
                field: `DeathStaff_${category}`,
                format: formatNumber,
              },
              {
                label: 'Resident deaths',
                field: `DeathRes_${category}`,
                format: formatNumber,
              },
              {
                label: 'Staff & Resident deaths',
                field: `DeathResStaff_${category}`,
                format: formatNumber,
              },
            ]}
            data={data}
          />
        </>
      ))}
    </>
  ) */
}

export default LongTermCareSummaryTable
