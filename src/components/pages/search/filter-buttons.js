/* eslint-disable no-restricted-syntax */
import React from 'react'
import classnames from 'classnames'
import searchStyle from '~components/pages/search/search.module.scss'

// todo break out styles from search module

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

export default FilterButtons
