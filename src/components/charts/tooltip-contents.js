import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { formatNumber, formatDate } from '~utilities/visualization'
import styles from './tooltip-contents.module.scss'

const TooltipContents = ({ date = null, items }) => (
  <>
    {date && (
      <span className={classnames(styles.item, styles.date)}>
        {formatDate(date)}
      </span>
    )}
    {items.map(item => (
      <div className={styles.item} key={`${item.date}-${item.value}`}>
        <span>{formatNumber(item.value)}</span>{' '}
        <span className={classnames(styles.legendText, styles.total)}>
          {item.text}
        </span>
      </div>
    ))}
  </>
)

TooltipContents.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default TooltipContents
