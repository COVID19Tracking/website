import React from 'react'

import FilterButtons from '~components/pages/search/filter-buttons'
import MobileFilter from '~components/pages/search/mobile-filter'

import filtersStyles from './filters.module.scss'

const Filters = ({ currentOptionID, setCurrentOptionID, options }) => {
  const isChecked = id => {
    return id === currentOptionID
  }

  return (
    <div className={filtersStyles.wrapper}>
      <FilterButtons
        options={options}
        setCurrentOptionID={setCurrentOptionID}
        isChecked={isChecked}
      />
      <MobileFilter
        options={options}
        setCurrentOptionID={setCurrentOptionID}
        isChecked={isChecked}
      />
    </div>
  )
}

export default Filters
