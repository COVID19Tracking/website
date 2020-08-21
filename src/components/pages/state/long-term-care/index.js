import React from 'react'
import TableResponsive from '~components/common/table-responsive'
import { FormatDate, FormatNumber } from '~components/utils/format'

const formatNumber = number => <FormatNumber number={number} />

const categoryLabels = {
  nh: 'Nursing home',
  ltc: 'Long-term care facility',
  alf: 'Assisted-living facilitiy',
  other: 'Other facility',
}

const getAllowedCategories = data => {
  const categories = ['nh', 'ltc', 'alf', 'other']
  const allowedCategories = []
  data.forEach(row => {
    Object.keys(row).forEach(key => {
      categories.forEach(category => {
        if (
          key.search(`_${category}`) > -1 &&
          row[key] > 0 &&
          allowedCategories.indexOf(category) === -1
        ) {
          allowedCategories.push(category)
        }
      })
    })
  })
  return allowedCategories
}

const LongTermCareState = ({ data }) => {
  const categories = getAllowedCategories(data)
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
  )
}

export default LongTermCareState
