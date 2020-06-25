import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'
import internalLink from '~components/utils/internal-link'
import headerNavigationStyles from './navigation.module.scss'

const MenuCaret = () => (
  <svg
    width="12"
    height="7"
    viewBox="0 0 12 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M5.59523 6.56387C5.7446 6.71053 5.91203 6.7381 6.0001 6.7381C6.09838 6.7381 6.25421 6.71136 6.40443 6.56387L10.9015 1.76778C11.1074 1.5483 11.093 1.20669 10.8695 1.00471C10.6459 0.802637 10.298 0.817297 10.0924 1.03625L5.99993 5.40006L1.90754 1.03625C1.70151 0.816664 1.35357 0.802742 1.13034 1.00471C0.906907 1.20669 0.892512 1.5483 1.09823 1.76778L5.59523 6.56387Z" />
  </svg>
)

const Menu = ({ item, id, subNavigation, onOpen, onClose, otherIsOpened }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(0)
  const menuRef = useRef(false)
  const buttonRef = useRef(false)

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
      onClose()
      buttonRef.current.focus()
    }
    if (event.key === 'ArrowDown' || event.key === 'Tab') {
      event.preventDefault()
      if (currentItem + 1 >= subNavigation[item.subNavigation].length) {
        return false
      }
      setCurrentItem(currentItem + 1)
      return false
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (currentItem === 0) {
        return false
      }
      setCurrentItem(currentItem - 1)
      return false
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      setIsOpen(false)
      onClose()
      event.target.querySelector('[data-selected]').click()
    }
    return null
  }

  useEffect(() => {
    if (otherIsOpened) {
      setIsOpen(false)
    }
  }, [otherIsOpened])

  return (
    <>
      <div className={headerNavigationStyles.navLabel}>
        <Link id={id} to={internalLink(item.link)}>
          {item.title}
        </Link>
        {item.subNavigation &&
          typeof subNavigation[item.subNavigation] !== 'undefined' && (
            <button
              type="button"
              ref={buttonRef}
              className={headerNavigationStyles.caret}
              aria-haspopup="true"
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-controls={`menu-${id}`}
              onClick={event => {
                event.preventDefault()
                setIsOpen(!isOpen)
                if (!isOpen) {
                  setTimeout(() => menuRef.current.focus(), 100)
                  onOpen()
                } else {
                  onClose()
                }
              }}
            >
              <MenuCaret />
              <span className="a11y-only">show menu for {item.title}</span>
            </button>
          )}
      </div>
      {item.subNavigation &&
        typeof subNavigation[item.subNavigation] !== 'undefined' && (
          <div
            className={headerNavigationStyles.subMenu}
            hidden={!isOpen}
            aria-labelledby={id}
            id={`menu-${id}`}
            ref={menuRef}
            role="menu"
            tabIndex="-1"
            onKeyDown={handleKeyDown}
          >
            {subNavigation[item.subNavigation].map((subItem, subItemIndex) => (
              <Link
                key={subItem.link}
                tabIndex={subItemIndex === currentItem ? 0 : '-1'}
                role="menuitem"
                onKeyDown={handleKeyDown}
                data-selected={subItemIndex === currentItem ? '' : undefined}
                className={headerNavigationStyles.menuLink}
                to={internalLink(subItem.link)}
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        )}
    </>
  )
}

export default ({ topNavigation, subNavigation, isMobile }) => {
  const [opened, setOpened] = useState(false)

  return (
    <nav className="js-disabled-block" role="navigation">
      <ul
        role="menubar"
        className={isMobile ? headerNavigationStyles.mobile : ''}
      >
        {topNavigation.map((item, itemKey) => (
          <li key={item.link} className={headerNavigationStyles.menuItem}>
            <Menu
              item={item}
              onOpen={() => {
                setOpened(itemKey)
              }}
              onClose={() => {
                setOpened(false)
              }}
              otherIsOpened={opened !== false && opened !== itemKey}
              subNavigation={subNavigation}
              id={`navigation-${slug(item.title)}`}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
