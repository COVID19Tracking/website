import React, { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import { useSearch } from '~context/search-context'
import HeaderSearch from './search'
import HeaderNavigation from './navigation'
import headerStyle from './header.module.scss'
import mobileMenuStyle from './mobile-menu.module.scss'

const MobileMenu = ({ expanded, topNavigation, subNavigation }) => {
  const [searchState] = useSearch()
  const { query, isFetching } = searchState
  const [menuHeight, setMenuHeight] = useState({ initial: 0, current: 0 })
  const resultPopoverRef = React.createRef()
  const menuRef = useRef()

  // Set initial menu height value to reset later.
  useEffect(() => {
    if (expanded) {
      setMenuHeight({ ...menuHeight, initial: menuRef.current.offsetHeight })
    }
  }, [expanded])

  // When query changes,
  // either update menu min height (if needed) or reset to initial value
  useEffect(() => {
    if (
      query &&
      !isFetching &&
      resultPopoverRef.current &&
      resultPopoverRef.current.offsetHeight
    ) {
      setMenuHeight({
        ...menuHeight,
        current: Math.max(
          resultPopoverRef.current.offsetHeight + 75,
          menuHeight.initial,
        ),
      })
    } else if (!query) {
      setMenuHeight({ ...menuHeight, current: menuHeight.initial })
    }
  }, [query, isFetching])

  return (
    <div
      ref={menuRef}
      className={classNames(mobileMenuStyle.mobileMenu, {
        [mobileMenuStyle.mobileMenuExpanded]: expanded,
      })}
      style={{
        minHeight: `${menuHeight.current}px`,
      }}
    >
      <div className={mobileMenuStyle.mobileSearchContainer}>
        <HeaderSearch popoverRef={resultPopoverRef} mobile visible={expanded} />
      </div>

      <HeaderNavigation
        topNavigation={topNavigation}
        subNavigation={subNavigation}
        isMobile
      />
      <Link to="/contact/volunteer" className={headerStyle.getInvolved}>
        Volunteer
      </Link>
      <div className={mobileMenuStyle.mobilePointer} />
    </div>
  )
}

export default MobileMenu
