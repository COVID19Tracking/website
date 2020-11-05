/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react'
import classnames from 'classnames'
import Layout from '~components/layout'
import searchStyle from '~components/pages/search/search.module.scss'

import {
  TabletDisclosure,
  TabletDisclosureHeader,
  TabletDisclosureContent,
} from '~components/common/tablet-disclosure'
import blogCategoriesListStyles from '~components/pages/blog/blog-categories-list.module.scss'

const FilterButtons = ({ options, isChecked, setCurrentOptionID }) => (
  <div className={searchStyle.filterButtons}>
    <fieldset>
      <legend>Filter search results</legend>
      <div className={searchStyle.optionsContainer}>
        {options.map(option => (
          <div
            key={option.id}
            className={classnames(
              searchStyle.option,
              isChecked(option.id) && searchStyle.checked,
              option.deactivated && searchStyle.deactivated,
            )}
          >
            <input
              type="radio"
              name="result-filter"
              id={option.id}
              value={option.id}
              checked={isChecked(option.id)}
              onChange={event => {
                /* eslint-disable no-unused-expressions */
                !option.deactivated && setCurrentOptionID(event.target.value)
              }}
            />
            <label htmlFor={option.id}>{option.name}</label>
          </div>
        ))}
      </div>
    </fieldset>
  </div>
)

const MobileFilter = ({ options, isChecked, setCurrentOptionID }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={blogCategoriesListStyles.wrapper}>
      <TabletDisclosure className={blogCategoriesListStyles.container}>
        <TabletDisclosureHeader isOpen={isOpen} setIsOpen={setIsOpen}>
          <h3>Sort by</h3>
        </TabletDisclosureHeader>
        <TabletDisclosureContent isOpen={isOpen}>
          <ul
            role="navigation"
            aria-label="Categories"
            className={classnames(
              blogCategoriesListStyles.categoryList,
              searchStyle.filterDropdown,
            )}
          >
            {options.map(option => (
              <div
                key={option.id}
                className={classnames(
                  searchStyle.option,
                  isChecked(option.id) && searchStyle.active,
                )}
              >
                <input
                  type="radio"
                  name="result-filter"
                  id={option.id}
                  value={option.id}
                  checked={isChecked(option.id)}
                  onChange={event => {
                    /* eslint-disable no-unused-expressions */
                    !option.deactivated &&
                      setCurrentOptionID(event.target.value)
                  }}
                />
                <label
                  htmlFor={option.id}
                  className={classnames(
                    blogCategoriesListStyles.option,
                    option.deactivated && searchStyle.deactivated,
                  )}
                >
                  {option.name}
                </label>
              </div>
            ))}
          </ul>
        </TabletDisclosureContent>
      </TabletDisclosure>
    </div>
  )
}

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
