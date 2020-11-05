/* eslint-disable no-restricted-syntax */
import React from 'react'
import classnames from 'classnames'
import filterButtonsStyles from './filter-buttons.module.scss'

const FilterButtons = ({ options, isChecked, setCurrentOptionID }) => (
  <div className={filterButtonsStyles.filterButtons}>
    <fieldset>
      <legend>Filter search results</legend>
      <div className={filterButtonsStyles.optionsContainer}>
        {options.map(option => (
          <div
            key={option.id}
            className={classnames(
              filterButtonsStyles.option,
              isChecked(option.id) && filterButtonsStyles.checked,
              option.deactivated && filterButtonsStyles.deactivated,
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
