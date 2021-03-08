import React from 'react'

import { Col } from '~components/common/grid'
import ChartLegend from '~components/charts/chart-legend'

import styles from './chart-section.module.scss'

const ChartSection = ({
  title,
  children,
  legendCategories,
  selectedItem,
  setSelectedItem,
  legendColors,
  legendRef,
  isEmbed,
}) => {
  const categoryNames = {
    White: 'White',
    Black: 'Black or African American',
    LatinX: 'Hispanic or Latino',
    Asian: 'Asian',
    AIAN: 'American Indian or Alaska Native',
    NHPI: 'Native Hawaiian or Other Pacific Islander',
    Ethnicity_Hispanic: 'Hispanic or Latino',
    Ethnicity_NonHispanic: 'Not Hispanic or Latino',
  }
  return (
    <div className={styles.chartSection}>
      <h3 className={styles.chartSectionTitle}>{title}</h3>
      <Col width={isEmbed ? [4, 6, 12] : [4, 4, 6]} className={styles.column}>
        {children}
      </Col>
      <div ref={legendRef}>
        <ChartLegend
          legendColors={legendColors}
          categories={legendCategories}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          legendNames={categoryNames}
          isEmbed={isEmbed}
        />
      </div>
    </div>
  )
}

export default ChartSection
