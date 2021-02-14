import React from 'react'
import styles from './charts.module.scss'
import ChartLegend from './chart-legend'

const ChartsSection = ({
  title,
  children,
  legendCategories,
  selectedItem,
  setSelectedItem,
  legendColors,
  legendRef,
}) => (
  <div className={styles.chartSection}>
    <h3 className={styles.chartSectionTitle}>{title}</h3>
    {children}
    <div ref={legendRef}>
      <ChartLegend
        legendColors={legendColors}
        categories={legendCategories}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  </div>
)

export default ChartsSection
