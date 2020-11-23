import React from 'react'
import sectionHeaderStyles from './section-header.module.scss'

const SectionHeader = ({ title }) => (
  <h2 className={sectionHeaderStyles.title}>{title}</h2>
)

export default SectionHeader
