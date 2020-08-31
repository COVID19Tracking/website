import React from 'react'
import bannerStyles from './banner.module.scss'

export default ({ content }) => (
  <div className={bannerStyles.banner}>
    <span className={bannerStyles.new}>New</span>
    {content}
  </div>
)
