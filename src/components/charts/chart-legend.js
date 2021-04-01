import React from 'react'
import classnames from 'classnames'

import { Col } from '~components/common/grid'

import styles from './chart-legend.module.scss'

const ChartLegend = ({
  legendColors,
  categories,
  selectedItem,
  setSelectedItem,
  legendNames,
  isEmbed,
}) => {
  /**
   * Gets the appropriate classes for a legend item, based on the
   * item's category name.
   */
  const getCategoryStyles = categoryName => {
    if (selectedItem && categoryName === selectedItem) {
      return classnames(styles.category, styles.activeCategory)
    }
    return styles.category
  }

  return (
    <Col
      width={isEmbed ? [4, 6, 12] : [4, 6, 6]}
      className={styles.columnWrapper}
    >
      <div className={styles.legend}>
        {categories.map(category => (
          <button
            className={getCategoryStyles(category)}
            onClick={() => setSelectedItem(category)}
            type="button"
          >
            <div
              style={{ 'background-color': legendColors[category] }}
              className={styles.swatch}
            />
            {legendNames[category]}
          </button>
        ))}
        {selectedItem ? (
          <button
            onClick={() => setSelectedItem(null)}
            type="button"
            className={styles.resetButton}
          >
            Clear filter
          </button>
        ) : (
          // this is a placeholder for the reset button so that the page doesn't
          // jump when selectedItem goes from null to not null
          <div className={styles.resetButton}> </div>
        )}
      </div>
    </Col>
  )
}

export default ChartLegend
