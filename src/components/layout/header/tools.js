import React from 'react'
import { Link } from 'gatsby'

import headerStyle from './header.module.scss'
import HeaderSearch from './search'

const Tools = () => (
  <div className={headerStyle.tools}>
    <div className={headerStyle.searchContainer}>
      <HeaderSearch />
    </div>
    <Link to="/contact/volunteer" className={headerStyle.getInvolved}>
      Get involved
    </Link>
  </div>
)

export default Tools
