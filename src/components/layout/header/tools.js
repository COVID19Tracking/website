import React from 'react'

import headerStyle from './header.module.scss'
import HeaderSearch from './search'

const Tools = () => (
  <div className={headerStyle.tools}>
    <div className={headerStyle.searchContainer}>
      <HeaderSearch />
    </div>
  </div>
)

export default Tools
