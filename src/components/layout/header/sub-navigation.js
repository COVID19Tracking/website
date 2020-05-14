import React from 'react'
import { Link } from 'gatsby'
import headerStyle from './header.module.scss'

export default ({ navigation }) => (
  <div className={`site-header-tabs ${headerStyle.headerTabs}`}>
    <div>
      <ul>
        {navigation.map(item => (
          <li key={`header-tab-${item.link}`}>
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
