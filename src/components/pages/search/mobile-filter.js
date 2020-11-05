import React, { useState } from 'react'
import classnames from 'classnames'
import {
  TabletDisclosure,
  TabletDisclosureHeader,
  TabletDisclosureContent,
} from '~components/common/tablet-disclosure'

import mobileFilterStyles from './mobile-filter.module.scss'
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
              mobileFilterStyles.filterDropdown,
            )}
          >
            {options.map(option => (
              <div
                key={option.id}
                className={classnames(
                  mobileFilterStyles.option,
                  isChecked(option.id) && mobileFilterStyles.active,
                  option.deactivated && mobileFilterStyles.deactivated,
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
                    option.deactivated && mobileFilterStyles.deactivated,
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
