import React from 'react'
import sectionHeaderStyles from './section-header.module.scss'

const SectionHeader = ({ title }) => (
  <h4 className={sectionHeaderStyles.title}>{title}</h4>
)

export default SectionHeader
