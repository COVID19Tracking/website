import React from 'react'

import FilterButtons from '~components/pages/search/filter-buttons'
import MobileFilter from '~components/pages/search/mobile-filter'

const Filters = ({ currentOptionID, setCurrentOptionID, options }) => {
  const isChecked = id => {
    return id === currentOptionID
  }

  return (
    <>
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
    </>
  )
}

export default Filters
