/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react'
import Layout from '~components/layout'
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

const Search = () => {
  const filterOptions = [
    {
      id: 'all',
      name: 'All', // this is the default
      deactivated: false,
    },
    {
      id: 'blog-posts',
      name: 'Blog posts',
      deactivated: true,
    },
    {
      id: 'pages',
      name: 'Pages',
      deactivated: false,
    },
    {
      id: 'states',
      name: 'States',
      deactivated: false,
    },
  ]

  const [currentFilterOptionID, setCurrentFilterOptionID] = useState(
    filterOptions[0].id,
  ) // make "All" the default

  return (
    <Layout title="temp" centered>
      <Filters
        options={filterOptions}
        currentOptionID={currentFilterOptionID}
        setCurrentOptionID={setCurrentFilterOptionID}
      />
    </Layout>
  )
}

export default Search
