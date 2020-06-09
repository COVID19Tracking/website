/* eslint-disable jsx-a11y/aria-role,react/prefer-stateless-function */
import React from 'react'
import { Link } from 'gatsby'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'
import internalLink from '~components/utils/internal-link'
import headerNavigationStyles from './navigation.module.scss'

class MenuCaret extends React.Component {
  render() {
    const {
      children,
      id,
      onKeyDown,
      onMouseDown,
      'aria-controls': ariaControls,
      'aria-expanded': ariaExpanded,
    } = this.props
    return (
      <button
        type="button"
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        className={headerNavigationStyles.caret}
        aria-controls={ariaControls}
        aria-haspopup="true"
        id={id}
        aria-expanded={ariaExpanded ? 'true' : 'false'}
      >
        {children}
      </button>
    )
  }
}

export default ({ topNavigation, subNavigation, isMobile }) => (
  <nav className="js-disabled-block" role="navigation">
    <ul
      role="menubar"
      className={isMobile ? headerNavigationStyles.mobile : ''}
    >
      {topNavigation.map(item => (
        <li key={item.link} className={headerNavigationStyles.menuItem}>
          <Link to={internalLink(item.link)}>{item.title}</Link>
          {item.subNavigation &&
            typeof subNavigation[item.subNavigation] !== 'undefined' && (
              <Menu>
                <MenuButton as={MenuCaret}>
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
                  <span className="a11y-only">show menu for {item.title}</span>
                </MenuButton>
                <MenuList
                  role={false}
                  className={headerNavigationStyles.subMenu}
                  onKeyDown={event => {
                    if (event.key === 'Tab') {
                      const keyEvent = new KeyboardEvent('keydown', {
                        bubbles: true,
                        key: event.shiftKey ? 'ArrowUp' : 'ArrowDown',
                      })
                      event.target.dispatchEvent(keyEvent)
                    }
                  }}
                  portal={false}
                >
                  <MenuLink
                    className={headerNavigationStyles.menuLink}
                    to={internalLink(item.link)}
                    as={Link}
                  >
                    {item.title}
                  </MenuLink>
                  {subNavigation[item.subNavigation].map(subItem => (
                    <MenuLink
                      key={subItem.link}
                      className={headerNavigationStyles.menuLink}
                      to={internalLink(subItem.link)}
                      as={Link}
                    >
                      {subItem.title}
                    </MenuLink>
                  ))}
                </MenuList>
              </Menu>
            )}
        </li>
      ))}
    </ul>
  </nav>
)
