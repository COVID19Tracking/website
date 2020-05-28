import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'
import { useSearch } from '~context/search-context'
import HeaderSearch from '~components/layout/header/search'
import HeaderNavigation from '~components/layout/header/navigation'
import SearchAutocomplete from '~components/layout/header/search-autocomplete'
import headerStyle from '~components/layout/header/header.module.scss'

export default ({ expanded, topNavigation, subNavigation }) => {
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
      className={classNames(headerStyle.mobileMenu, {
        [headerStyle.mobileMenuExpanded]: expanded,
      })}
      style={{
        minHeight: `${menuHeight.current}px`,
      }}
    >
      <HeaderSearch>
        <SearchAutocomplete ref={resultPopoverRef} mobile visible={expanded} />
      </HeaderSearch>

      <HeaderNavigation
        topNavigation={topNavigation}
        subNavigation={subNavigation}
        isMobile
      />
      <Link to="/about-project/help" className={headerStyle.getInvolved}>
        Get Involved
      </Link>
      <div className={headerStyle.mobilePointer} />
    </div>
  )
}
