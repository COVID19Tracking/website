import React from 'react'
import { Link } from 'gatsby'
import '../../scss/components/common/sub-navigation.scss'

export default ({ navigation }) => (
  <ul className="sub-navigation">
    {navigation.map(item => (
      <li key={`sub-navigation-${item.link}`}>
        <Link to={item.link}>{item.title}</Link>
      </li>
    ))}
  </ul>
)
