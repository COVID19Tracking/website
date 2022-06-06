import React, { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import HeaderNavigation from './navigation'
import mobileMenuStyle from './mobile-menu.module.scss'

const MobileMenu = ({ expanded, topNavigation, subNavigation, hide }) => {
  const [menuHeight, setMenuHeight] = useState({ initial: 0, current: 0 })
  const menuRef = useRef()

  // Set initial menu height value to reset later.
  useEffect(() => {
    if (expanded) {
      setMenuHeight({ ...menuHeight, initial: menuRef.current.offsetHeight })
      menuRef.current.focus()
    }
  }, [expanded])

  return (
    <div
      ref={menuRef}
      className={classNames(mobileMenuStyle.mobileMenu, {
        [mobileMenuStyle.mobileMenuExpanded]: expanded,
      })}
      tabIndex="-1"
      style={{
        minHeight: `${menuHeight.current}px`,
      }}
    >
      <HeaderNavigation
        topNavigation={topNavigation}
        subNavigation={subNavigation}
        isMobile
        hide={hide}
      />
      <div className={mobileMenuStyle.mobilePointer} />
    </div>
  )
}

export default MobileMenu
