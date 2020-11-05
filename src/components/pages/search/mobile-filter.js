import React, { useState } from 'react'
import classnames from 'classnames'
import searchStyle from '~components/pages/search/search.module.scss'
import {
  TabletDisclosure,
  TabletDisclosureHeader,
  TabletDisclosureContent,
} from '~components/common/tablet-disclosure'

import blogCategoriesListStyles from '~components/pages/blog/blog-categories-list.module.scss'

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

export default MobileFilter
