import React from 'react'
import classnames from 'classnames'
import styles from './chart-legend.module.scss'

const ChartLegend = ({
  legendColors,
  categories,
  selectedItem,
  setSelectedItem,
  legendNames,
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
      {selectedItem && (
        <button
          onClick={() => setSelectedItem(null)}
          type="button"
          className={styles.resetButton}
        >
          Reset highlight
        </button>
      )}
    </div>
  )
}

export default ChartLegend
