import React from 'react'
import styles from './charts.module.scss'
import ChartLegend from '~components/charts/chart-legend'

const ChartsSection = ({
  title,
  children,
  legendCategories,
  selectedItem,
  setSelectedItem,
  legendColors,
  legendRef,
}) => {
  const categoryNames = {
    White: 'White',
    Black: 'Black or African American',
    LatinX: 'Hispanic or Latino',
    Asian: 'Asian',
    AIAN: 'American Indian and Alaskan Native',
    NHPI: 'Native Hawaiian and Other Pacific Islander',
    Ethnicity_Hispanic: 'Hispanic or Latino',
    Ethnicity_NonHispanic: 'Not Hispanic or Latino',
  }
  return (
    <div className={styles.chartSection}>
      <h3 className={styles.chartSectionTitle}>{title}</h3>
      {children}
      <div ref={legendRef}>
        <ChartLegend
          legendColors={legendColors}
          categories={legendCategories}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          legendNames={categoryNames}
        />
      </div>
    </div>
  )
}

export default ChartsSection
