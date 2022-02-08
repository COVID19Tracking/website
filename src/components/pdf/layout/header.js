import React from 'react'
import headerStyles from './header.module.scss'

import projectLogo from '~images/project-logo-black.svg'
import atlanticLogo from '~images/atlantic-logo-black.svg'

const Header = ({ hero }) => (
  <header className={headerStyles.header}>
    <div className={headerStyles.wrapper}>
      <div className={headerStyles.siteTitleContainer}>
        <div className={headerStyles.siteTitleInner}>
          <img
            src={projectLogo}
            alt="The COVID Tracking Project"
            width="176px"
          />
        </div>
      </div>
      <div className={headerStyles.atlanticBanner}>
        <span>At</span> <img src={atlanticLogo} alt="The Atlantic" />
        <div />
      </div>
    </div>
    {hero}
  </header>
)

export default Header
